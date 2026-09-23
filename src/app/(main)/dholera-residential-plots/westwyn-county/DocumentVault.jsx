import WestWynDocumentVault from "../components/westwyn/WestwynDocumentVault";

const documents = [
  {
    id: "na-noc-documents",
    name: "NA / NOC Documents",
  },

  {
    id: "title-documents",
    name: "Title Documents",
  },

  {
    id: "encumbrance-details",
    name: "Encumbrance Details",
  },

  {
    id: "approved-plan-details",
    name: "Approved Plan Details",
  },

  {
    id: "registry-information",
    name: "Registry Information",
  },
];

export default function DocumentVault({surface="base"}) {
  return (
    <WestWynDocumentVault
      projectName="WestWyn County"
      documents={documents}
      sectionId="westwyn-county-document-vault"
      surface={surface}
    />
  );
}