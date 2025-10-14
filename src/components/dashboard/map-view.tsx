
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

const MapViewFull = dynamic(() => import("./map-view-full"), {
    ssr: false,
    loading: () => <Skeleton className="h-full w-full" />,
});

export default function MapView() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Live Hotspots & Animal Movement</CardTitle>
                    <CardDescription>
                        Interactive map of high-conflict zones and tracked wildlife.
                    </CardDescription>
                </div>
                <Button variant="outline" size="sm" asChild>
                    <Link href="/dashboard/map">
                        Full Map <MoveRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </CardHeader>
            <CardContent>
                <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden border">
                    <MapViewFull />
                </div>
            </CardContent>
        </Card>
    );
}
