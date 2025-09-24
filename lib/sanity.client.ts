import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "axrfxr95",      // 👈 your Sanity project ID
  dataset: "production",      // 👈 dataset name (default: production)
  apiVersion: "2025-09-19",   // 👈 use today’s date or latest
  useCdn: true,               // `false` if you want fresh data always
});

