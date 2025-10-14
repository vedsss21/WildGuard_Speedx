"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "../ui/skeleton";

const MapViewFull = dynamic(() => import("./map-view-full"), {
    ssr: false,
    loading: () => <Skeleton className="h-[400px] w-full" />,
});

export default function MapView() {
    return (
        <div className="relative h-[400px] w-full rounded-lg overflow-hidden border">
            <MapViewFull />
        </div>
    );
}
