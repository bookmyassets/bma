// sanity/schemas/redirect.js
export default {
  name: 'redirect',
  title: 'Redirects',
  type: 'document',
  fields: [
    {
      name: 'source',
      title: 'Source Path',
      type: 'string',
      description: 'e.g. /old-page',
      validation: Rule => Rule.required()
    },
    {
      name: 'destination',
      title: 'Destination Path',
      type: 'string',
      description: 'e.g. /new-page or https://example.com',
      validation: Rule => Rule.required()
    },
    {
      name: 'permanent',
      title: 'Permanent (301)?',
      type: 'boolean',
      description: 'If false, uses 302 temporary redirect',
      initialValue: false
    }
  ]
}