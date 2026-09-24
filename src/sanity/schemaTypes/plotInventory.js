import { defineField, defineType } from "sanity";

import {
  getPlotInventoryProject,
  getPlotInventoryProjectOptions,
} from "../plotInventoryProjects";

async function validateUniquePlot(value, context) {
  if (value === undefined || value === null) {
    return true;
  }

  const projectSlug = context.document?.projectSlug;

  if (!projectSlug) {
    return "Select a project before entering the plot number.";
  }

  const client = context.getClient({
    apiVersion: "2024-01-01",
  });

  const documentId = context.document?._id || "";

  const publishedId = documentId.replace(/^drafts\./, "");

  const draftId = publishedId ? `drafts.${publishedId}` : "";

  const duplicateExists = await client.fetch(
    `
      count(
        *[
          _type == "plotInventory"
          && projectSlug == $projectSlug
          && plotNumber == $plotNumber
          && _id != $publishedId
          && _id != $draftId
        ]
      ) > 0
    `,
    {
      projectSlug,
      plotNumber: value,
      publishedId,
      draftId,
    },
  );

  if (duplicateExists) {
    return `Plot ${value} already exists for this project.`;
  }

  return true;
}

/*
|--------------------------------------------------------------------------
| SCHEMA
|--------------------------------------------------------------------------
*/

export default defineType({
  name: "plotInventory",

  title: "Plot Inventory",

  type: "document",

  fields: [
    /*
    |--------------------------------------------------------------------------
    | PROJECT
    |--------------------------------------------------------------------------
    */

    defineField({
      name: "projectSlug",

      title: "Project",

      type: "string",

      description: "Select the project this plot belongs to.",

      options: {
        list: getPlotInventoryProjectOptions(),

        layout: "dropdown",
      },

      validation: (Rule) =>
        Rule.required().error("Project selection is required."),
    }),

    /*
    |--------------------------------------------------------------------------
    | PLOT NUMBER
    |--------------------------------------------------------------------------
    */

    defineField({
      name: "plotNumber",

      title: "Plot Number",

      type: "number",

      description:
        "Enter the plot number exactly as shown in the project layout.",

      validation: (Rule) =>
        Rule.required()
          .integer()
          .custom(async (value, context) => {
            if (value === undefined || value === null) {
              return true;
            }

            const projectSlug = context.document?.projectSlug;

            if (!projectSlug) {
              return "Select the project first.";
            }

            const project = getPlotInventoryProject(projectSlug);

            if (!project) {
              return "The selected project is not configured for plot inventory.";
            }

            if (
              value < project.minPlotNumber ||
              value > project.maxPlotNumber
            ) {
              return `${project.title} supports plot numbers ${project.minPlotNumber} to ${project.maxPlotNumber}.`;
            }

            return validateUniquePlot(value, context);
          }),
    }),

    /*
    |--------------------------------------------------------------------------
    | SALE STATUS
    |--------------------------------------------------------------------------
    */

    defineField({
      name: "saleStatus",

      title: "Sale Status",

      type: "string",

      description: "Current sales status of this plot.",

      options: {
        list: [
          {
            title: "Available",
            value: "available",
          },
          {
            title: "Sold",
            value: "sold",
          },
        ],

        layout: "radio",
      },

      validation: (Rule) => Rule.required().error("Sale status is required."),
    }),

    /*
    |--------------------------------------------------------------------------
    | PLOT TIER
    |--------------------------------------------------------------------------
    */

    defineField({
      name: "plotTier",

      title: "Plot Tier",

      type: "string",

      description:
        "Premium classification used by projects that support plot tiers.",

      options: {
        list: [
          {
            title: "Premium",
            value: "premium",
          },
          {
            title: "Super Premium",
            value: "superPremium",
          },
        ],

        layout: "radio",
      },

      hidden: ({ document }) => {
        const project = getPlotInventoryProject(document?.projectSlug);

        if (!project?.usesPlotTier) {
          return true;
        }

        return document?.saleStatus !== "available";
      },

      validation: (Rule) =>
        Rule.custom((value, context) => {
          const projectSlug = context.document?.projectSlug;

          const saleStatus = context.document?.saleStatus;

          const project = getPlotInventoryProject(projectSlug);

          if (!project?.usesPlotTier) {
            return true;
          }

          if (saleStatus === "available" && !value) {
            return "Select Premium or Super Premium for an available plot.";
          }

          return true;
        }),
    }),
  ],

  /*
  |--------------------------------------------------------------------------
  | ORDERING
  |--------------------------------------------------------------------------
  */

  orderings: [
    {
      title: "Plot Number - Ascending",

      name: "plotNumberAsc",

      by: [
        {
          field: "plotNumber",
          direction: "asc",
        },
      ],
    },

    {
      title: "Plot Number - Descending",

      name: "plotNumberDesc",

      by: [
        {
          field: "plotNumber",
          direction: "desc",
        },
      ],
    },
  ],

  /*
  |--------------------------------------------------------------------------
  | STUDIO PREVIEW
  |--------------------------------------------------------------------------
  */

  preview: {
    select: {
      projectSlug: "projectSlug",
      plotNumber: "plotNumber",
      saleStatus: "saleStatus",
      plotTier: "plotTier",
    },

    prepare({ projectSlug, plotNumber, saleStatus, plotTier }) {
      const project = getPlotInventoryProject(projectSlug);

      const projectLabel =
        project?.title || projectSlug || "Project not selected";

      let statusLabel = "Status not selected";

      if (saleStatus === "sold") {
        statusLabel = "Sold";
      }

      if (saleStatus === "available") {
        if (project?.usesPlotTier) {
          if (plotTier === "premium") {
            statusLabel = "Available - Premium";
          } else if (plotTier === "superPremium") {
            statusLabel = "Available - Super Premium";
          } else {
            statusLabel = "Available - Tier Required";
          }
        } else {
          statusLabel = "Available";
        }
      }

      return {
        title:
          plotNumber !== undefined
            ? `Plot ${plotNumber}`
            : "Plot number not set",

        subtitle: `${projectLabel} • ${statusLabel}`,
      };
    },
  },
});
