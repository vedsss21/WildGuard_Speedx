"use client";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { Map, Zap, Rss, AlertTriangle, Bell, Power, PowerOff } from "lucide-react";
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

const smartDevices = [
    { id: "BUZZ-001", type: "Acoustic Buzzer", location: "Kothrud Fields", status: "Active" },
    { id: "CAM-004", type: "AI Camera", location: "Aarey Forest Edge", status: "Active" },
    { id: "SENS-012", type: "Infrared Sensor", location: "Vihighar Trail", status: "Inactive" },
    { id: "BUZZ-002", type: "Acoustic Buzzer", location: "Highway Crossing 1", status: "Active" },
];

const liveAlerts = [
    { time: "2 mins ago", device: "CAM-004", alert: "Leopard detected near fence.", priority: "High" },
    { time: "15 mins ago", device: "SENS-012", alert: "Sensor offline.", priority: "Medium" },
    { time: "1 hour ago", device: "BUZZ-001", alert: "Buzzer activated manually by ranger.", priority: "Low" },
];
  
export default function AlertsPage() {
    return (
        <div className="flex flex-col gap-8">
            <h1 className="text-3xl font-bold font-headline tracking-tight">
                Hardware & Real-time Alerts
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Map /> Real-time Tracking</CardTitle>
                        <CardDescription>Live GPS feed from Arduino-based animal collars and ranger devices.</CardDescription>
                    </CardHeader>
                    <CardContent>
                       <div className="h-[300px] w-full bg-muted rounded-lg flex items-center justify-center">
                            <p className="text-muted-foreground">Live map with device locations will be shown here.</p>
                       </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Rss /> Live Alert Feed</CardTitle>
                        <CardDescription>Streaming alerts from all connected hardware devices.</CardDescription>
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
            </div>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Zap /> Solar-Powered Smart Devices</CardTitle>
                    <CardDescription>Manage your network of smart alert systems.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Device ID</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {smartDevices.map((device) => (
                                <TableRow key={device.id}>
                                    <TableCell className="font-mono">{device.id}</TableCell>
                                    <TableCell>{device.type}</TableCell>
                                    <TableCell>{device.location}</TableCell>
                                    <TableCell>
                                        <Badge variant={device.status === 'Active' ? 'default' : 'secondary'} className={device.status === 'Active' ? 'bg-green-600/20 text-green-700' : ''}>{device.status}</Badge>
                                    </TableCell>
                                    <TableCell className="text-right flex items-center justify-end gap-2">
                                        <Switch aria-label={`Toggle ${device.id}`} checked={device.status === 'Active'} />
                                        <Button variant="ghost" size="icon">
                                            <Bell className="h-4 w-4" />
                                            <span className="sr-only">Test Alert</span>
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
