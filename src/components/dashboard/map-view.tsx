import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MapView() {
  const mapImage = PlaceHolderImages.find((p) => p.id === "map-view");

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Live Hotspots & Animal Movement</CardTitle>
          <CardDescription>
            Interactive map of high-conflict zones and tracked wildlife.
          </CardDescription>
        </div>
         <Button variant="outline" size="sm">
            Full Map <MoveRight className="ml-2 h-4 w-4" />
          </Button>
      </CardHeader>
      <CardContent>
        <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden border">
          {mapImage && (
            <Image
              src={mapImage.imageUrl}
              alt={mapImage.description}
              fill
              className="object-cover"
              data-ai-hint={mapImage.imageHint}
            />
          )}
          {/* Mock Markers */}
          <div className="absolute top-[20%] left-[30%]">
            <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse" title="High-Conflict Zone"></div>
          </div>
          <div className="absolute top-[50%] left-[55%]">
            <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse" title="High-Conflict Zone"></div>
          </div>
          <div className="absolute top-[65%] left-[40%]">
            <div className="w-3 h-3 bg-yellow-400 rounded-full border-2 border-white animate-pulse" title="Animal Sighting"></div>
          </div>
          <div className="absolute top-[35%] left-[70%]">
            <div className="w-5 h-5 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center text-white font-bold text-xs" title="Ranger Patrol">R</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
