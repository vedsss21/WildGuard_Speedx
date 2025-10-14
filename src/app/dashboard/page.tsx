import StatCards from "@/components/dashboard/stat-cards";
import RangerStatus from "@/components/dashboard/ranger-status";
import MapView from "@/components/dashboard/map-view";
import IncidentCharts from "@/components/dashboard/incident-charts";
import RecentIncidents from "@/components/dashboard/recent-incidents";
import ReportGenerator from "@/components/dashboard/report-generator";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold font-headline tracking-tight">
        Dashboard
      </h1>
      <StatCards />
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2">
          <MapView />
        </div>
        <div className="flex flex-col gap-8">
          <RangerStatus />
          <ReportGenerator />
        </div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
        <div className="xl:col-span-3">
          <IncidentCharts />
        </div>
        <div className="xl:col-span-2">
          <RecentIncidents />
        </div>
      </div>
    </div>
  );
}
