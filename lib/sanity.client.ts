import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "axrfxr95",      // 👈 your Sanity project ID
  dataset: "production",      // 👈 dataset name (default: production)
  apiVersion: "2023-01-01",   // 👈 use today’s date or latest
  useCdn: true,               // `false` if you want fresh data always
});
