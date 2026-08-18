import { PrivacyPolicyContent } from "@/components/policies/PolicyContent";

export const metadata = {
  title: "Privacy Policy | BookMyAssets",
  description:
    "Read the BookMyAssets Privacy Policy to learn how we collect, use, protect, and manage personal information, cookies, communications, and user data.",
};

export default function PrivacyPage() {
  return (
    <>
      <meta name="robots" content="noindex, follow" />
      <PrivacyPolicyContent />
    </>
  );
}
