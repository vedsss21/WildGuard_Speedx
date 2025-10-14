
"use client";

import { useState } from "react";
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
import { recentIncidentsData as initialIncidentsData } from "@/lib/data";
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
import { useTranslation } from "@/contexts/language-context";
import { useToast } from "@/hooks/use-toast";

type Incident = typeof initialIncidentsData[0];

export default function CommunityHubPage() {
  const { t } = useTranslation();
  const { toast } = useToast();

  const [incidentType, setIncidentType] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [recentIncidents, setRecentIncidents] = useState<Incident[]>(initialIncidentsData.slice(0,3));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!incidentType || !location || !description) {
        toast({
            variant: "destructive",
            title: "Missing Information",
            description: "Please fill out all fields to submit an incident.",
        });
        return;
    }

    const newIncident: Incident = {
        id: `INC-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
        type: incidentType,
        location: location,
        date: new Date().toISOString().split("T")[0],
        status: "Pending",
        actionTaken: "Awaiting review",
    };

    setRecentIncidents([newIncident, ...recentIncidents]);

    toast({
        title: "Incident Reported",
        description: "Thank you for your submission. Officials have been notified.",
    });

    // Reset form
    setIncidentType("");
    setLocation("");
    setDescription("");
  };


  const safetyGuides = [
    {
      title: t('community.guides.leopard.title'),
      content: t('community.guides.leopard.content')
    },
    {
      title: t('community.guides.snake.title'),
      content: t('community.guides.snake.content')
    },
    {
      title: t('community.guides.boar.title'),
      content: t('community.guides.boar.content')
    },
    {
      title: t('community.guides.elephant.title'),
      content: t('community.guides.elephant.content')
    }
  ];

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold font-headline tracking-tight">
        {t('nav.community')}
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Siren className="text-destructive"/>{t('community.alerts.title')}</CardTitle>
              <CardDescription>
                {t('community.alerts.description')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <Alert variant="destructive">
                  <Siren className="h-4 w-4" />
                  <AlertTitle>{t('community.alerts.alert1.title')}</AlertTitle>
                  <AlertDescription>
                    {t('community.alerts.alert1.description')}
                  </AlertDescription>
                </Alert>
                <Alert>
                  <CheckCircle className="h-4 w-4 text-green-500"/>
                  <AlertTitle>{t('community.alerts.alert2.title')}</AlertTitle>
                  <AlertDescription>
                    {t('community.alerts.alert2.description')}
                  </AlertDescription>
                </Alert>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><List />{t('community.incidents.title')}</CardTitle>
              <CardDescription>
                {t('community.incidents.description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>{t('community.incidents.table.incident')}</TableHead>
                        <TableHead>{t('community.incidents.table.type')}</TableHead>
                        <TableHead>{t('community.incidents.table.status')}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {recentIncidents.map((incident) => (
                        <TableRow key={incident.id}>
                            <TableCell>
                            <div className="font-medium">{incident.id}</div>
                            <div className="text-sm text-muted-foreground">
                                {incident.location}
                            </div>
                            </TableCell>
                            <TableCell>{t(`incidentTypes.${incident.type.toLowerCase().replace(/ /g, '')}` as any, incident.type)}</TableCell>
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
                                {t(`incidentStatuses.${incident.status.toLowerCase()}` as any)}
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
            <form onSubmit={handleSubmit}>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><MapPin/>{t('community.report.title')}</CardTitle>
                    <CardDescription>
                        {t('community.report.description')}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="incident-type">{t('community.report.form.type.label')}</Label>
                        <Select onValueChange={setIncidentType} value={incidentType}>
                            <SelectTrigger id="incident-type">
                                <SelectValue placeholder={t('community.report.form.type.placeholder')} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Sighting">{t('community.report.form.type.options.sighting')}</SelectItem>
                                <SelectItem value="Crop Damage">{t('community.report.form.type.options.cropDamage')}</SelectItem>
                                <SelectItem value="Property Damage">{t('community.report.form.type.options.propertyDamage')}</SelectItem>
                                <SelectItem value="Animal Attack">{t('community.report.form.type.options.attack')}</SelectItem>
                                <SelectItem value="Other">{t('community.report.form.type.options.other')}</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="location">{t('community.report.form.location.label')}</Label>
                        <Input id="location" placeholder={t('community.report.form.location.placeholder')} value={location} onChange={(e) => setLocation(e.target.value)}/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">{t('community.report.form.description.label')}</Label>
                        <Textarea id="description" placeholder={t('community.report.form.description.placeholder')} value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" className="w-full">{t('community.report.form.submit')}</Button>
                </CardFooter>
            </form>
          </Card>
          
          <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><BookOpen />{t('community.guides.title')}</CardTitle>
                <CardDescription>
                    {t('community.guides.description')}
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
