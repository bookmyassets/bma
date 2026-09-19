import { defineField, defineType } from "sanity";

const SALE_STATUS_OPTIONS = [
  {
    title: "Available",
    value: "available",
  },
  {
    title: "Sold",
    value: "sold",
  },
];

const PLOT_TIER_OPTIONS = [
  {
    title: "Premium",
    value: "premium",
  },
  {
    title: "Super Premium",
    value: "superPremium",
  },
];

const SALE_STATUS_LABELS = {
  available: "Available",
  sold: "Sold",
};

const PLOT_TIER_LABELS = {
  premium: "Premium",
  superPremium: "Super Premium",
};

const validateUniquePlot = async (_, context) => {
  const document = context.document;

  if (!document?.projectSlug || !document?.plotNumber) {
    return true;
  }

  const client = context.getClient({
    apiVersion: "2025-01-01",
  });

  const currentId = document._id?.replace(/^drafts\./, "");

  const duplicateCount = await client.fetch(
    `
      count(
        *[
          _type == "plotInventory" &&
          projectSlug == $projectSlug &&
          plotNumber == $plotNumber &&
          !(_id in [$publishedId, $draftId])
        ]
      )
    `,
    {
      projectSlug: document.projectSlug,
      plotNumber: document.plotNumber,
      publishedId: currentId,
      draftId: currentId ? `drafts.${currentId}` : "",
    }
  );

  if (duplicateCount > 0) {
    return `Plot ${document.plotNumber} already exists for this project.`;
  }

  return true;
};

export default defineType({
  name: "plotInventory",
  title: "Plot Inventory",
  type: "document",

  fields: [
    defineField({
      name: "projectSlug",
      title: "Project",
      type: "string",
      description: "Select the project this plot belongs to.",
      initialValue: "westwyn-residency",
      options: {
        list: [
          {
            title: "WestWyn Residency",
            value: "westwyn-residency",
          },
        ],
        layout: "dropdown",
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "plotNumber",
      title: "Plot Number",
      type: "number",
      description: "Plot number shown on the project master plan.",
      validation: (Rule) =>
        Rule.required()
          .integer()
          .min(1)
          .max(290)
          .custom(validateUniquePlot),
    }),

    defineField({
      name: "saleStatus",
      title: "Sale Status",
      type: "string",
      description:
        "Controls whether the plot is currently available or sold.",
      options: {
        list: SALE_STATUS_OPTIONS,
        layout: "radio",
      },
      validation: (Rule) =>
        Rule.required().custom((value) => {
          const allowedValues = SALE_STATUS_OPTIONS.map(
            (option) => option.value
          );

          if (!allowedValues.includes(value)) {
            return "Select Available or Sold.";
          }

          return true;
        }),
    }),

    defineField({
      name: "plotTier",
      title: "Plot Tier",
      type: "string",
      description:
        "Select Premium or Super Premium for available plots.",
      options: {
        list: PLOT_TIER_OPTIONS,
        layout: "radio",
      },
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const saleStatus = context.document?.saleStatus;

          if (saleStatus === "available" && !value) {
            return "Available plots must have a plot tier.";
          }

          if (
            value &&
            !PLOT_TIER_OPTIONS.some((option) => option.value === value)
          ) {
            return "Select Premium or Super Premium.";
          }

          return true;
        }),
    }),
  ],

  preview: {
    select: {
      plotNumber: "plotNumber",
      projectSlug: "projectSlug",
      saleStatus: "saleStatus",
      plotTier: "plotTier",
    },

    prepare({
      plotNumber,
      projectSlug,
      saleStatus,
      plotTier,
    }) {
      const projectLabel =
        projectSlug === "westwyn-residency"
          ? "WestWyn Residency"
          : projectSlug || "Project not set";

      const saleStatusLabel =
        SALE_STATUS_LABELS[saleStatus] || "Status not set";

      const plotTierLabel =
        PLOT_TIER_LABELS[plotTier] || null;

      let inventoryLabel = saleStatusLabel;

      if (saleStatus === "available") {
        inventoryLabel = plotTierLabel
          ? `${plotTierLabel} • Available`
          : "Available • Tier not set";
      }

      return {
        title: plotNumber ? `Plot ${plotNumber}` : "New Plot",
        subtitle: `${projectLabel} • ${inventoryLabel}`,
      };
    },
  },

  orderings: [
    {
      title: "Plot Number - Low to High",
      name: "plotNumberAscending",
      by: [
        {
          field: "plotNumber",
          direction: "asc",
        },
      ],
    },

    {
      title: "Plot Number - High to Low",
      name: "plotNumberDescending",
      by: [
        {
          field: "plotNumber",
          direction: "desc",
        },
      ],
    },

    {
      title: "Sale Status",
      name: "saleStatusAscending",
      by: [
        {
          field: "saleStatus",
          direction: "asc",
        },
        {
          field: "plotNumber",
          direction: "asc",
        },
      ],
    },

    {
      title: "Plot Tier",
      name: "plotTierAscending",
      by: [
        {
          field: "plotTier",
          direction: "asc",
        },
        {
          field: "plotNumber",
          direction: "asc",
        },
      ],
    },
  ],
});