import WestWynEstateClient from "./WestWynEstateClient";

export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return <WestWynEstateClient />;
}