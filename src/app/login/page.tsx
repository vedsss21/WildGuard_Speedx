
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";
import { LanguageProvider, useTranslation } from "@/contexts/language-context";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { FirebaseClientProvider, useAuth, useUser } from "@/firebase";
import { initiateEmailSignIn, initiateGoogleSignIn } from "@/firebase/non-blocking-login";

function LoginPageContent() {
  const router = useRouter();
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const { t } = useTranslation();
  const [username, setUsername] = useState("admin@wildguard.gov");
  const [password, setPassword] = useState("password");
  const loginBgImage = PlaceHolderImages.find(p => p.id === 'login-background');

  useEffect(() => {
    // If the user is successfully authenticated and no longer loading, redirect to dashboard.
    if (!isUserLoading && user) {
      router.push("/dashboard");
    }
  }, [user, isUserLoading, router]);


  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) return;
    initiateEmailSignIn(auth, username, password);
  };

  const handleGoogleSignIn = () => {
    if (auth) {
      initiateGoogleSignIn(auth);
    }
  };


  return (
    <div className="relative flex items-center justify-center min-h-screen bg-background overflow-hidden">
        {loginBgImage && (
            <Image
                src={loginBgImage.imageUrl}
                alt={loginBgImage.description}
                layout="fill"
                objectFit="cover"
                className="absolute inset-0 z-0 opacity-20"
                data-ai-hint={loginBgImage.imageHint}
            />
        )}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent -z-10"/>
      <Card className="w-full max-w-sm shadow-2xl z-10 bg-background/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <Link href="/" className="flex justify-center items-center gap-2 mb-4">
              <Icons.Logo className="h-8 w-8 text-primary" />
              <CardTitle className="text-2xl font-headline">
                WildGuard
              </CardTitle>
            </Link>
            <CardDescription>
              {t('login.description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">{t('login.emailLabel')}</Label>
                  <Input
                    id="username"
                    type="email"
                    placeholder="official@example.com"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">{t('login.passwordLabel')}</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                 <Button type="submit" className="w-full">
                    {t('login.loginButton')}
                </Button>
            </form>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                    </span>
                </div>
            </div>
            <Button variant="outline" className="w-full" onClick={handleGoogleSignIn}>
                <Icons.google className="mr-2 h-4 w-4" />
                Sign in with Google
            </Button>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <div className="text-sm text-center text-muted-foreground">
                {t('login.signupPrompt')}{" "}
                <Button variant="link" asChild className="p-0 h-auto">
                    <Link href="/signup">
                        {t('login.signupLink')}
                    </Link>
                </Button>
            </div>
             <div className="text-sm text-center text-muted-foreground">
                <Button variant="link" asChild className="p-0 h-auto">
                    <Link href="/">
                        Back to Home
                    </Link>
                </Button>
            </div>
          </CardFooter>
      </Card>
    </div>
  );
}

export default function LoginPage() {
    return (
      <FirebaseClientProvider>
        <LanguageProvider>
            <LoginPageContent />
        </LanguageProvider>
      </FirebaseClientProvider>
    )
}
