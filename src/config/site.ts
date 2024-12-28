import { env } from "@/env";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "grydal",
  description:
    "grydal is an application where users can share their works and collaborate with others. It provides a simple and intuitive platform for showcasing and discovering projects.",
  url: env.NEXT_PUBLIC_APP_URL,
  links: { github: "https://github.com/aeonzz/eqeon" },
};
