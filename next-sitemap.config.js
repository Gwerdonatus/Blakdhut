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
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
    };
  },

  additionalPaths: async (config) => {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
    if (!projectId) return [];

    const query = encodeURIComponent(`*[_type == "post"]{ "slug": slug.current }`);
    const url = `https://${projectId}.api.sanity.io/v1/data/query/${dataset}?query=${query}`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      const results = data?.result ?? [];

      return results.map((post) => ({
        loc: `/news/${post.slug}`,
        changefreq: "daily",
        priority: 0.7,
        lastmod: new Date().toISOString(),
      }));
    } catch {
      return [];
    }
  },
};
