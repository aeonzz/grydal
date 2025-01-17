import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import { ThemeToggle } from "./theme-toggle";
import { buttonVariants } from "./ui/button";
import { siteConfig } from "@/config/site";
import { Icons } from "./icons/icons";

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
        </nav>
        <nav className="flex items-center gap-1">
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
