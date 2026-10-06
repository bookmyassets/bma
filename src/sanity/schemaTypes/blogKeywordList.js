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
        "These keywords will appear in the Dholera SIR blogs keyword section.",
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
              title: "Keyword",
              type: "string",
              description:
                'Text shown to users, for example "Dholera Smart City".',
              validation: (Rule) => Rule.required(),
            },

            {
              name: "blog",
              title: "Destination Blog",
              type: "reference",
              description:
                "Select the blog that should open when this keyword is clicked.",
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
                "Turn this off if you temporarily want to hide the keyword.",
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
      const count = keywords?.length || 0;

      return {
        title: title || "Blog Keyword List",
        subtitle: `${site || "No site"} • ${count} keyword${
          count === 1 ? "" : "s"
        }`,
      };
    },
  },
};