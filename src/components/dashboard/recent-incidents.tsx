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

export default function RecentIncidents() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Incident Log</CardTitle>
        <CardDescription>
          A log of the latest reported incidents.
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
            {recentIncidentsData.map((incident) => (
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
  );
}
