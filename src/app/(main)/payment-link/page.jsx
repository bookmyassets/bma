import PaymentClient from "./PaymentClient";

export const metadata = {
  title: "Make a Payment | BookMyAssets",
  description:
    "Make a secure booking payment for WestWyn Residency or WestWyn Estates.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PaymentPage() {
  return <PaymentClient />;
}