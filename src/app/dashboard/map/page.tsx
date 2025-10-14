
import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";

const MapViewFull = dynamic(() => import("@/components/dashboard/map-view-full"), {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[calc(100vh-10rem)]" />,
});

export default function MapPage() {
    return (
        <div className="flex flex-col gap-8">
            <h1 className="text-3xl font-bold font-headline tracking-tight">
                Live Map
            </h1>
            <div className="w-full h-[calc(100vh-10rem)]">
                <MapViewFull />
            </div>
        </div>
    );
}
