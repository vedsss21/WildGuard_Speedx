"use client";
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
import { recentIncidentsData } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/contexts/language-context";

export default function RecentIncidents() {
  const { t } = useTranslation();
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
            {recentIncidentsData.map((incident) => (
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
