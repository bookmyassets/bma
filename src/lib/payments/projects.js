const BOOKING_AMOUNT_RUPEES = 50_000;
const BOOKING_AMOUNT_PAISE = BOOKING_AMOUNT_RUPEES * 100;

export const PAYMENT_PROJECTS = Object.freeze({
  residency: Object.freeze({
    id: "residency",
    name: "WestWyn Residency",
    code: "WWR",
    merchant: "residency",
    bookingAmountRupees: BOOKING_AMOUNT_RUPEES,
    bookingAmountPaise: BOOKING_AMOUNT_PAISE,
  }),
  estates: Object.freeze({
    id: "estates",
    name: "WestWyn Estates",
    code: "WWE",
    merchant: "estates",
    bookingAmountRupees: BOOKING_AMOUNT_RUPEES,
    bookingAmountPaise: BOOKING_AMOUNT_PAISE,
  }),
});

export const PAYMENT_PROJECT_OPTIONS = Object.freeze(
  Object.values(PAYMENT_PROJECTS).map(({ id, name }) => ({ id, name })),
);

export function getPaymentProject(projectId) {
  if (typeof projectId !== "string") return null;
  return PAYMENT_PROJECTS[projectId.trim().toLowerCase()] ?? null;
}
