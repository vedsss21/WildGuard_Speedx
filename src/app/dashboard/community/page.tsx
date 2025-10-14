"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { List, MapPin, Siren, CheckCircle, BookOpen } from "lucide-react";
import { recentIncidentsData } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const safetyGuides = [
  {
    title: "Encountering a Leopard",
    content: "Stay calm. Do not run. Make yourself look larger and back away slowly. Avoid direct eye contact."
  },
  {
    title: "Snake Bite First Aid",
    content: "Keep the person calm and still. Keep the affected area below the heart. Do not apply a tourniquet or cut the wound. Seek medical help immediately."
  },
  {
    title: "Protecting Crops from Wild Boars",
    content: "Use sturdy fencing. Boars are strong, so the fence should be well-maintained. Scare devices and night patrols can also be effective."
  },
  {
    title: "If you see an elephant",
    content: "Keep a safe distance. Do not approach or feed the elephant. If it charges, run in a zig-zag pattern and try to find cover behind a large object."
  }
];

export default function CommunityHubPage() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold font-headline tracking-tight">
        Community Hub
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Siren className="text-destructive"/>Instant Alerts</CardTitle>
              <CardDescription>
                Real-time notifications about wildlife activity in your area.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <Alert variant="destructive">
                  <Siren className="h-4 w-4" />
                  <AlertTitle>Leopard Sighting near Vihighar village</AlertTitle>
                  <AlertDescription>
                    A leopard was sighted 30 minutes ago. Residents are advised to stay indoors and keep livestock secured.
                  </AlertDescription>
                </Alert>
                <Alert>
                  <CheckCircle className="h-4 w-4 text-green-500"/>
                  <AlertTitle>All Clear: Elephant Herd Moved On</AlertTitle>
                  <AlertDescription>
                    The elephant herd reported near the highway has safely moved back into the forest. The area is now clear.
                  </AlertDescription>
                </Alert>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><List />Nearby Incidents</CardTitle>
              <CardDescription>
                Recent incidents reported by the community and officials.
              </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>Incident</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {recentIncidentsData.slice(0, 3).map((incident) => (
                        <TableRow key={incident.id}>
                            <TableCell>
                            <div className="font-medium">{incident.id}</div>
                            <div className="text-sm text-muted-foreground">
                                {incident.location}
                            </div>
                            </TableCell>
                            <TableCell>{incident.type}</TableCell>
                            <TableCell>
                            <Badge
                                variant={
                                incident.status === "Resolved"
                                    ? "default"
                                    : incident.status === "Active"
                                    ? "destructive"
                                    : "secondary"
                                }
                                className={cn(
                                incident.status === "Resolved" &&
                                    "bg-green-600/20 text-green-700 hover:bg-green-600/30 border-green-600/20",
                                incident.status === "Active" &&
                                    "bg-red-600/20 text-red-700 hover:bg-red-600/30 border-red-600/20"
                                )}
                            >
                                {incident.status}
                            </Badge>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-8">
          <Card>
            <form>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><MapPin/>Report an Incident</CardTitle>
                    <CardDescription>
                        Witnessed an incident? Report it here to alert officials.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="incident-type">Incident Type</Label>
                        <Select>
                            <SelectTrigger id="incident-type">
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="sighting">Animal Sighting</SelectItem>
                                <SelectItem value="crop-damage">Crop Damage</SelectItem>
                                <SelectItem value="property-damage">Property Damage</SelectItem>
                                <SelectItem value="attack">Animal Attack</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" placeholder="e.g., Near the river, Vihighar" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" placeholder="Provide a brief description of the incident." />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full">Submit Report</Button>
                </CardFooter>
            </form>
          </Card>
          
          <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><BookOpen />Safety & Education Guides</CardTitle>
                <CardDescription>
                    Stay informed and safe with these essential guides.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Accordion type="single" collapsible className="w-full">
                    {safetyGuides.map((guide, index) => (
                        <AccordionItem value={`item-${index+1}`} key={index}>
                            <AccordionTrigger>{guide.title}</AccordionTrigger>
                            <AccordionContent>{guide.content}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
