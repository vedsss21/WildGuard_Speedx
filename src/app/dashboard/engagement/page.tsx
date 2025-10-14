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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { communityLeaderboard, communityEvents } from "@/lib/data";
import { Award, Calendar, Lightbulb, Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function EngagementPage() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold font-headline tracking-tight">
        Community Engagement
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="text-amber-500" />
                Community Leaderboard
              </CardTitle>
              <CardDescription>
                Recognizing the most active and helpful members of our
                community.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Rank</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead className="text-right">Points</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {communityLeaderboard.map((user) => (
                    <TableRow key={user.rank}>
                      <TableCell className="font-bold text-lg">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted">
                           {user.rank}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={user.avatarUrl} data-ai-hint="person portrait"/>
                            <AvatarFallback>
                              {user.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {user.reports} reports
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-bold text-lg text-primary">
                        {user.points}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar />
                Upcoming Events
              </CardTitle>
              <CardDescription>
                Join us for workshops, clean-up drives, and community meetings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {communityEvents.map((event) => (
                <div key={event.title} className="flex items-center justify-between p-4 rounded-lg bg-secondary">
                  <div>
                    <h3 className="font-semibold">{event.title}</h3>
                    <p className="text-sm text-muted-foreground">{event.date} &bull; {event.location}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    RSVP
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        <div className="space-y-8">
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="text-primary"/>
                Tech Ranger Program
              </CardTitle>
              <CardDescription>
                Become a volunteer and use technology to protect wildlife.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p>
                Our Tech Ranger program empowers community members to become part of the solution. Volunteers are trained to use our mobile app for accurate reporting, set up and monitor camera traps, and participate in data analysis.
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Receive training on wildlife monitoring tools.</li>
                <li>Get priority access to new features.</li>
                <li>Contribute directly to conservation efforts.</li>
              </ul>
              <Button className="w-full">Learn More & Sign Up</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
