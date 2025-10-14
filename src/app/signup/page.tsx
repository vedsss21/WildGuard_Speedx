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

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match");
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
              Create an account to join the mission.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
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
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
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
              Create Account
            </Button>
            <div className="text-sm text-center text-muted-foreground">
                Already have an account?{" "}
                <Button variant="link" asChild className="p-0 h-auto">
                    <Link href="/login">
                        Login
                    </Link>
                </Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
