// app/blogs/page.js
import { getblogs } from "@/sanity/lib/api";
import BlogsPage from "./BlogsPage";

export default async function BlogsPageMain() {
  const posts = await getblogs();
  
  return <BlogsPage initialPosts={posts} />;
}

export const revalidate = 3600; // Revalidate data every hour