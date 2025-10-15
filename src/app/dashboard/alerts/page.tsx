
"use client";
import React, { useState, useEffect, useRef } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
  } from "@/components/ui/card";
import { Zap, Rss, AlertTriangle, Bell, MessageSquareWarning } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useTranslation } from "@/contexts/language-context";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const LiveTrackingMap = dynamic(() => import("@/components/dashboard/live-tracking-map"), {
    ssr: false,
    loading: () => <Skeleton className="h-[300px] w-full" />,
});

const initialSmartDevices = [
    { id: "BUZZ-001", type: "Acoustic Buzzer", location: "Kothrud Fields", status: "Active" },
    { id: "CAM-004", type: "AI Camera", location: "Aarey Forest Edge", status: "Active" },
    { id: "SENS-012", type: "Infrared Sensor", location: "Vihighar Trail", status: "Inactive" },
    { id: "BUZZ-002", type: "Acoustic Buzzer", location: "Highway Crossing 1", status: "Active" },
];
  
export default function AlertsPage() {
    const { t } = useTranslation();
    const { toast } = useToast();
    const [isPlaying, setIsPlaying] = useState(false);
    const audioContextRef = useRef<AudioContext | null>(null);
    const oscillatorRef = useRef<OscillatorNode | null>(null);
    const [smartDevices, setSmartDevices] = useState(initialSmartDevices);

    const initialLiveAlerts = [
        { time: t('alerts.live.time1'), device: "CAM-004", alert: t('alerts.live.alert1'), priority: "High" },
        { time: t('alerts.live.time2'), device: "SENS-012", alert: t('alerts.live.alert2'), priority: "Medium" },
        { time: t('alerts.live.time3'), device: "BUZZ-001", alert: t('alerts.live.alert3'), priority: "Low" },
    ];
    const [liveAlerts, setLiveAlerts] = useState(initialLiveAlerts);

    const playBuzzer = () => {
        if (!audioContextRef.current) {
          try {
            audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
          } catch (e) {
            console.error("Web Audio API is not supported in this browser");
            return;
          }
        }
    
        if (oscillatorRef.current) {
            oscillatorRef.current.stop();
        }
    
        const oscillator = audioContextRef.current.createOscillator();
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(800, audioContextRef.current.currentTime);
        oscillator.connect(audioContextRef.current.destination);
        oscillator.start();
        
        oscillatorRef.current = oscillator;
        setIsPlaying(true);
    
        setTimeout(() => {
          stopBuzzer();
        }, 1000); 
    };
    
    const stopBuzzer = () => {
        if (oscillatorRef.current) {
          oscillatorRef.current.stop();
          oscillatorRef.current = null;
          setIsPlaying(false);
        }
    };

    useEffect(() => {
        const highPriorityAlert = liveAlerts.find(alert => alert.priority === "High");
        if (highPriorityAlert) {
          playBuzzer();
        }
    }, [liveAlerts]);

    const handleSendSms = () => {
        toast({
            title: "SMS Alert Sent",
            description: "A warning message has been broadcast to villagers in the affected area.",
        });
    }

    const toggleDeviceStatus = (deviceId: string) => {
        setSmartDevices(currentDevices =>
          currentDevices.map(device =>
            device.id === deviceId
              ? { ...device, status: device.status === 'Active' ? 'Inactive' : 'Active' }
              : device
          )
        );
      };

    return (
        <div className="flex flex-col gap-8">
            <h1 className="text-3xl font-bold font-headline tracking-tight">
                {t('alerts.title')}
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 grid gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                               <Rss className="h-5 w-5"/> {t('alerts.tracking.title')}
                            </CardTitle>
                            <CardDescription>{t('alerts.tracking.description')}</CardDescription>
                        </CardHeader>
                        <CardContent>
                           <div className="h-[300px] w-full rounded-lg overflow-hidden border">
                                <LiveTrackingMap />
                           </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Zap /> {t('alerts.devices.title')}</CardTitle>
                            <CardDescription>{t('alerts.devices.description')}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>{t('alerts.devices.table.deviceId')}</TableHead>
                                        <TableHead>{t('alerts.devices.table.type')}</TableHead>
                                        <TableHead>{t('alerts.devices.table.location')}</TableHead>
                                        <TableHead>{t('alerts.devices.table.status')}</TableHead>
                                        <TableHead className="text-right">{t('alerts.devices.table.actions')}</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {smartDevices.map((device) => (
                                        <TableRow key={device.id}>
                                            <TableCell className="font-mono">{device.id}</TableCell>
                                            <TableCell>{t(`alerts.devices.types.${device.type.toLowerCase().replace(' ','-')}` as any)}</TableCell>
                                            <TableCell>{device.location}</TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="p-0 h-auto"
                                                    onClick={() => toggleDeviceStatus(device.id)}
                                                    aria-label={`Toggle status for ${device.id}`}
                                                >
                                                    <Badge variant={device.status === 'Active' ? 'default' : 'secondary'} className={cn("cursor-pointer", device.status === 'Active' ? 'bg-green-600/20 text-green-700' : '')}>
                                                        {t(`alerts.devices.status.${device.status.toLowerCase()}` as any)}
                                                    </Badge>
                                                </Button>
                                            </TableCell>
                                            <TableCell className="text-right flex items-center justify-end gap-2">
                                                <Switch 
                                                    aria-label={`Toggle ${device.id}`} 
                                                    checked={device.status === 'Active'} 
                                                    onCheckedChange={() => toggleDeviceStatus(device.id)}
                                                />
                                                <Button variant="ghost" size="icon">
                                                    <Bell className="h-4 w-4" />
                                                    <span className="sr-only">{t('alerts.devices.testAlert')}</span>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
                <div className="flex flex-col gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><AlertTriangle /> {t('alerts.feed.title')}</CardTitle>
                            <CardDescription>{t('alerts.feed.description')}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {liveAlerts.map(alert => (
                                    <div key={alert.time} className="flex items-start gap-4">
                                        <div className="flex-shrink-0">
                                            <AlertTriangle className={`h-5 w-5 ${alert.priority === 'High' ? 'text-destructive' : alert.priority === 'Medium' ? 'text-amber-500' : 'text-muted-foreground'}`}/>
                                        </div>
                                        <div>
                                            <p className="font-medium">{alert.alert}</p>
                                            <p className="text-sm text-muted-foreground">{alert.device} &bull; {alert.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><MessageSquareWarning/> Emergency Actions</CardTitle>
                            <CardDescription>Quick actions for critical situations.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">
                                A pre-defined SMS will be sent to registered villagers in the vicinity of the high-priority alert.
                            </p>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" variant="destructive" onClick={handleSendSms}>
                                Send SMS to Villagers
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
