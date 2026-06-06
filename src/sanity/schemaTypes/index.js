// sanity/schemaTypes/index.js
import post from './post'; // Import the post schema
import author from './author'; // Import the author schema
import category from './category'; // Import the category schema
import blockContent from './blockContent';
import contact from './contact'; // Import the blockContent schema
import redirect from './redirect';
import receiptCounter from './receiptCounter';
import leadFormBlock from './objects/leadFormBlock';
import youtubeEmbed from './objects/youtubeEmbed';

export const schema = {
  types: [post, author, redirect, category, blockContent, contact, receiptCounter, leadFormBlock, youtubeEmbed], // Add all schemas here
};
