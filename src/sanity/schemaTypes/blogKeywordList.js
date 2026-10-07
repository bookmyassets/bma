export default {
  name: "blogKeywordList",
  title: "Blog Keyword List",
  type: "document",

  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      description:
        "Internal title used to identify this keyword collection in Sanity.",
      initialValue: "Dholera SIR Blog Keywords",
      validation: (Rule) => Rule.required(),
    },

    {
      name: "site",
      title: "Site",
      type: "string",
      description: "Website where this keyword list will be displayed.",
      options: {
        list: [
          {
            title: "BookMyAssets",
            value: "bookmyassets",
          },
        ],
        layout: "radio",
      },
      initialValue: "bookmyassets",
      validation: (Rule) => Rule.required(),
    },

    {
      name: "keywords",
      title: "Keywords",
      type: "array",
      description:
        "Add a destination blog and one or more comma-separated keywords per entry. Each keyword appears as its own tag.",
      validation: (Rule) =>
        Rule.required().min(1).error("Add at least one keyword."),

      of: [
        {
          name: "keywordItem",
          title: "Keyword",
          type: "object",

          fields: [
            {
              name: "label",
              title: "Keywords (comma-separated)",
              type: "string",
              description:
                'For example: "Dholera Smart City, Dholera SIR, Dholera Investment". Each keyword becomes a separate tag linking to the selected blog.',
              validation: (Rule) =>
                Rule.required().custom((value) => {
                  if (typeof value !== "string") return true;

                  return (
                    value.split(",").some((keyword) => keyword.trim()) ||
                    "Enter at least one keyword, separated by commas."
                  );
                }),
            },

            {
              name: "blog",
              title: "Destination Blog",
              type: "reference",
              description:
                "Select the blog that should open when any keyword in this entry is clicked.",
              to: [
                {
                  type: "post",
                },
              ],
              options: {
                filter: 'site == "bookmyassets"',
              },
              validation: (Rule) => Rule.required(),
            },

            {
              name: "active",
              title: "Active",
              type: "boolean",
              description:
                "Turn this off to hide all keywords in this entry.",
              initialValue: true,
            },
          ],

          preview: {
            select: {
              title: "label",
              subtitle: "blog.title",
              active: "active",
            },

            prepare({ title, subtitle, active }) {
              return {
                title: `${active === false ? "Hidden — " : ""}${title}`,
                subtitle: subtitle || "No destination blog selected",
              };
            },
          },
        },
      ],
    },
  ],

  preview: {
    select: {
      title: "title",
      site: "site",
      keywords: "keywords",
    },

    prepare({ title, site, keywords }) {
      const count = (keywords || []).reduce(
        (total, item) =>
          total +
          (typeof item?.label === "string"
            ? item.label.split(",").filter((keyword) => keyword.trim()).length
            : 0),
        0,
      );

      return {
        title: title || "Blog Keyword List",
        subtitle: `${site || "No site"} • ${count} keyword${
          count === 1 ? "" : "s"
        }`,
      };
    },
  },
};
