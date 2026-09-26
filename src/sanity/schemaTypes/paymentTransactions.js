import { defineField, defineType } from "sanity";

export default defineType({
  name: "paymentTransaction",
  title: "Payment Transaction",
  type: "document",

  fields: [
    defineField({
      name: "paymentReference",
      title: "Payment Reference",
      type: "string",
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "clientName",
      title: "Client Name",
      type: "string",
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "mobileNumber",
      title: "Mobile Number",
      type: "string",
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "email",
      title: "Email",
      type: "string",
      readOnly: true,
    }),

    defineField({
      name: "projectId",
      title: "Project",
      type: "string",
      readOnly: true,

      options: {
        list: [
          {
            title: "WestWyn Residency",
            value: "residency",
          },
          {
            title: "WestWyn Estates",
            value: "estates",
          },
        ],
      },

      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "projectName",
      title: "Project Name",
      type: "string",
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "projectCode",
      title: "Project Code",
      type: "string",
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "plotNumber",
      title: "Plot / Booking ID",
      type: "string",
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "merchant",
      title: "Payment Merchant",
      type: "string",
      readOnly: true,

      options: {
        list: [
          {
            title: "Residency Razorpay Account",
            value: "residency",
          },
          {
            title: "Estates Razorpay Account",
            value: "estates",
          },
        ],
      },

      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "amountRupees",
      title: "Amount",
      type: "number",
      readOnly: true,
      validation: (Rule) => Rule.required().positive(),
    }),

    defineField({
      name: "amountPaise",
      title: "Amount in Paise",
      type: "number",
      readOnly: true,
      validation: (Rule) => Rule.required().integer().positive(),
    }),

    defineField({
      name: "currency",
      title: "Currency",
      type: "string",
      readOnly: true,
      initialValue: "INR",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "status",
      title: "Payment Status",
      type: "string",
      readOnly: true,

      options: {
        list: [
          {
            title: "Pending",
            value: "pending",
          },
          {
            title: "Processing",
            value: "processing",
          },
          {
            title: "Paid",
            value: "paid",
          },
          {
            title: "Failed",
            value: "failed",
          },
          {
            title: "Expired",
            value: "expired",
          },
          {
            title: "Refunded",
            value: "refunded",
          },
        ],
      },

      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "razorpayQrId",
      title: "Razorpay QR ID",
      type: "string",
      readOnly: true,
    }),

    defineField({
      name: "razorpayQrImageUrl",
      title: "Razorpay QR Image URL",
      type: "url",
      readOnly: true,
    }),

    defineField({
      name: "razorpayPaymentId",
      title: "Razorpay Payment ID",
      type: "string",
      readOnly: true,
    }),

    defineField({
      name: "paymentMethod",
      title: "Payment Method",
      type: "string",
      readOnly: true,
    }),

    defineField({
      name: "qrExpiresAt",
      title: "QR Expires At",
      type: "datetime",
      readOnly: true,
    }),

    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "updatedAt",
      title: "Updated At",
      type: "datetime",
      readOnly: true,
    }),

    defineField({
      name: "paidAt",
      title: "Paid At",
      type: "datetime",
      readOnly: true,
    }),

    defineField({
      name: "lastWebhookReceivedAt",
      title: "Last Webhook Received At",
      type: "datetime",
      readOnly: true,
    }),
  ],

  orderings: [
    {
      title: "Newest First",
      name: "createdAtDesc",

      by: [
        {
          field: "createdAt",
          direction: "desc",
        },
      ],
    },
  ],

  preview: {
    select: {
      reference: "paymentReference",
      clientName: "clientName",
      projectName: "projectName",
      projectCode: "projectCode",
      plotNumber: "plotNumber",
      status: "status",
      amount: "amountRupees",
    },

    prepare({
      reference,
      clientName,
      projectName,
      projectCode,
      plotNumber,
      status,
      amount,
    }) {
      const cleanClientName = String(clientName || "CLIENT")
        .trim()
        .toUpperCase()
        .replace(/[^A-Z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

      const displayTitle = `BMA-${projectCode || "PAY"}-${cleanClientName}`;

      const statusLabel = status?.toUpperCase() || "UNKNOWN";

      return {
        title: displayTitle,

        subtitle: [
          reference,
          projectName,
          plotNumber ? `Plot ${plotNumber}` : null,
          amount ? `₹${Number(amount).toLocaleString("en-IN")}` : null,
          statusLabel,
        ]
          .filter(Boolean)
          .join(" • "),
      };
    },
  },
});
