"use client";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { Zap, Rss, AlertTriangle, Bell } from "lucide-react";
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

const LiveTrackingMap = dynamic(() => import("@/components/dashboard/live-tracking-map"), {
    ssr: false,
    loading: () => <Skeleton className="h-[300px] w-full" />,
});

const smartDevices = [
    { id: "BUZZ-001", type: "Acoustic Buzzer", location: "Kothrud Fields", status: "Active" },
    { id: "CAM-004", type: "AI Camera", location: "Aarey Forest Edge", status: "Active" },
    { id: "SENS-012", type: "Infrared Sensor", location: "Vihighar Trail", status: "Inactive" },
    { id: "BUZZ-002", type: "Acoustic Buzzer", location: "Highway Crossing 1", status: "Active" },
];
  
export default function AlertsPage() {
    const { t } = useTranslation();

    const translatedLiveAlerts = [
        { time: t('alerts.live.time1'), device: "CAM-004", alert: t('alerts.live.alert1'), priority: "High" },
        { time: t('alerts.live.time2'), device: "SENS-012", alert: t('alerts.live.alert2'), priority: "Medium" },
        { time: t('alerts.live.time3'), device: "BUZZ-001", alert: t('alerts.live.alert3'), priority: "Low" },
    ];
    
    return (
        <div className="flex flex-col gap-8">
            <h1 className="text-3xl font-bold font-headline tracking-tight">
                {t('alerts.title')}
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                        <CardTitle className="flex items-center gap-2"><AlertTriangle /> {t('alerts.feed.title')}</CardTitle>
                        <CardDescription>{t('alerts.feed.description')}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {translatedLiveAlerts.map(alert => (
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
            </div>
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
                                        <Badge variant={device.status === 'Active' ? 'default' : 'secondary'} className={device.status === 'Active' ? 'bg-green-600/20 text-green-700' : ''}>
                                            {t(`alerts.devices.status.${device.status.toLowerCase()}` as any)}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right flex items-center justify-end gap-2">
                                        <Switch aria-label={`Toggle ${device.id}`} checked={device.status === 'Active'} />
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
    );
}
