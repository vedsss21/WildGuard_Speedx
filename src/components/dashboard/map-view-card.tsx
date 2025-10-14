"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Skeleton } from "../ui/skeleton";
import { useTranslation } from "@/contexts/language-context";

const MapViewFull = dynamic(() => import("./map-view-full"), {
    ssr: false,
    loading: () => <Skeleton className="h-[400px] w-full" />,
});

export default function MapViewCard() {
    const { t } = useTranslation();
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>{t('mapCard.title')}</CardTitle>
                    <CardDescription>
                        {t('mapCard.description')}
                    </CardDescription>
                </div>
                <Button variant="outline" size="sm" asChild>
                    <Link href="/dashboard/map">
                        {t('mapCard.button')} <MoveRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </CardHeader>
            <CardContent>
                <div className="relative h-[400px] w-full rounded-lg overflow-hidden border">
                    <MapViewFull />
                </div>
            </CardContent>
        </Card>
    );
}
