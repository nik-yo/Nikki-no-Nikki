import { defineContentConfig, defineCollection, z } from '@nuxt/content'
import { asRobotsCollection } from '@nuxtjs/robots/content'

export default defineContentConfig({
  collections: {
    posts: defineCollection(
      asRobotsCollection({
        type: 'page',
        source: '**/*.md',
        schema: z.object({
          date: z.date(),
        }),
      })
    )
  }
})
