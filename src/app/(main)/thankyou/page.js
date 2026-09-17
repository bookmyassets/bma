import ThankYouClient from "./ThankYouClient";

export const metadata = {
  title: "Thank You | BookMyAssets",

  robots: {
    index: false,
    follow: false,
    nocache: true,

    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function ThankYouPage() {
  return <ThankYouClient />;
}