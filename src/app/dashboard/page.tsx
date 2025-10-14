import DashboardPageContent from "@/components/dashboard/dashboard-page-content";
import { LanguageProvider } from "@/contexts/language-context";

export default function DashboardPage() {
  return (
    <LanguageProvider>
      <DashboardPageContent />
    </LanguageProvider>
  );
}
