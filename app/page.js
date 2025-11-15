

"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

export default function Page() {
  const [blogPosts, setBlogPosts] = useState([]); ////Yahan initial value empty array ( [] ) di hui hai.
  const [search, setSearch] = useState("");
   const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  // Fetch blog posts
  useEffect(() => {
    fetch("/api/posts") //fetch builtin function hai jo api/server se data mangta hai 
      .then((res) => res.json())///res Ye API se aaya response hai. Response ko JSON format me convert karta hai. Kyuki fetch se raw response aata hai.
      .then((data) => setBlogPosts(data));//data Ye actual blog posts data hai (array ya object). React ki state update kr deta hai.
  }, []);

  // READ LOGIN STATUS
  useEffect(() => {
    const status = localStorage.getItem("isLoggedIn"); // <-- FIXED
    if (status === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn"); // <-- FIXED
    setIsLoggedIn(false);
    toast.success("Logged out");
  };

  const handleUpload = () => {
    if (!isLoggedIn) {
      toast.error("Please login first");
      return;
    }
    router.push("/upload");
  };

  const filteredPosts = blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-cover bg-center relative bg-black/80">
      <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>

      <div className="flex items-center gap-4">
        {!isLoggedIn && (
          <button
            onClick={() => router.push("/login")}
            className="px-4 py-2 bg-white text-black rounded-lg mt-4 cursor-pointer"
          >
            Login
          </button>
        )}

        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-white text-black rounded-lg mt-4 cursor-pointer"
          >
            Logout
          </button>
        )}
      </div>

      <div className="relative max-w-4xl mx-auto p-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white">
          All Blogs
        </h1>

        <div className="relative w-full mb-6">
          <input
            type="text"
            placeholder="Search blogs here..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 rounded w-full bg-white/90 px-4 py-3 pr-10 focus:outline-none"
          />

          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800 font-medium text-3xl cursor-pointer"
            >
              ×
            </button>
          )}
        </div>

        {filteredPosts.map((post) => (
          <div
            key={post.slug}
            className="border border-gray-300 rounded-lg p-4 mb-4 shadow hover:shadow-md transition bg-white/80"
          >
            <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
            <p className="text-sm text-gray-500 mb-2">
              Author: {post.author} | Date: {post.date}
            </p>
            <p className="mb-2">{post.content.slice(0, 100)}....</p>
            <Link
              href={`/posts/${post.slug}`}
              className="text-blue-500 hover:underline focus:outline-none"
            >
              Read More
            </Link>
          </div>
        ))}

        <button
          onClick={handleUpload}
          className="px-4 py-2 bg-white text-black rounded-lg cursor-pointer"
        >
          Upload blogs
        </button>
      </div>
    </div>
  );
}
