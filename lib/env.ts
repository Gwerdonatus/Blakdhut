// lib/env.ts

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "axrfxr95"; 
export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";

// These are private / server-side envs
export const token = process.env.SANITY_API_TOKEN;
