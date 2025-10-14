"use client";

import React, { useState } from "react";
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

function LoginPageContent() {
  const router = useRouter();
  const { t } = useTranslation();
  const [username, setUsername] = useState("admin@ecoguardian.gov");
  const [password, setPassword] = useState("password");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-background overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent -z-10"/>
      <Card className="w-full max-w-sm shadow-2xl">
        <form onSubmit={handleLogin}>
          <CardHeader className="text-center">
            <Link href="/" className="flex justify-center items-center gap-2 mb-4">
              <Icons.Logo className="h-8 w-8 text-primary" />
              <CardTitle className="text-2xl font-headline">
                EcoGuardian
              </CardTitle>
            </Link>
            <CardDescription>
              {t('login.description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full">
              {t('login.loginButton')}
            </Button>
            <div className="text-sm text-center text-muted-foreground">
                {t('login.signupPrompt')}{" "}
                <Button variant="link" asChild className="p-0 h-auto">
                    <Link href="/signup">
                        {t('login.signupLink')}
                    </Link>
                </Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default function LoginPage() {
    return (
        <LanguageProvider>
            <LoginPageContent />
        </LanguageProvider>
    )
}
