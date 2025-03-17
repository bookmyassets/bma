// sanity/schemaTypes/blockContent.js
export default {
    name: 'blockContent',
    title: 'Block Content',
    type: 'array',
    of: [
      {
        title: 'Block',
        type: 'block',
        styles: [
          { title: 'Normal', value: 'normal' },
          { title: 'H1', value: 'h1' },
          { title: 'H2', value: 'h2' },
          { title: 'H3', value: 'h3' },
          { title: 'Quote', value: 'blockquote' },
        ],
        lists: [{ title: 'Bullet', value: 'bullet' }],
        marks: {
          decorators: [
            { title: 'Strong', value: 'strong' },
            { title: 'Emphasis', value: 'em' },
          ],
          annotations: [
            {
              name: 'link',
              title: 'Link',
              type: 'object',
              fields: [
                {
                  name: 'href',
                  title: 'URL',
                  type: 'url',
                },
              ],
            },
          ],
        },
      },
      {
        type: 'image',
        options: { hotspot: true },
      },
    ],
  };