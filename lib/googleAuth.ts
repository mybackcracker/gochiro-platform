import fs from "fs";

// Shared service-account credential loader for lib/googleCalendar.ts and
// lib/gmail.ts. Prefers GOOGLE_SERVICE_ACCOUNT_KEY_JSON (the full service
// account JSON key, inline) since a filesystem path isn't viable on Vercel;
// falls back to reading GOOGLE_SERVICE_ACCOUNT_KEY_PATH from disk for local
// development, where the existing setup already works.
export interface ServiceAccountKey {
  client_email: string;
  private_key: string;
}

let cachedKey: ServiceAccountKey | null = null;

export function loadServiceAccountKey(): ServiceAccountKey {
  if (cachedKey) return cachedKey;

  const inlineJson = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_JSON;
  if (inlineJson) {
    try {
      cachedKey = JSON.parse(inlineJson) as ServiceAccountKey;
    } catch {
      throw new Error("GOOGLE_SERVICE_ACCOUNT_KEY_JSON is set but is not valid JSON.");
    }
    return cachedKey;
  }

  const keyPath = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH;
  if (!keyPath) {
    throw new Error(
      "No Google service account credential configured. Set GOOGLE_SERVICE_ACCOUNT_KEY_JSON (production/Vercel) or GOOGLE_SERVICE_ACCOUNT_KEY_PATH (local development, pointing to the downloaded service account JSON key)."
    );
  }
  if (!fs.existsSync(keyPath)) {
    throw new Error(`Service account key file not found at: ${keyPath}`);
  }

  cachedKey = JSON.parse(fs.readFileSync(keyPath, "utf-8")) as ServiceAccountKey;
  return cachedKey;
}
