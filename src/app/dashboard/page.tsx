import StatCards from "@/components/dashboard/stat-cards";
import RangerStatus from "@/components/dashboard/ranger-status";
import IncidentCharts from "@/components/dashboard/incident-charts";
import RecentIncidents from "@/components/dashboard/recent-incidents";
import ReportGenerator from "@/components/dashboard/report-generator";
import MapViewCard from "@/components/dashboard/map-view-card";
import { LanguageProvider, useTranslation } from "@/contexts/language-context";
import DashboardPageContent from "@/components/dashboard/dashboard-page-content";

export default function DashboardPage() {
  return (
    <LanguageProvider>
      <DashboardPageContent />
    </LanguageProvider>
  );
}
