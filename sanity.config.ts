'use client'

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

// Local imports
import { apiVersion, dataset, projectId } from './lib/sanity/env'
import { schemaTypes } from './schemas'   // ✅ FIXED PATH

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema: {
    types: schemaTypes,  // ✅ Use schemaTypes instead of schema
  },
  plugins: [
    structureTool(),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
