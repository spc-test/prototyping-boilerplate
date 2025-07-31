import { SiteConfig } from "@/types"

import { env } from "@/env.mjs"

export const siteConfig: SiteConfig = {
  name: "Todo App",
  author: "redpangilinan",
  description:
    "A beautiful and functional todo application built with Next.js 14, shadcn/ui, and TypeScript.",
  keywords: ["Todo", "Task Manager", "Next.js", "React", "Tailwind CSS", "shadcn/ui"],
  url: {
    base: env.NEXT_PUBLIC_APP_URL,
    author: "https://rdev.pro",
  },
  links: {
    github: "https://github.com/redpangilinan/next-entree",
  },
  ogImage: `${env.NEXT_PUBLIC_APP_URL}/og.jpg`,
}
