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


function SignupPageContent() {
  const router = useRouter();
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert(t('signup.passwordMismatch'));
      return;
    }
    router.push("/dashboard");
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-background overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent -z-10"/>
      <Card className="w-full max-w-sm shadow-2xl">
        <form onSubmit={handleSignup}>
          <CardHeader className="text-center">
            <Link href="/" className="flex justify-center items-center gap-2 mb-4">
              <Icons.Logo className="h-8 w-8 text-primary" />
              <CardTitle className="text-2xl font-headline">
                EcoGuardian
              </CardTitle>
            </Link>
            <CardDescription>
              {t('signup.description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t('signup.emailLabel')}</Label>
              <Input
                id="email"
                type="email"
                placeholder="official@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t('signup.passwordLabel')}</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">{t('signup.confirmPasswordLabel')}</Label>
              <Input
                id="confirm-password"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full">
              {t('signup.createAccountButton')}
            </Button>
            <div className="text-sm text-center text-muted-foreground">
                {t('signup.loginPrompt')}{" "}
                <Button variant="link" asChild className="p-0 h-auto">
                    <Link href="/login">
                        {t('signup.loginLink')}
                    </Link>
                </Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}


export default function SignupPage() {
    return (
        <LanguageProvider>
            <SignupPageContent />
        </LanguageProvider>
    )
}
