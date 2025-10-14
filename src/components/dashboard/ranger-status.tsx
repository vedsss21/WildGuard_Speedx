"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTranslation } from "@/contexts/language-context";
import { rangersData } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function RangerStatus() {
  const { t } = useTranslation();
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('rangerStatus.title')}</CardTitle>
        <CardDescription>
          {t('rangerStatus.description')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {rangersData.map((ranger, index) => (
          <div key={index} className="flex items-center gap-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={ranger.avatarUrl} alt={ranger.name} data-ai-hint="person portrait"/>
              <AvatarFallback>
                {ranger.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-medium">{ranger.name}</p>
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "h-2 w-2 rounded-full",
                    ranger.status === "Online" ? "bg-green-500" : "bg-gray-400"
                  )}
                />
                <p className="text-sm text-muted-foreground">{t(`rangerStatus.statuses.${ranger.status.toLowerCase()}` as any)}</p>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
