import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "axrfxr95", // your Sanity project ID
  dataset: "production", // default
  apiVersion: "2023-01-01", // use a fixed date
  useCdn: true, // `false` if you want fresh data
});
