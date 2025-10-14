"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { recentIncidentsData as initialIncidentsData } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/contexts/language-context";

type Incident = typeof initialIncidentsData[0];

const incidentTypes = ["Crop Damage", "Property Damage", "Animal Attack", "Sighting", "Other"];
const locations = ["Kothrud, Pune", "Aarey Colony, Mumbai", "Sanjay Gandhi NP", "Yeoor Hills, Thane"];
const statuses = ["Pending", "Active"];

const generateRandomIncident = (): Incident => ({
    id: `INC-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
    type: incidentTypes[Math.floor(Math.random() * incidentTypes.length)],
    location: locations[Math.floor(Math.random() * locations.length)],
    date: new Date().toISOString().split("T")[0],
    status: statuses[Math.floor(Math.random() * statuses.length)] as "Pending" | "Active",
    actionTaken: "Awaiting review",
});

export default function RecentIncidents() {
  const { t } = useTranslation();
  const [incidents, setIncidents] = useState<Incident[]>(initialIncidentsData.slice(0, 4));

  useEffect(() => {
    const interval = setInterval(() => {
        setIncidents(prevIncidents => {
            const newIncidents = [generateRandomIncident(), ...prevIncidents];
            return newIncidents.slice(0, 4);
        });
    }, 5000); // Add a new incident every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('recentIncidents.title')}</CardTitle>
        <CardDescription>
          {t('recentIncidents.description')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('recentIncidents.table.incident')}</TableHead>
              <TableHead>{t('recentIncidents.table.type')}</TableHead>
              <TableHead>{t('recentIncidents.table.status')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {incidents.map((incident) => (
              <TableRow key={incident.id}>
                <TableCell>
                  <div className="font-medium">{incident.id}</div>
                  <div className="text-sm text-muted-foreground">
                    {incident.location}
                  </div>
                </TableCell>
                <TableCell>{t(`incidentTypes.${incident.type.toLowerCase().replace(/ /g, '')}` as any)}</TableCell>
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
  );
}
