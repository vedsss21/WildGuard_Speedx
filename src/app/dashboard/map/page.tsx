
import MapView from "@/components/dashboard/map-view-full";

export default function MapPage() {
    return (
        <div className="flex flex-col gap-8">
            <h1 className="text-3xl font-bold font-headline tracking-tight">
                Live Map
            </h1>
            <div className="w-full h-[calc(100vh-10rem)]">
                <MapView />
            </div>
        </div>
    );
}
