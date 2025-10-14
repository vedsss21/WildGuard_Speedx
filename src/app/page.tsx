
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { LanguageProvider, useTranslation } from '@/contexts/language-context';
import { motion, useInView } from 'framer-motion';
import React, { useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Siren, Users, MapPin } from 'lucide-react';
import { useSpring, animated } from '@react-spring/web';

function AnimatedNumber({ n }: { n: number }) {
    const { number } = useSpring({
      from: { number: 0 },
      number: n,
      delay: 200,
      config: { mass: 1, tension: 20, friction: 10 },
    });
    return <animated.div>{number.to((n) => n.toFixed(0))}</animated.div>;
}

function LandingPageContent() {
  const { t } = useTranslation();
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-image');
  const wildlifeCollage = PlaceHolderImages.find(p => p.id === 'wildlife-collage');

  const ref1 = useRef(null);
  const isInView1 = useInView(ref1, { once: true });
  const ref2 = useRef(null);
  const isInView2 = useInView(ref2, { once: true });

  const features = [
    {
      icon: <Siren className="h-10 w-10 text-primary" />,
      title: t('landing.features.realTimeAlerts.title'),
      description: t('landing.features.realTimeAlerts.description'),
    },
    {
      icon: <MapPin className="h-10 w-10 text-primary" />,
      title: t('landing.features.hotspotMapping.title'),
      description: t('landing.features.hotspotMapping.description'),
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: t('landing.features.communityReporting.title'),
      description: t('landing.features.communityReporting.description'),
    },
    {
        icon: <Shield className="h-10 w-10 text-primary" />,
        title: t('landing.features.aiAnalysis.title'),
        description: t('landing.features.aiAnalysis.description'),
    },
  ];

  const stats = [
    { number: 1284, label: t('landing.stats.incidentsReported') },
    { number: 32, label: t('landing.stats.activeAlerts') },
    { number: 118, label: t('landing.stats.rangersDeployed') },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="px-4 lg:px-6 h-14 flex items-center bg-background/80 backdrop-blur-sm fixed top-0 w-full z-50">
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
              {t('landing.login')}
            </Link>
          </Button>
          <Button asChild>
            <Link href="/signup">{t('landing.signUp')}</Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="relative w-full pt-24 md:pt-32 lg:pt-40 border-b overflow-hidden">
        <div 
            className="absolute inset-0 bg-cover bg-center opacity-10" 
            style={{backgroundImage: `url(${heroImage?.imageUrl})`}}
            data-ai-hint={heroImage?.imageHint}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-10" />

          <div className="container px-4 md:px-6 grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2 items-center relative z-20">
            <div className="flex flex-col justify-center space-y-4 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                 <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline bg-clip-text text-transparent bg-gradient-to-r from-primary via-green-500 to-primary/80">
                  {t('landing.title')}
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl mx-auto lg:mx-0">
                  {t('landing.subtitle')}
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col gap-2 min-[400px]:flex-row mx-auto lg:mx-0"
              >
                <Button asChild size="lg">
                  <Link href="/dashboard">
                    {t('landing.ctaDashboard')}
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/signup">
                    {t('landing.ctaGetStarted')}
                  </Link>
                </Button>
              </motion.div>
            </div>
             <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, type: 'spring', stiffness: 100 }}
                className="w-full h-full"
             >
                <Image
                    src={wildlifeCollage?.imageUrl || "https://picsum.photos/seed/hero/650/650"}
                    alt="Hero"
                    width={650}
                    height={650}
                    className="mx-auto aspect-video sm:aspect-square overflow-hidden rounded-2xl object-cover sm:w-full lg:order-last shadow-2xl shadow-primary/10"
                    data-ai-hint={wildlifeCollage?.imageHint}
                    priority
                />
             </motion.div>
          </div>
        </section>

        <section ref={ref1} className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView1 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm text-primary font-semibold">{t('landing.features.supertitle')}</div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{t('landing.features.title')}</h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    {t('landing.features.description')}
                  </p>
                </div>
              </div>
            </motion.div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-4 mt-12">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView1 ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="flex flex-col items-center text-center">
                      {feature.icon}
                      <CardTitle className="mt-4">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section ref={ref2} className="w-full py-12 md:py-24 lg:py-32 bg-secondary/50">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView2 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12"
            >
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{t('landing.byTheNumbers.title')}</h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    {t('landing.byTheNumbers.description')}
                  </p>
                </div>
                <div className="flex flex-wrap gap-4">
                    {stats.map((stat, index) => (
                        <div key={index} className="flex flex-col items-center p-4 rounded-lg min-w-[120px]">
                            <div className="text-5xl font-bold text-primary">
                                {isInView2 && <AnimatedNumber n={stat.number} />}
                            </div>
                            <p className="text-sm text-muted-foreground mt-2">{stat.label}</p>
                        </div>
                    ))}
                </div>
              </div>
              <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView2 ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Image
                    src="https://picsum.photos/seed/stats-image/600/400"
                    alt="Rangers"
                    width={600}
                    height={400}
                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full shadow-lg"
                    data-ai-hint="wildlife rangers team"
                />
              </motion.div>
            </motion.div>
          </div>
        </section>

      </main>
      <footer className="flex items-center justify-center p-6 bg-background">
        <p className="text-sm text-muted-foreground">© 2025 EcoGuardian. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default function LandingPage() {
    return (
        <LanguageProvider>
            <LandingPageContent />
        </LanguageProvider>
    )
}
