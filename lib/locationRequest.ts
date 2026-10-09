export const LOCATION_TIMING = ["As soon as possible", "Within the next few days", "My timing is flexible"];
export const LOCATION_CONTACTS = ["Text", "Phone call", "Email"];
export const PRIVATE_PARKING_OPTIONS = ["Yes — private or reserved parking", "No — street or public parking only", "Unsure"];
export const STAIRS_OPTIONS = ["No stairs", "Stairs at the entrance", "Stairs inside the building", "Stairs at the entrance and inside", "Unsure"];
export const ELEVATOR_OPTIONS = ["Yes", "No", "Not needed — ground-floor visit", "Unsure"];
export const LOCATION_POLICY_VERSION = "2026-10-09";
export interface LocationRequest { name: string; contactMethod: string; contact: string; address: string; city: string; state: string; zip: string; privateParking: string; stairs: string; elevator: string; timing: string; acknowledged: boolean }
export function parseLocationRequest(raw: unknown): LocationRequest | null {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;
  const obj = raw as Record<string, unknown>;
  const text = (key: string, max: number) => typeof obj[key] === "string" && (obj[key] as string).length <= max ? (obj[key] as string).trim() : "";
  const input: LocationRequest = { name: text("name",100), contactMethod:text("contactMethod",30), contact:text("contact",160), address:text("address",200), city:text("city",100), state:text("state",30), zip:text("zip",5), privateParking:text("privateParking",80), stairs:text("stairs",80), elevator:text("elevator",80), timing:text("timing",50), acknowledged:obj.acknowledged === true };
  if (!input.name || !input.address || !input.city || input.state !== "PA" || !/^\d{5}$/.test(input.zip) || !PRIVATE_PARKING_OPTIONS.includes(input.privateParking) || !STAIRS_OPTIONS.includes(input.stairs) || !ELEVATOR_OPTIONS.includes(input.elevator) || !LOCATION_TIMING.includes(input.timing) || !LOCATION_CONTACTS.includes(input.contactMethod) || !input.acknowledged) return null;
  if (input.contactMethod === "Email" ? !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.contact) : !/^\+?[\d ().-]+$/.test(input.contact) || input.contact.replace(/\D/g, "").length < 10) return null;
  return input;
}

export function locationMapsUrl(input: Pick<LocationRequest, "address" | "city" | "state" | "zip">): string {
  const address = `${input.address}, ${input.city}, ${input.state} ${input.zip}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}
