"use client";

import Link from "next/link";
import Image from "next/image";
import useSWR from "swr";
import { BiBarChartAlt2 } from "react-icons/bi";
import { FiShare2 } from "react-icons/fi";
import { urlFor } from "@/lib/sanity/lib/image"; // sanity helper
import { client } from "@/lib/sanity/lib/client";

// Fetch posts from Sanity
const fetcher = (query: string) => client.fetch(query);

// Format numbers (e.g. 1200 -> 1.2k, 5000 -> 5k)
function formatViews(num: number) {
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(".0", "") + "k";
  }
  return num.toString();
}

export default function NewsPage() {
  const { data: posts, error } = useSWR(
    `*[_type == "post"] | order(publishedAt desc){
      _id,
      title,
      slug,
      mainImage,
      publishedAt,
      "author": author->name,
      "categories": categories[]->title
    }`,
    fetcher
  );

  if (error) return <p className="text-red-500">Failed to load posts ❌</p>;
  if (!posts) return <p className="text-gray-400">Loading...</p>;

  return (
    <section className="min-h-screen bg-[#181A20] text-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-8">
          Blakdhut News & Blog
        </h1>
        <p className="text-[#B7BDC6] mb-12 max-w-2xl">
          Stay updated with crypto insights, guides, and the latest updates from
          Blakdhut.
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post: any, i: number) => {
            // Generate random views (1200–5000) once per render
            const views = Math.floor(Math.random() * (5000 - 1200 + 1)) + 1200;

            return (
              <Link
                key={post._id}
                href={`/news/${post.slug.current}`}
                className="rounded-xl overflow-hidden bg-[#1E2329] border border-[#2B3139] hover:scale-[1.02] hover:shadow-lg transition flex flex-col"
              >
                {/* Thumbnail or Fallback */}
                <div className="relative w-full h-48 flex items-center justify-center">
                  {post.mainImage ? (
                    <Image
                      src={urlFor(post.mainImage).width(600).height(400).url()}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center text-[#B7BDC6] text-sm"
                      style={{
                        backgroundColor: i % 2 === 0 ? "#2B3139" : "#0B0E11",
                      }}
                    >
                      No Image
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col gap-2 flex-grow">
                  <span className="text-xs text-[#F0B90B] font-semibold">
                    {post.categories?.[0] || "General"} ·{" "}
                    {post.publishedAt
                      ? new Date(post.publishedAt).toDateString()
                      : "No date"}
                  </span>
                  <h2 className="text-lg font-bold line-clamp-2">
                    {post.title}
                  </h2>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between px-4 py-3 border-t border-[#2B3139] text-xs text-[#B7BDC6]">
                  <div className="flex items-center gap-2">
                    <BiBarChartAlt2 className="text-[#F0B90B] text-lg" />
                    <span>{formatViews(views)}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      navigator.clipboard.writeText(
                        `https://blakdhut.com/news/${post.slug.current}`
                      );
                      alert("Link copied to clipboard ✅");
                    }}
                    className="flex items-center gap-1 hover:text-[#F0B90B] transition"
                  >
                    <FiShare2 className="text-sm" />
                    Share
                  </button>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
