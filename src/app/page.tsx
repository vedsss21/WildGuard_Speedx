import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';

export default function LandingPage() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-image');

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center bg-background/95 backdrop-blur-sm fixed top-0 w-full z-50">
        <Link href="/" className="flex items-center justify-center">
          <Icons.Logo className="h-6 w-6 text-primary" />
          <span className="sr-only">EcoGuardian</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Button variant="ghost" asChild>
            <Link
              href="/login"
              className="text-sm font-medium"
            >
              Login
            </Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="relative w-full pt-12 md:pt-24 lg:pt-32 border-b">
          <div className="container px-4 md:px-6 grid gap-6 lg:grid-cols-[1fr_550px] lg:gap-12 xl:grid-cols-[1fr_650px] items-center">
            <div className="flex flex-col justify-center space-y-4 text-center lg:text-left">
              <div className="space-y-4">
                 <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline bg-clip-text text-transparent bg-gradient-to-r from-primary via-green-600 to-secondary-foreground">
                  EcoGuardian: For a Balanced Coexistence
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl mx-auto lg:mx-0">
                  Leveraging cutting-edge technology to monitor, analyze, and mitigate human-wildlife conflict. Join us in creating a safer world for both humans and animals.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row mx-auto lg:mx-0">
                <Button asChild size="lg">
                  <Link href="/dashboard">
                    Go to Dashboard
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/signup">
                    Get Started
                  </Link>
                </Button>
              </div>
            </div>
             <Image
                src={heroImage?.imageUrl || "https://picsum.photos/seed/hero/650/650"}
                alt="Hero"
                width={650}
                height={650}
                className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
                data-ai-hint={heroImage?.imageHint}
              />
          </div>
        </section>
      </main>
      <footer className="flex items-center justify-center p-6 bg-background">
        <p className="text-sm text-muted-foreground">&copy; 2024 EcoGuardian. All rights reserved.</p>
      </footer>
    </div>
  );
}
