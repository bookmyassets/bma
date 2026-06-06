export default {
  name: 'youtubeEmbed',
  title: 'YouTube Embed',
  type: 'object',
  fields: [
    {
      name: 'url',
      title: 'YouTube URL',
      type: 'url',
      validation: (Rule) =>
        Rule.required().uri({ scheme: ['https'] }).custom((url) => {
          const isYoutube =
            /^https:\/\/(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)/.test(url)
          return isYoutube || 'Must be a valid YouTube URL'
        }),
    },
    {
      name: 'caption',
      title: 'Caption',
      type: 'string',
    },
  ],
  preview: {
    select: { url: 'url' },
    prepare({ url }) {
      return { title: '▶ YouTube Embed', subtitle: url }
    },
  },
}