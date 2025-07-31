import { SiteConfig } from "@/types"

import { env } from "@/env.mjs"

export const siteConfig: SiteConfig = {
  name: "My Todo App - Task Manager",
  author: "redpangilinan",
  description:
    "A beautiful and functional todo application built with Next.js 14, shadcn/ui, and TypeScript. Stay organized and boost your productivity.",
  keywords: ["Todo", "Task Manager", "Productivity", "Next.js", "React", "Tailwind CSS", "shadcn/ui"],
  url: {
    base: env.NEXT_PUBLIC_APP_URL,
    author: "https://rdev.pro",
  },
  links: {
    github: "https://github.com/redpangilinan/next-entree",
  },
  ogImage: `${env.NEXT_PUBLIC_APP_URL}/og.jpg`,
}
