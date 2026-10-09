export const LOCATION_TIMING = ["As soon as possible", "Within the next few days", "My timing is flexible"];
export const LOCATION_CONTACTS = ["Text", "Phone call", "Email"];
export const LOCATION_POLICY_VERSION = "2026-10-09";
export interface LocationRequest { name: string; contactMethod: string; contact: string; address: string; city: string; state: string; zip: string; access: string; timing: string; acknowledged: boolean }
export function parseLocationRequest(raw: unknown): LocationRequest | null {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;
  const obj = raw as Record<string, unknown>;
  const text = (key: string, max: number) => typeof obj[key] === "string" && (obj[key] as string).length <= max ? (obj[key] as string).trim() : "";
  const input: LocationRequest = { name: text("name",100), contactMethod:text("contactMethod",30), contact:text("contact",160), address:text("address",200), city:text("city",100), state:text("state",30), zip:text("zip",5), access:text("access",800), timing:text("timing",50), acknowledged:obj.acknowledged === true };
  if (!input.name || !input.address || !input.city || input.state !== "PA" || !/^\d{5}$/.test(input.zip) || !input.access || !LOCATION_TIMING.includes(input.timing) || !LOCATION_CONTACTS.includes(input.contactMethod) || !input.acknowledged) return null;
  if (input.contactMethod === "Email" ? !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.contact) : !/^\+?[\d ().-]+$/.test(input.contact) || input.contact.replace(/\D/g, "").length < 10) return null;
  return input;
}
