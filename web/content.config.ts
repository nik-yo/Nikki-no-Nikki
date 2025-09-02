import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    posts: defineCollection({
      type: 'page',
      source: '**/*.md',
      schema: z.object({
        date: z.date(),
      })
    })
  }
})
