import WestWynDocumentVault from "../components/westwyn/WestwynDocumentVault";

const documents = [
  {
    id: "na-noc-certificate",

    name: "NA/NOC Certificate",

    description:
      "Government-approved documentation confirming the required NOC and project approvals.",
  },

  {
    id: "title-clear",

    name: "Title Clear",

    description:
      "Clear ownership documentation with verified title records.",
  },

  {
    id: "encumbrance-certificate",

    name: "Encumbrance Certificate",

    description:
      "Documentation confirming that the property has no registered encumbrances.",
  },

  {
    id: "plan-pass",

    name: "Plan Pass",

    description:
      "Approved project planning and layout documentation.",
  },

  {
    id: "immediate-registry-possession",

    name: "Immediate Registry Possession",

    description:
      "Documentation supporting immediate registry and possession.",
  },
];

export default function DocumentVault() {
  return (
    <WestWynDocumentVault
      projectName="WestWyn Residency"
      documents={documents}
      sectionId="document-vault-slider"
    />
  );
}
