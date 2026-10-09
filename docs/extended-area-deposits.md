# Extended-area deposits — setup handoff

Approved October 9, 2026. Applies only to individually quoted extended-area appointments.

After reviewing the location and agreeing on care, appointment time and total fee, create a Square invoice for the **full quoted total**. Use Add Payment Schedule → Request Deposit → percentage or amount, with a deposit of at least 50%. Set an explicit deposit deadline in the quote and remaining balance due at the visit. Verify payment before confirming the appointment. Do not collect a second travel charge or treat the deposit as extra revenue beyond the quoted total.

Invoice terms: Deposit is applied toward the visit. Cancellation at least 24 hours before the appointment permits a full refund or optional transfer. Less than 24 hours or no-show forfeits the deposit. Practice cancellation results in a refund. For same-day bookings, explicitly explain before payment that the appointment is already within the forfeiture window.

No Square account changes or invoices were created in this implementation. A production invoice needs the actual customer, total, appointment and payment deadline. Square supports percentage or fixed deposit requests: https://squareup.com/help/us/en/article/6581-request-deposits-with-square-invoices

The location form sends to the existing BOOKING_NOTIFICATION_EMAIL using the existing Gmail service-account configuration. It does not create an appointment or take a payment. A real delivery test remains necessary in the deployed environment. Do not store patient medical information in this document.
