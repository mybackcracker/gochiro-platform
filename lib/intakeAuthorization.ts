import "next/dist/compiled/server-only";

import { createHash, randomBytes, timingSafeEqual } from "node:crypto";
import { google, sheets_v4 } from "googleapis";
import { loadServiceAccountKey } from "./googleAuth";

export const INTAKE_AUTH_SHEET = "Intake Authorizations";
export const INTAKE_AUTH_HEADERS = [
  "Token Hash",
  "Appointment Reference",
  "Expires At UTC",
  "Status",
  "Created At UTC",
  "Consumed At UTC",
  "Revoked At UTC",
] as const;
export const TOKEN_DOMAIN = "gochiro-intake-token:v1:";

export interface IntakeAuthorizationRecord {
  tokenHash: string;
  appointmentReference: string;
  expiresAtUtc: string;
  status: "ACTIVE";
  createdAtUtc: string;
  consumedAtUtc: "";
  revokedAtUtc: "";
}

export interface IntakeLedger {
  createIfNoActiveAuthorization(record: IntakeAuthorizationRecord): Promise<boolean>;
}

export function generateIntakeToken(): string {
  return randomBytes(32).toString("base64url");
}

export function hashIntakeToken(rawToken: string): string {
  return createHash("sha256").update(TOKEN_DOMAIN, "utf8").update(rawToken, "utf8").digest("hex");
}

// Intended for any future application-level digest checks. Sheets lookups use
// exact cell matching, but digest equality in Node must not be data-dependent.
export function tokenHashesEqual(left: string, right: string): boolean {
  const a = Buffer.from(left, "hex");
  const b = Buffer.from(right, "hex");
  return a.length === 32 && b.length === 32 && timingSafeEqual(a, b);
}

export function validateLedgerHeaders(values: unknown[][] | null | undefined): void {
  const row = values?.[0];
  if (!row || row.length !== INTAKE_AUTH_HEADERS.length || !INTAKE_AUTH_HEADERS.every((header, i) => row[i] === header)) {
    throw new Error("Intake authorization ledger schema is unavailable or invalid.");
  }
}

export class GoogleSheetsIntakeLedger implements IntakeLedger {
  constructor(
    private readonly spreadsheetId: string,
    private readonly sheets: sheets_v4.Sheets,
  ) {}

  async createIfNoActiveAuthorization(record: IntakeAuthorizationRecord): Promise<boolean> {
    const range = `'${INTAKE_AUTH_SHEET}'!A:G`;
    const current = await this.sheets.spreadsheets.values.get({ spreadsheetId: this.spreadsheetId, range });
    const rows = current.data.values;
    validateLedgerHeaders(rows);

    const duplicate = (rows ?? []).slice(1).some((row) => row[1] === record.appointmentReference && row[3] === "ACTIVE");
    if (duplicate) return false;

    await this.sheets.spreadsheets.values.append({
      spreadsheetId: this.spreadsheetId,
      range,
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [[
          record.tokenHash,
          record.appointmentReference,
          record.expiresAtUtc,
          record.status,
          record.createdAtUtc,
          record.consumedAtUtc,
          record.revokedAtUtc,
        ]],
      },
    });
    return true;
  }
}

let cachedLedger: IntakeLedger | null = null;

export function getIntakeLedger(): IntakeLedger {
  if (cachedLedger) return cachedLedger;
  const spreadsheetId = process.env.GOCHIRO_INTAKE_AUTH_SPREADSHEET_ID;
  if (!spreadsheetId) throw new Error("Intake authorization ledger is not configured.");
  const key = loadServiceAccountKey();
  const auth = new google.auth.JWT({
    email: key.client_email,
    key: key.private_key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  cachedLedger = new GoogleSheetsIntakeLedger(spreadsheetId, google.sheets({ version: "v4", auth }));
  return cachedLedger;
}
