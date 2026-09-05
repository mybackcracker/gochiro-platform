import "next/dist/compiled/server-only";

import {
  sendBookingEmails,
  sendGroupBookingEmails,
  sendIntakeIssuanceWarning,
  type BookingEmailInput,
  type GroupBookingEmailInput,
} from "./bookingEmail";
import { issueIntakeLink, visitQualifiesForIntake } from "./intakeIssuance";

interface BookingCompletionDependencies {
  issueLink?: typeof issueIntakeLink;
  sendIndividual?: typeof sendBookingEmails;
  sendGroup?: typeof sendGroupBookingEmails;
  sendWarning?: typeof sendIntakeIssuanceWarning;
  intakeEnabled?: string;
  report?: (message: string) => void;
}

export async function completeBookedAppointment(
  appointmentReference: string | undefined,
  input: BookingEmailInput,
  groupInput?: GroupBookingEmailInput,
  dependencies: BookingCompletionDependencies = {},
): Promise<void> {
  const report = dependencies.report ?? console.error;
  let intakeLink: string | undefined;
  if (visitQualifiesForIntake(input.visit) && (dependencies.intakeEnabled ?? process.env.GOCHIRO_INTAKE_LINKS_ENABLED) === "true") {
    try {
      if (!appointmentReference) throw new Error("Missing appointment reference.");
      intakeLink = (await (dependencies.issueLink ?? issueIntakeLink)(appointmentReference, input.start)) ?? undefined;
    } catch {
      report("Secure intake-link issuance failed.");
      try {
        await (dependencies.sendWarning ?? sendIntakeIssuanceWarning)();
      } catch {
        report("Secure intake-link operational warning failed to send.");
      }
    }
  }

  try {
    if (groupInput) await (dependencies.sendGroup ?? sendGroupBookingEmails)(groupInput);
    else await (dependencies.sendIndividual ?? sendBookingEmails)(input, intakeLink);
  } catch {
    report("Booking email step threw unexpectedly.");
  }
}
