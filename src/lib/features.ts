import {
  LayoutDashboard,
  Mail,
  FileText,
  CalendarCheck,
  Search,
  MessageCircle,
  Settings,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  title: string;
  short: string;
  to: string;
  icon: LucideIcon;
  tint: string;
  description: string;
};

export const featureItems: NavItem[] = [
  {
    title: "Smart Email Generator",
    short: "Email",
    to: "/email",
    icon: Mail,
    tint: "bg-lilac text-lilac-foreground",
    description: "Draft professional emails in seconds with the tone you need.",
  },
  {
    title: "Meeting Notes Summarizer",
    short: "Notes",
    to: "/meetings",
    icon: FileText,
    tint: "bg-mint text-mint-foreground",
    description: "Turn raw notes into key points, decisions and action items.",
  },
  {
    title: "AI Task Planner",
    short: "Planner",
    to: "/planner",
    icon: CalendarCheck,
    tint: "bg-peach text-peach-foreground",
    description: "Organise your tasks into a prioritised daily or weekly plan.",
  },
  {
    title: "AI Research Assistant",
    short: "Research",
    to: "/research",
    icon: Search,
    tint: "bg-sky text-sky-foreground",
    description: "Get a structured summary, insights and recommendations.",
  },
  {
    title: "AI Chatbot",
    short: "Chat",
    to: "/chat",
    icon: MessageCircle,
    tint: "bg-lilac text-lilac-foreground",
    description: "Ask your workplace assistant anything, in one conversation.",
  },
];

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    short: "Home",
    to: "/",
    icon: LayoutDashboard,
    tint: "bg-sky text-sky-foreground",
    description: "Overview of your workspace.",
  },
  ...featureItems,
];

export const settingsItem: NavItem = {
  title: "Settings",
  short: "Settings",
  to: "/settings",
  icon: Settings,
  tint: "bg-muted text-muted-foreground",
  description: "Preferences and disclaimers.",
};
