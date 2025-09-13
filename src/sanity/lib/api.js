// lib/api.js
import { client } from "./client";
import { NextResponse } from "next/server";

// Define site name from env or fallback
const site = "bookmyassets";

/* Projects */
export async function getPosts() {
  const query = `*[_type == "post" && "Project" in categories[]->title && site == $site ]{
    _id, title, slug, mainImage, publishedAt, body, author->{name, image}, categories[]->{title}
  }`;
  return await client.fetch(query, { site }, { cache: "no-store" });
}

export async function getSub() {
  const query = `*[_type == "post" && "Sub-Project" in categories[]->title && site == $site ]{
    _id, 
    title, 
    slug, 
    mainImage, 
    publishedAt, 
    body, 
    author->{name, image}, 
    categories[]->{title},
    "projectDocuments": projectDocuments[]{
      _key,
      asset->{
        _id,
        url,
        originalFilename,
        mimeType,
        size
      }
    }
  }`;
  return await client.fetch(query, { site }, { cache: "no-store" });
}

export async function getblogs() {
  const query = `*[_type == "post" && "Blog" in categories[]->title && site == $site ]{
    _id, title, slug, mainImage, publishedAt, body, author->{name, image}, categories[]->{title}
  }`;
  return await client.fetch(query, { site }, { cache: "no-store" });
}

export async function getUpdates() {
  const query = `*[_type == "post" && "Updates" in categories[]->title && site == $site ]{
    _id, title, slug, mainImage, publishedAt, _createdAt, body, author->{name, image}, categories[]->{title}
  }`;
  return await client.fetch(query, { site }, { cache: "no-store" });
}

export async function projectInfo() {
  const query = `*[_type == "post" && "project-Info" in categories[]->title && site == $site ]{
    _id, title, slug, mainImage, publishedAt, body, author->{name, image}, categories[]->{title}
  }`;
  return await client.fetch(query, { site }, { cache: "no-store" });
}

/* Inventory & Brochure */
export async function Inventory() {
  const query = `*[_type == "post" && site == $site && "Sub-Project" in categories[]->title] | order(publishedAt desc) {
    _id, title, publishedAt, mainImage,
    "pdfUrl": coalesce(pdfFile.asset->url, null),
    "categories": coalesce(categories[]->title, []),
    "author": coalesce(author->name, "Unknown"),
    "isSoldOut": "Sold Out" in categories[]->title
  }`;

  return await client
    .fetch(query, { site }, { cache: "no-store" })
    .then((posts) => posts.filter((post) => post.pdfUrl))
    .catch((error) => {
      console.error("Error fetching Inventory:", error);
      return [];
    });
}

export async function Brochure() {
  const query = `*[_type == "post" && site == $site && "Brochure" in categories[]->title] | order(publishedAt desc) [0..9] {
    _id, title, publishedAt, mainImage,
    "pdfUrl": coalesce(pdfFile.asset->url, null),
    "category": coalesce(categories[]->title, []),
    "author": coalesce(author->name, "Unknown")
  }`;

  return await client
    .fetch(query, { site }, { cache: "no-store" })
    .then((posts) => posts.filter((post) => post.pdfUrl))
    .catch((error) => {
      console.error("Error fetching Brochure:", error);
      return [];
    });
}

/* Events */
export async function getEvents() {
  const query = `*[_type == "post" && "Events" in categories[]->title && site == $site ]{
    _id, title, slug, mainImage, publishedAt, body, author->{name, image}, categories[]->{title}
  }`;
  return await client.fetch(query, { site }, { cache: "no-store" });
}

/* Fetch single post by slug */
export async function getPostBySlug(slug) {
  const query = `*[_type == "post" && slug.current == $slug && site == $site][0]{
    _id, title, metaTitle, metaDescription, "keywords": keywords[]->title, slug,
    mainImage { asset->{ _id, _ref, url, metadata{ dimensions, lqip } }, alt, caption, url },
    publishedAt, _createdAt,
    body[]{ ..., _type=="image"=>{..., asset->{ _id, _ref, url, metadata{ dimensions, lqip } }, "url": url }, markDefs[]{..., _type=="link"=>{"href":@.href}} },
    author->{ name, image }, categories[]->{ title, _id }, readingTime
  }`;
  return await client.fetch(query, { slug, site });
}

export async function projectInfoX() {
  const query = `*[_type == "post" && "project-Info" in categories[]->title && author->name == "BookMyAssets"]{
    _id,
    title,
    slug,
    mainImage,
    publishedAt,
    body,
    author->{name, image},
    categories[]->{title}
  }`;

  const posts = await client.fetch(query, {}, { cache: "no-store" });

  // Wrap into an object with `relatedProjects` key to match your component expectations
  return { relatedProjects: posts };
}

// FIXED: Added projectDocuments to the query
export async function getProjectBySlug(slug) {
  const query = `*[
    _type == "post" && slug.current == $slug && site == $site
  ][0]{
    title, metaTitle, metaDescription, keywords, description, body,
    categories[]->{title},
    mainImage, location, investment, returns,
    "projectDocuments": projectDocuments[]{
      _key,
      asset->{
        _id,
        url,
        originalFilename,
        mimeType,
        size
      }
    },
    "relatedProjects": *[
      _type == "post" && site == $site && "Sub-Project" in categories[]->title && !("Sold Out" in categories[]->title) && slug.current != $slug
    ]{
      title, "slug": slug.current, mainImage
    }
  }`;
  return await client.fetch(query, { slug, site });
}

export async function getSubProjects(slug) {
  const query = `*[
    _type == "post" && slug.current == $slug && site == $site
  ][0]{
    title, metaTitle, metaDescription, keywords, description, body,
    categories[]->{title},
    mainImage, location, investment, returns,
    "projectDocuments": projectDocuments[]{
      _key,
      asset->{
        _id,
        url,
        originalFilename,
        mimeType,
        size
      }
    },
    "relatedProjects": *[
      _type == "post" && site == $site && "Sub-Project" in categories[]->title && slug.current != $slug
    ]{
      title, "slug": slug.current, mainImage
    }
  }`;
  return await client.fetch(query, { slug, site });
}

export async function getProjectSOBySlug(slug) {
  const query = `*[
    _type == "post" && slug.current == $slug && site == $site
  ][0]{
    title, metaTitle, metaDescription, keywords, description, body,
    categories[]->{title},
    mainImage, location, investment, returns,
    "projectDocuments": projectDocuments[]{
      _key,
      asset->{
        _id,
        url,
        originalFilename,
        mimeType,
        size
      }
    },
    "relatedProjects": *[
      _type == "post" && site == $site && "Sub-Project" in categories[]->title && "Sold Out" in categories[]->title && slug.current != $slug
    ]{
      _id,
      title,
      slug,
      mainImage
    }
  }`;
  return await client.fetch(query, { slug, site });
}

export async function getAllSubProjects() {
  const query = `*[
    _type == "post" && "Sub-Project" in categories[]->title && site == $site
  ]{
    title, "slug": slug.current, mainImage, categories[]->{title},
    "projectDocuments": projectDocuments[]{
      _key,
      asset->{
        _id,
        url,
        originalFilename,
        mimeType,
        size
      }
    }
  }`;
  return await client.fetch(query, { site });
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
  const post = await client.fetch(query, { slug }, { cache: "no-store" });
  return post;
}