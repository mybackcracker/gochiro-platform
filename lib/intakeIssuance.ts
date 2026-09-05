import "next/dist/compiled/server-only";

import {
  generateIntakeToken,
  getIntakeLedger,
  hashIntakeToken,
  type IntakeLedger,
} from "./intakeAuthorization";

const THREE_HOURS_MS = 3 * 60 * 60 * 1000;

export interface IntakeIssuanceDependencies {
  ledger?: IntakeLedger;
  now?: () => Date;
  generateToken?: () => string;
  baseUrl?: string;
  enabled?: string;
}

export function intakeExpiration(bookingTime: Date, appointmentStart: Date): Date {
  return new Date(Math.min(bookingTime.getTime() + THREE_HOURS_MS, appointmentStart.getTime()));
}

export function visitQualifiesForIntake(visit: string): boolean {
  return visit === "new-patient";
}

export async function issueIntakeLink(
  appointmentReference: string,
  appointmentStart: Date,
  dependencies: IntakeIssuanceDependencies = {},
): Promise<string | null> {
  if ((dependencies.enabled ?? process.env.GOCHIRO_INTAKE_LINKS_ENABLED) !== "true") return null;

  const configuredBase = dependencies.baseUrl ?? process.env.GOCHIRO_INTAKE_BASE_URL;
  if (!configuredBase) throw new Error("Intake application URL is not configured.");
  const url = new URL(configuredBase);
  if (url.protocol !== "https:") throw new Error("Intake application URL must use HTTPS.");
  url.search = "";
  url.hash = "";

  const now = (dependencies.now ?? (() => new Date()))();
  const rawToken = (dependencies.generateToken ?? generateIntakeToken)();
  const tokenHash = hashIntakeToken(rawToken);
  const created = await (dependencies.ledger ?? getIntakeLedger()).createIfNoActiveAuthorization({
    tokenHash,
    appointmentReference,
    expiresAtUtc: intakeExpiration(now, appointmentStart).toISOString(),
    status: "ACTIVE",
    createdAtUtc: now.toISOString(),
    consumedAtUtc: "",
    revokedAtUtc: "",
  });
  if (!created) return null;

  url.searchParams.set("t", rawToken);
  return url.toString();
}
