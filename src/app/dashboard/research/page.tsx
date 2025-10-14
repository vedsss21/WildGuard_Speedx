import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { BarChart, Users, FileText } from "lucide-react";
import AnalysisGenerator from "@/components/dashboard/analysis-generator";

export default function ResearchLabPage() {
    return (
        <div className="flex flex-col gap-8">
            <h1 className="text-3xl font-bold font-headline tracking-tight">
                Research Lab
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-3">
                    <CardHeader>
                        <CardTitle>System Data Summary</CardTitle>
                        <CardDescription>A high-level overview of the data collected in the system.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                            <div className="flex flex-col items-center gap-2 p-4 bg-secondary rounded-lg">
                                <FileText className="h-8 w-8 text-primary" />
                                <p className="text-2xl font-bold">1,284</p>
                                <p className="text-muted-foreground">Total Incidents</p>
                            </div>
                            <div className="flex flex-col items-center gap-2 p-4 bg-secondary rounded-lg">
                                <Users className="h-8 w-8 text-primary" />
                                <p className="text-2xl font-bold">118</p>
                                <p className="text-muted-foreground">Rangers Deployed</p>
                            </div>
                            <div className="flex flex-col items-center gap-2 p-4 bg-secondary rounded-lg">
                                <BarChart className="h-8 w-8 text-primary" />
                                <p className="text-2xl font-bold">5</p>
                                <p className="text-muted-foreground">Incident Types</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <AnalysisGenerator />
        </div>
    );
}
