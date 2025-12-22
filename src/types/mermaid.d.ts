import type { mermaid } from 'mermaid'

declare module '#app' {
  interface NuxtApp {
    $mermaid: () => mermaid
  }
}

export {}
