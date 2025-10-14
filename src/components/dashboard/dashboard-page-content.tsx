"use client";

import StatCards from "@/components/dashboard/stat-cards";
import RangerStatus from "@/components/dashboard/ranger-status";
import IncidentCharts from "@/components/dashboard/incident-charts";
import RecentIncidents from "@/components/dashboard/recent-incidents";
import ReportGenerator from "@/components/dashboard/report-generator";
import MapViewCard from "@/components/dashboard/map-view-card";
import { useTranslation } from "@/contexts/language-context";

export default function DashboardPageContent() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold font-headline tracking-tight">
        {t('nav.dashboard')}
      </h1>
      <StatCards />
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 grid gap-8">
            <MapViewCard />
            <IncidentCharts />
        </div>
        <div className="flex flex-col gap-8">
          <RangerStatus />
          <ReportGenerator />
          <RecentIncidents />
        </div>
      </div>
    </div>
  );
}
