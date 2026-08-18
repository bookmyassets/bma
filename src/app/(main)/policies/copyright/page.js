import { CopyrightPolicyContent } from "@/components/policies/PolicyContent";

export const metadata = {
  title: "BookMyAssets Copyright Policy | Intellectual Property",
  description:
    "Learn about BookMyAssets copyright and intellectual property rights, website content usage, reproduction restrictions, and how to report copyright infringement",
};

export default function CopyrightPage() {
  return (
    <>
      <meta name="robots" content="noindex, follow" />
      <CopyrightPolicyContent />
    </>
  );
}
