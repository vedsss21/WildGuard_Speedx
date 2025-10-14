import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldAlert, Siren, Users, TrendingUp, TrendingDown } from "lucide-react";
import { statCardsData } from "@/lib/data";

const iconMap: { [key: string]: React.ElementType } = {
  ShieldAlert,
  Siren,
  Users,
};

export default function StatCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {statCardsData.map((card) => {
        const Icon = iconMap[card.icon];
        const TrendIcon = card.changeType === 'increase' ? TrendingUp : TrendingDown;
        const trendColor = card.changeType === 'increase' ? 'text-green-600' : 'text-red-600';

        return (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              {Icon && <Icon className="h-5 w-5 text-muted-foreground" />}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className={`text-xs ${trendColor} flex items-center`}>
                <TrendIcon className="h-3 w-3 mr-1" />
                {card.change} from last month
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
