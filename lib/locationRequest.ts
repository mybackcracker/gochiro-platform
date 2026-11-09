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
  const input: LocationRequest = { name: text("name",100), contactMethod:text("contactMethod",30), contact:text("contact",160), address:text("address",200), city:text("city",100), state:text("state",30), zip:text("zip",5), privateParking:obj.privateParking === undefined ? "Unsure" : text("privateParking",80), stairs:obj.stairs === undefined ? "Unsure" : text("stairs",80), elevator:obj.elevator === undefined ? "Unsure" : text("elevator",80), timing:text("timing",50), acknowledged:obj.acknowledged === true };
  if (!input.name || !input.address || input.state !== "PA" || !/^\d{5}$/.test(input.zip) || !PRIVATE_PARKING_OPTIONS.includes(input.privateParking) || !STAIRS_OPTIONS.includes(input.stairs) || !ELEVATOR_OPTIONS.includes(input.elevator) || !LOCATION_TIMING.includes(input.timing) || !LOCATION_CONTACTS.includes(input.contactMethod) || !input.acknowledged) return null;
  if (input.contactMethod === "Email" ? !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.contact) : !/^\+?[\d ().-]+$/.test(input.contact) || input.contact.replace(/\D/g, "").length < 10) return null;
  return input;
}

export function locationMapsUrl(input: Pick<LocationRequest, "address" | "city" | "state" | "zip">): string {
  const address = [input.address, input.city, input.state + " " + input.zip].filter(Boolean).join(", ");
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

export function locationRequestNotification(
  input: LocationRequest,
  destination: string,
  estimate: { total: number; appointmentFee: number; travelFee: number } | null,
) {
  const escape = (value: string) => value.replace(/[&<>"']/g, char =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]!);
  const mapsUrl = locationMapsUrl(input);
  const reply = input.contactMethod === "Email" ? "Email" : input.contactMethod === "Text" ? "Text" : "Call";
  const contact = input.contactMethod === "Email" ? input.contact : input.contact.replace(/[^+\d]/g, "");
  const href = (reply === "Email" ? "mailto:" : reply === "Text" ? "sms:" : "tel:") + encodeURIComponent(contact);
  const access = [["Parking", input.privateParking], ["Stairs", input.stairs], ["Elevator", input.elevator]]
    .filter(([, value]) => value !== "Unsure").map(([label, value]) => label + ": " + value);
  const cost = estimate
    ? "Estimate shown: $" + estimate.total + " ($" + estimate.appointmentFee + " visit + $" + estimate.travelFee + " travel)"
    : "Personal quote requested";
  const acknowledgment = estimate
    ? "Requester acknowledged the estimate and the 50% minimum deposit requirement."
    : "Requester acknowledged the 50% minimum deposit requirement.";
  const next = "Next: " + reply + " the requester to confirm access, timing, and final price before booking.";
  const subject = "Visit request — " + (input.city ? input.city.replace(/[\r\n]+/g, " ") + " " : "") +
    input.zip + (estimate ? " · $" + estimate.total + " estimate" : " · personal quote");
  const text = [
    input.name + " · " + reply + ": " + input.contact, "Timing: " + input.timing,
    "Location: " + destination, "Open in Google Maps: " + mapsUrl, ...access,
    "", cost, acknowledgment, "", next,
  ].join("\n");
  const html = [
    '<p><strong>' + escape(input.name) + '</strong> · <a href="' + escape(href) + '">' +
      reply + ' ' + escape(input.contact) + '</a><br>Timing: ' + escape(input.timing) + '</p>',
    '<p><strong>Location:</strong> ' + escape(destination) + '<br><a href="' +
      escape(mapsUrl) + '">Open in Google Maps</a>' +
      access.map(line => '<br>' + escape(line)).join("") + '</p>',
    '<p><strong>' + escape(cost) + '</strong><br>' + escape(acknowledgment) + '</p>',
    '<p>' + escape(next) + '</p>',
  ].join("");
  return { subject, text, html };
}
