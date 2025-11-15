
import { blogPosts } from "../../data/posts";

export async function GET() { 
  return Response.json(blogPosts); //Next.js ka built-in method Yeh JSON format me response banata hai  { "id": 1, "title": "first blog" },
}
//Response.json(blogPosts) ka matlab:  Poora blogPosts data frontend ko return kar do

// POST -> naya blog add karne ke liye

export async function POST(req) {
  const newPost = await req.json();
  blogPosts.push(newPost);
  return Response.json({ message: "added", newPost });
}

