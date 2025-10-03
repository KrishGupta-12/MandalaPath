'use client';
import Link from 'next/link';
import { Icons } from '@/components/shared/icons';
import { Button } from '@/components/ui/button';
import { useUser } from '@/firebase';
import { UserNav } from '@/components/auth/user-nav';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Puzzle } from 'lucide-react';

export function Header() {
  const { user } = useUser();
  const pathname = usePathname();

  const navItems = [
    { href: '/dashboard', label: 'Play', icon: Puzzle },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Icons.logo className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline">Mandala Path</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {user && navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 transition-colors hover:text-primary",
                  pathname?.startsWith(item.href) ? "text-primary" : "text-muted-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          {user ? (
            <UserNav />
          ) : (
            <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/login">Begin Journey</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
