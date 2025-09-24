"use client";

import { use } from "react"; // ✅ import use()
import { useState } from "react";
import Image from "next/image";
import useSWR from "swr";
import { BiBarChartAlt2 } from "react-icons/bi";
import { FiShare2, FiCopy } from "react-icons/fi";
import { FaWhatsapp, FaTelegramPlane, FaTwitter } from "react-icons/fa";
import { client } from "@/lib/sanity/lib/client";
import { urlFor } from "@/lib/sanity/lib/image";

export default function NewsPost({ params }: { params: Promise<{ slug: string }> }) {
  // ✅ unwrap params
  const { slug } = use(params);

  const [shareOpen, setShareOpen] = useState(false);

  const { data: post, error } = useSWR(
    `*[_type == "post" && slug.current == $slug][0]{
      title,
      slug,
      mainImage,
      publishedAt,
      "author": author->name,
      body
    }`,
    (query) => client.fetch(query, { slug })
  );

  if (error) return <p className="text-red-500">Failed to load post ❌</p>;
  if (!post) return <p className="text-gray-400">Loading...</p>;

  const pageUrl = `https://blakdhut.com/news/${post.slug.current}`;
  const views = Math.floor(Math.random() * (5000 - 1200 + 1) + 1200); // ✅ random views

  return (
    <section className="bg-[#181A20] text-white min-h-screen">
      {/* Hero */}
      <div className="relative w-full h-[300px] sm:h-[450px] lg:h-[550px]">
        {post.mainImage && (
          <Image
            src={urlFor(post.mainImage).width(1200).height(600).url()}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/50 flex items-center">
          <div className="max-w-4xl mx-auto px-6 space-y-4">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold leading-snug">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-[#EAECEF]/90 relative">
              <span>
                {post.publishedAt
                  ? new Date(post.publishedAt).toDateString()
                  : "No date"}
              </span>
              <span>· By {post.author || "Anonymous"}</span>
              <div className="flex items-center gap-2">
                <BiBarChartAlt2 className="text-[#F0B90B]" />
                <span>{views.toLocaleString()} views</span>
              </div>

              {/* Share dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShareOpen((prev) => !prev)}
                  className="flex items-center gap-1 hover:text-[#F0B90B] transition"
                >
                  <FiShare2 /> Share
                </button>
                {shareOpen && (
                  <div className="absolute top-8 left-0 bg-[#1E2329] border border-[#2B3139] rounded-lg shadow-lg z-50 w-40">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(pageUrl);
                        alert("Link copied!");
                        setShareOpen(false);
                      }}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-[#EAECEF] hover:bg-[#2B3139]"
                    >
                      <FiCopy /> Copy Link
                    </button>
                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(pageUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-[#EAECEF] hover:bg-[#2B3139]"
                    >
                      <FaWhatsapp className="text-green-500" /> WhatsApp
                    </a>
                    <a
                      href={`https://t.me/share/url?url=${encodeURIComponent(
                        pageUrl
                      )}&text=${encodeURIComponent(post.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-[#EAECEF] hover:bg-[#2B3139]"
                    >
                      <FaTelegramPlane className="text-sky-400" /> Telegram
                    </a>
                    <a
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                        pageUrl
                      )}&text=${encodeURIComponent(post.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-[#EAECEF] hover:bg-[#2B3139]"
                    >
                      <FaTwitter className="text-blue-400" /> Twitter
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <article
          className="prose prose-invert max-w-none prose-p:text-[#EAECEF] prose-p:leading-relaxed prose-strong:text-white prose-strong:font-semibold"
          dangerouslySetInnerHTML={{
            __html: post.body
              ? post.body[0]?.children?.map((p: any) => p.text).join("<br/>")
              : "",
          }}
        />
      </div>
    </section>
  );
}
