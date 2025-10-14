"use client";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { BarChart, Users, FileText } from "lucide-react";
import AnalysisGenerator from "@/components/dashboard/analysis-generator";
import { useTranslation } from "@/contexts/language-context";

export default function ResearchLabPage() {
    const { t } = useTranslation();
    return (
        <div className="flex flex-col gap-8">
            <h1 className="text-3xl font-bold font-headline tracking-tight">
                {t('nav.research')}
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-3">
                    <CardHeader>
                        <CardTitle>{t('research.summary.title')}</CardTitle>
                        <CardDescription>{t('research.summary.description')}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                            <div className="flex flex-col items-center gap-2 p-4 bg-secondary rounded-lg">
                                <FileText className="h-8 w-8 text-primary" />
                                <p className="text-2xl font-bold">1,284</p>
                                <p className="text-muted-foreground">{t('research.summary.totalIncidents')}</p>
                            </div>
                            <div className="flex flex-col items-center gap-2 p-4 bg-secondary rounded-lg">
                                <Users className="h-8 w-8 text-primary" />
                                <p className="text-2xl font-bold">118</p>
                                <p className="text-muted-foreground">{t('research.summary.rangersDeployed')}</p>
                            </div>
                            <div className="flex flex-col items-center gap-2 p-4 bg-secondary rounded-lg">
                                <BarChart className="h-8 w-8 text-primary" />
                                <p className="text-2xl font-bold">5</p>
                                <p className="text-muted-foreground">{t('research.summary.incidentTypes')}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <AnalysisGenerator />
        </div>
    );
}
