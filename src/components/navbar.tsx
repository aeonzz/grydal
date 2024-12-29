import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import { ThemeToggle } from "./theme-toggle";
import { buttonVariants } from "./ui/button";
import { siteConfig } from "@/config/site";
import { Icons } from "./icons/icons";
import { SignInButton, SignInFallback } from "./signin-button";

// const musicLinks: { title: string; href: string; description: string }[] = [
//   {
//     title: "Discover",
//     href: "/music/discover",
//     description: "Explore new and trending music across various genres.",
//   },
//   {
//     title: "Playlists",
//     href: "/music/playlists",
//     description: "Create, manage, and share your favorite playlists.",
//   },
//   {
//     title: "Artists",
//     href: "/music/artists",
//     description: "Browse and follow your favorite artists.",
//   },
//   {
//     title: "Albums",
//     href: "/music/albums",
//     description: "Explore full albums and discographies.",
//   },
//   {
//     title: "Radio",
//     href: "/music/radio",
//     description: "Listen to curated radio stations based on your preferences.",
//   },
//   {
//     title: "Live Events",
//     href: "/music/events",
//     description:
//       "Find and book tickets for upcoming concerts and music events.",
//   },
// ];

interface NavBarProps {
  children?: React.ReactNode;
}

export function NavBar({ children }: NavBarProps) {
  const githubLink = React.useMemo(
    () => ({
      href: siteConfig.links.github,
      label: "GitHub repo",
    }),
    []
  );

  return (
    <header className="sticky top-0 z-10 w-full border-b bg-background">
      <div className="container flex h-14 items-center justify-between">
        <nav className="flex items-center gap-5">
          <Link href="/" prefetch className="text-xl font-bold tracking-tight">
            grydal
          </Link>
          {children}
          {/* <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Music</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {musicLinks.map((link) => (
                      <ListItem
                        key={link.title}
                        title={link.title}
                        href={link.href}
                      >
                        {link.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Features</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href="/features"
                        >
                          <Icons.music
                            className="h-6 w-6 mb-2"
                            aria-hidden="true"
                          />
                          <div className="mb-2 mt-4 text-lg font-medium">
                            eqeon Music
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Discover, stream, and share your favorite music.
                            Enjoy personalized playlists, high-quality audio,
                            and connect with artists.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <ListItem
                      href="/features/audio-quality"
                      title="Audio Quality"
                    >
                      Experience music in high-fidelity with our premium audio
                      streaming.
                    </ListItem>
                    <ListItem
                      href="/features/personalization"
                      title="Personalization"
                    >
                      Get tailored recommendations based on your listening
                      habits.
                    </ListItem>
                    <ListItem href="/features/social" title="Social Features">
                      Share music, collaborate on playlists, and connect with
                      friends.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/support" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Support
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu> */}
        </nav>
        <nav className="flex items-center gap-1">
          <React.Suspense fallback={<SignInFallback />}>
            <SignInButton />
          </React.Suspense>
          <Link
            href={githubLink.href}
            aria-label={githubLink.label}
            className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icons.gitHub className="size-4" aria-hidden="true" />
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ComponentRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
