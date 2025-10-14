
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { HardDriveDownload, Loader2, WifiOff, FileText, Upload } from "lucide-react";

export default function OfflinePage() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold font-headline tracking-tight flex items-center gap-2">
        <WifiOff className="w-8 h-8" />
        Offline Reporting
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Sync Data from Device</CardTitle>
            <CardDescription>
              Connect your Arduino-based device and upload the stored incident data.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center gap-4 text-center h-48">
            <HardDriveDownload className="w-12 h-12 text-muted-foreground" />
            <p className="text-muted-foreground">
              Connect your device via USB to begin the sync process.
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
                <Upload className="mr-2"/>
                Upload Device Data
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Generate Offline Report</CardTitle>
            <CardDescription>
              Create a report from the data collected while offline.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center gap-4 text-center h-48">
             <FileText className="w-12 h-12 text-muted-foreground" />
             <p className="text-muted-foreground">
                Once data is synced, you can generate a report here.
             </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full" disabled>
              Generate Report
            </Button>
          </CardFooter>
        </Card>
      </div>
      <Card>
        <CardHeader>
            <CardTitle>Pending Sync Data</CardTitle>
            <CardDescription>
                Review data from your device before finalizing the report.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <Textarea placeholder="Uploaded data from your offline device will appear here in raw format, ready for processing..." rows={8} readOnly/>
        </CardContent>
      </Card>
    </div>
  );
}
