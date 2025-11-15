'use client';
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link"; 

export default function PostPage() {
  const params = useParams();
  const { slug } = params;

  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => {
        const found = data.find(p => p.slug === slug); //stu => stu.rol === 2 
        setPost(found);
      });
  }, [slug]); //slug=bell useEffect = "light blink"

  if (!post) {
    return <p className="text-xl text-red-500 font-semibold p-6">Page not found or Loading...</p>;
  }

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 px-4 sm:px-6 md:px-8">
      <div className="w-full max-w-3xl p-6 border-4 text-center mt-4 bg-black/10 rounded-lg shadow-lg">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
          {post.title}
        </h1>
        <p className="text-gray-800 mb-6">
          Author: {post.author} | Date: {post.date}
        </p>
        <p className="text-md leading-relaxed">{post.content}</p>

        <Link href="/" className="mt-6 inline-block text-blue-500 hover:underline">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
