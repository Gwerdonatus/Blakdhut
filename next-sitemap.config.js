/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.blakdhut.com",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: "daily",
  priority: 0.7,
  exclude: ["/studio/*"],
  outDir: "./public",

  transform: async (config, path) => {
    return {
      loc: path, // keep default
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
    };
  },

  // ✅ Add Sanity posts dynamically
  additionalPaths: async (config) => {
    // Replace with your real Sanity details
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

    const query = encodeURIComponent(`*[_type == "post"]{ "slug": slug.current }`);
    const url = `https://${projectId}.api.sanity.io/v1/data/query/${dataset}?query=${query}`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      if (!data.result) return [];

      return data.result.map((post) => ({
        loc: `/news/${post.slug}`,
        changefreq: "daily",
        priority: 0.7,
        lastmod: new Date().toISOString(),
      }));
    } catch (err) {
      console.error("❌ Failed to fetch Sanity posts for sitemap:", err);
      return [];
    }
  },
};
