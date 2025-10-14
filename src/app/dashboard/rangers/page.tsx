
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  
  export default function RangersPage() {
    return (
      <div className="flex flex-col gap-8">
        <h1 className="text-3xl font-bold font-headline tracking-tight">
          Rangers
        </h1>
        <Card>
            <CardHeader>
                <CardTitle>Ranger Management</CardTitle>
                <CardDescription>
                    This page is under construction. Soon you'll be able to manage your ranger teams from here.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p>Check back later for more updates!</p>
            </CardContent>
        </Card>
      </div>
    );
  }

    