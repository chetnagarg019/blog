
import { blogPosts } from "../../data/posts";

export async function GET() {
  return Response.json(blogPosts);
}

// POST -> naya blog add karne ke liye
export async function POST(req) {
  const newPost = await req.json();
  blogPosts.push(newPost);
  return Response.json({ message: "added", newPost });
}
