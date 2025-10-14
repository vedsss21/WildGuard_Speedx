
"use client";
import React from "react";
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
import { cn } from "@/lib/utils";
import { useTranslation } from "@/contexts/language-context";
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection, query, orderBy, limit } from "firebase/firestore";
import { Skeleton } from "../ui/skeleton";

type Incident = {
  id: string;
  type: string;
  location: string;
  date: string;
  status: "Resolved" | "Active" | "Pending";
  actionTaken: string;
};


export default function RecentIncidents() {
  const { t } = useTranslation();
  const firestore = useFirestore();

  const incidentsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(
        collection(firestore, 'incidents'), 
        orderBy('date', 'desc'), 
        limit(5)
    );
  }, [firestore]);

  const { data: incidents, isLoading } = useCollection<Incident>(incidentsQuery);

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
            {isLoading && Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                    <TableCell>
                        <Skeleton className="h-4 w-24 mb-2"/>
                        <Skeleton className="h-3 w-32"/>
                    </TableCell>
                    <TableCell>
                        <Skeleton className="h-4 w-20"/>
                    </TableCell>
                    <TableCell>
                        <Skeleton className="h-6 w-16 rounded-full"/>
                    </TableCell>
                </TableRow>
            ))}
            {incidents && incidents.map((incident) => (
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
             {incidents?.length === 0 && !isLoading && (
                <TableRow>
                    <TableCell colSpan={3} className="text-center text-muted-foreground">
                        No recent incidents found.
                    </TableCell>
                </TableRow>
             )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
