export default {
  name: "receiptCounter",
  title: "Receipt Counter",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      readOnly: true,
    },
    {
      name: "lastReceiptNumber",
      title: "Last Receipt Number",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "updatedAt",
      title: "Updated At",
      type: "datetime",
      readOnly: true,
    },
  ],
};
