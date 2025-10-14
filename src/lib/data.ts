import { PlaceHolderImages } from "./placeholder-images";

export const statCardsData = [
  {
    title: "Total Incidents",
    value: "1,284",
    icon: "ShieldAlert",
    change: "+12.5%",
    changeType: "increase",
  },
  {
    title: "Active Alerts",
    value: "32",
    icon: "Siren",
    change: "-5.2%",
    changeType: "decrease",
  },
  {
    title: "Rangers Deployed",
    value: "118",
    icon: "Users",
    change: "+2 new teams",
    changeType: "increase",
  },
];

export const rangersData = [
  {
    name: "Ravi Kumar",
    status: "Online",
    avatarUrl: PlaceHolderImages.find(p => p.id === 'avatar-1')?.imageUrl || '',
  },
  {
    name: "Sunita Sharma",
    status: "Offline",
    avatarUrl: PlaceHolderImages.find(p => p.id === 'avatar-2')?.imageUrl || '',
  },
  {
    name: "Anil Desai",
    status: "Online",
    avatarUrl: PlaceHolderImages.find(p => p.id === 'avatar-3')?.imageUrl || '',
  },
  {
    name: "Priya Singh",
    status: "Online",
    avatarUrl: PlaceHolderImages.find(p => p.id === 'avatar-4')?.imageUrl || '',
  },
];

export const incidentTypeData = [
  { type: "Crop Damage", incidents: 400, fill: "var(--color-crop)" },
  { type: "Property Damage", incidents: 300, fill: "var(--color-property)" },
  { type: "Animal Attack", incidents: 200, fill: "var(--color-attack)" },
  { type: "Sighting", incidents: 278, fill: "var(--color-sighting)" },
  { type: "Other", incidents: 189, fill: "var(--color-other)" },
];

export const incidentTrendData = [
  { month: "Jan", incidents: 65 },
  { month: "Feb", incidents: 59 },
  { month: "Mar", incidents: 80 },
  { month: "Apr", incidents: 81 },
  { month: "May", incidents: 56 },
  { month: "Jun", incidents: 55 },
  { month: "Jul", incidents: 40 },
];

export const recentIncidentsData = [
  {
    id: "INC-01H8X2J",
    type: "Crop Damage",
    location: "Kothrud, Pune",
    date: "2024-07-28",
    status: "Resolved",
    actionTaken: "Compensation provided. Fencing advised.",
  },
  {
    id: "INC-01H8X2K",
    type: "Animal Attack",
    location: "Aarey Colony, Mumbai",
    date: "2024-07-27",
    status: "Active",
    actionTaken: "Ranger team dispatched. Victim hospitalized.",
  },
  {
    id: "INC-01H8X2L",
    type: "Sighting",
    location: "Sanjay Gandhi NP",
    date: "2024-07-27",
    status: "Pending",
    actionTaken: "Monitoring team alerted.",
  },
  {
    id: "INC-01H8X2M",
    type: "Property Damage",
    location: "Yeoor Hills, Thane",
    date: "2024-07-26",
    status: "Resolved",
    actionTaken: "Damage assessment complete. Report filed.",
  },
];
