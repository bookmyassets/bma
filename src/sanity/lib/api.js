// lib/api.js
import { client } from './client';
import { NextResponse } from 'next/server';

// Fetch all blog posts
export async function getPosts() {
  const query = `*[_type == "post" && "Project" in categories[]->title && author-> name == "BookMyAssets" ]{
    _id,
    title,
    slug,
    mainImage,
    publishedAt,
    body,
    author->{name, image},
    categories[]->{title}
  }`;
  const posts = await client.fetch(query, {}, { cache: 'no-store' });
  return posts;
}

export async function getblogs() {
  const query = `*[_type == "post" && "Blog" in categories[]->title && author-> name == "BookMyAssets" ]{
    _id,
    title,
    slug,
    mainImage,
    publishedAt,
    body,
    author->{name, image},
    categories[]->{title}
  }`;
  const posts = await client.fetch(query, {}, { cache: 'no-store' });
  return posts;
}

export async function Inventory() {
  const query = `*[_type == "post" && author->name == "Dholera Times" && "Project" in categories[]->title] | order(publishedAt desc) [0..9] {
      _id,
      title,
      publishedAt,
      mainImage,
      "pdfUrl": coalesce(pdfFile.asset->url, null),
      "category": coalesce(categories[]->title, []),
      "author": coalesce(author->name, "Unknown")
  }`;

  const url = `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/query/${process.env.NEXT_PUBLIC_SANITY_DATASET}?query=${encodeURIComponent(query)}`;

  try {
      const response = await fetch(url, { cache: 'no-store' }); // ✅ Cache disabled
      const json = await response.json();
      const posts = json.result || [];

      // Filter out posts with no pdfUrl
      const filteredPosts = posts.filter(post => post.pdfUrl);
      return filteredPosts;
  } catch (error) {
      console.error("Error fetching posts:", error);
      return [];
  }
}


export async function Brochure() {
  const query = `*[_type == "post" && author->name == "BookMyAssets" && "Brochure" in categories[]->title] | order(publishedAt desc) [0..9] {
      _id,
      title,
      publishedAt,
      mainImage,
      "pdfUrl": coalesce(pdfFile.asset->url, null),
      "category": coalesce(categories[]->title, []),
      "author": coalesce(author->name, "Unknown")
  }`;

  const url = `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/query/${process.env.NEXT_PUBLIC_SANITY_DATASET}?query=${encodeURIComponent(query)}`;

  try {
      const response = await fetch(url, { cache: 'no-store' }); // ✅ Cache disabled
      const json = await response.json();
      const posts = json.result || [];

      // Filter out posts with no pdfUrl
      const filteredPosts = posts.filter(post => post.pdfUrl);
      return filteredPosts;
  } catch (error) {
      console.error("Error fetching posts:", error);
      return [];
  }
}

export async function getEvents() {
  const query = `*[_type == "post" && "Events" in categories[]->title && author-> name == "BookMyAssets" ]{
    _id,
    title,
    slug,
    mainImage,
    publishedAt,
    body,
    author->{name, image},
    categories[]->{title}
  }`;
  const posts = await client.fetch(query, {}, { cache: 'no-store' });
  return posts;
}

// Fetch a single blog post by slug
export async function getPostBySlug(slug) {
    const query = `*[_type == "post" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      mainImage,
      publishedAt,
      body,
      author->{
        name,
        image
      },
      categories[]->{
        title
      }
    }`;
    const post = await client.fetch(query, { slug }, { cache: 'no-store' });
    return post;
  }



  export async function getEventBySlug(slug) {
    const query = `*[_type == "event" && slug.current == $slug][0]{
      _id,
      eventName,
      slug,
      mainImage,
      publishedAt,
      description,
      dateOfEvent,
      timeOfEvent,
      location,
      mapsLink,
      "eventMaterials": eventMaterials.asset->url,
      categories[]->{title, _id}
    }`;
    const post = await client.fetch(query, { slug }, { cache: 'no-store' });
    return post;
  }