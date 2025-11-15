"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Upload() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");
  const [slug, setSlug] = useState("");
  const router = useRouter();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (!loggedIn) router.push("/login"); // redirect if not logged in
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const slug = title.toLowerCase().replace(/\s+/g, "-");
    const newPost = { title, author, date, content, slug };
    await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    });
    router.push("/");
  };
  

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-[250px] sm:w-[350px] md:w-[380px] flex flex-col gap-3"
      >
        <h2 className="text-3xl font-bold mb-4 text-center">Upload Blog</h2>
        <input
          type="text"
          placeholder="Blog title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Blog author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="date"
          placeholder="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <textarea
          placeholder="Write your blog content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border p-2 rounded h-40 w-full resize-none"
          required
        />
        
        <input
          type="text"
          placeholder="Slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white py-2 rounded">
          Post blog
        </button>
      </form>
    </div>
  );
}
