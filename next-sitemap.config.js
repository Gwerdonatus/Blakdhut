/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.blakdhut.com",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  additionalPaths: async (config) => {
    const newsPosts = [
      { slug: "binance-vs-blakdhut" },
      { slug: "crypto-trends-2025" },
    ];

    return newsPosts.map((post) => ({
      loc: `${config.siteUrl}/news/${post.slug}`,
      lastmod: new Date().toISOString(),
    }));
  },
};
