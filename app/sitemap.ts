import { MetadataRoute } from "next";

// Example: fetch blog/news slugs from your data source
async function getNewsSlugs() {
  // If you store posts in a database, fetch them here
  // For now, hardcode or fetch from API
  return [
    { slug: "binance-vs-blakdhut" },
    { slug: "crypto-trends-2025" },
  ];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.blakdhut.com";

  const staticRoutes = ["", "/about", "/contact", "/services"].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));

  const newsPosts = (await getNewsSlugs()).map((post) => ({
    url: `${baseUrl}/news/${post.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...newsPosts];
}
