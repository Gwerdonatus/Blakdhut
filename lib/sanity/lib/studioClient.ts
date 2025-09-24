// lib/sanity/studioClient.ts
import { createClient } from "next-sanity";
import { projectId, dataset, apiVersion, token } from "@/lib/env"; // ✅ fixed

export const studioClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token,         // only needed for write or private data
  useCdn: false, // you want fresh content in studio
});
