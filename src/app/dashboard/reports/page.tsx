import IncidentCharts from "@/components/dashboard/incident-charts";
import ReportGenerator from "@/components/dashboard/report-generator";

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold font-headline tracking-tight">
        Reports
      </h1>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2">
            <IncidentCharts />
        </div>
        <div className="flex flex-col gap-8">
          <ReportGenerator />
        </div>
      </div>
    </div>
  );
}
