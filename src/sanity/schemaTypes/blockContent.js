const TextColorDecorator = (props) => (
  <span style={{ color: props.value?.color || "inherit" }}>
    {props.children}
  </span>
);

const TextBackgroundDecorator = (props) => (
  <span style={{ backgroundColor: props.value?.color || "transparent" }}>
    {props.children}
  </span>
);

export default {
  name: "blockContent",
  title: "Block Content",
  type: "array",
  of: [
    {
      title: "Block",
      type: "block",
      // Styles including text alignment and font sizes
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H1", value: "h1" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "H5", value: "h5" },
        { title: "H6", value: "h6" },
        { title: "Quote", value: "blockquote" },
        { title: "Left Align", value: "leftAlign" },
        { title: "Center Align", value: "centerAlign" },
        { title: "Right Align", value: "rightAlign" },
        { title: "Justify", value: "justify" },
         { title: "Small", value: "small" },
        { title: "Medium", value: "medium" },
        { title: "Large", value: "large" },
        { title: "Extra Large", value: "xlarge" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
          { title: "Underline", value: "underline" },
          { title: "Code", value: "code" },
          { title: "Strike-through", value: "strike-through" },
          // Text color and background
          {
            title: "Text Color",
            value: "textColor",
            component: TextColorDecorator,
          },
          {
            title: "Text Background",
            value: "textBackground",
            component: TextBackgroundDecorator,
          },
        ],
        annotations: [
          {
            name: "link",
            title: "Link",
            type: "object",
            fields: [
              {
                name: "href",
                title: "URL",
                type: "url",
              },
            ],
          },
          // Button annotation
          {
            name: "button",
            title: "Button",
            type: "object",
            fields: [
              {
                name: "text",
                title: "Button Text",
                type: "string",
              },
              {
                name: "href",
                title: "URL",
                type: "url",
              },
              {
                name: "style",
                title: "Button Style",
                type: "string",
                options: {
                  list: [
                    { title: "Primary", value: "primary" },
                    { title: "Secondary", value: "secondary" },
                    { title: "Outline", value: "outline" },
                  ],
                },
              },
            ],
          },
        ],
      },
      // Enable spell checker
      options: {
        spellCheck: true,
      },
    },
    {
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    },
    // Code block
    {
      type: "code",
      title: "Code Block",
      options: {
        language: "javascript",
        languageAlternatives: [
          { title: "JavaScript", value: "javascript" },
          { title: "HTML", value: "html" },
          { title: "CSS", value: "css" },
        ],
        withFilename: true,
      },
    },
    // Table block
    {
      type: "table",
      title: "Table",
      options: {
        spellCheck: true,
      },
    },
  ],
};

