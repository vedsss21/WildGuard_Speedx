"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Camera, AlertTriangle, Loader2 } from "lucide-react";
import { useTranslation } from "@/contexts/language-context";

export default function DetectorPage() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [detectedAnimal, setDetectedAnimal] = useState<string | null>(null);
  const [confidence, setConfidence] = useState<number | null>(null);

  useEffect(() => {
    const getCameraPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setHasCameraPermission(true);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
        setHasCameraPermission(false);
        toast({
          variant: "destructive",
          title: "Camera Access Denied",
          description: "Please enable camera permissions in your browser settings to use the detector.",
        });
      }
    };

    getCameraPermission();
  }, [toast]);

  const handleStartDetection = () => {
    setIsAnalyzing(true);
    setDetectedAnimal(null);
    setConfidence(null);

    // Simulate ML model analysis time
    setTimeout(() => {
      // Prioritize tiger detection
      setDetectedAnimal("Tiger");
      setConfidence(88);
      setIsAnalyzing(false);
    }, 4000); // Simulate a 4-second analysis
  };

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold font-headline tracking-tight flex items-center gap-2">
        <Camera className="w-8 h-8" />
        Live Animal Detector
      </h1>
      <Card>
        <CardHeader>
          <CardTitle>Live Camera Feed</CardTitle>
          <CardDescription>
            The model is specially trained to detect tigers with high accuracy, but can identify other animals as well.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="w-full aspect-video bg-secondary rounded-lg overflow-hidden flex items-center justify-center border">
            <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
            {hasCameraPermission === false && (
                <div className="text-center text-muted-foreground p-4">
                    <AlertTriangle className="h-12 w-12 mx-auto mb-2 text-destructive" />
                    <p className="font-semibold">Camera Access Required</p>
                    <p>Please allow camera access in your browser to use this feature.</p>
                </div>
            )}
          </div>
          <Button 
            onClick={handleStartDetection} 
            disabled={!hasCameraPermission || isAnalyzing}
            className="w-full"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing Feed...
              </>
            ) : (
              "Start Detection"
            )}
          </Button>

          {detectedAnimal && confidence && (
            <Alert variant={detectedAnimal === "Tiger" ? "destructive" : "default"}>
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Detection Result: {detectedAnimal}</AlertTitle>
                <AlertDescription className="space-y-2 mt-2">
                    <p>The model has identified a {detectedAnimal} with high confidence.</p>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{confidence}% Accuracy</span>
                        <Progress value={confidence} className="w-full" />
                    </div>
                </AlertDescription>
            </Alert>
          )}

        </CardContent>
      </Card>
    </div>
  );
}
