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
  const posts = await client.fetch(query);
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
  const posts = await client.fetch(query);
  return posts;
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
  const posts = await client.fetch(query);
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
    const post = await client.fetch(query, { slug });
    return post;
  }