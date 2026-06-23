import type { Metadata } from "next";
import {
  Clock,
  Droplets,
  Footprints,
  Heart,
  Moon,
  Activity,
  Sun,
  Wind,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion/fade-in";

export const metadata: Metadata = {
  title: "Beginner Running Tips",
  description:
    "Practical advice for new runners — pacing, gear, recovery, and mindset.",
};

const tips = [
  {
    icon: Footprints,
    category: "Getting Started",
    title: "Slow down — seriously",
    content:
      "If you can't hold a conversation while jogging, you're going too fast. The goal isn't speed; it's building the habit and aerobic base. Walk breaks are part of the plan, not a failure.",
  },
  {
    icon: Activity,
    category: "Gear",
    title: "Shoes matter more than gadgets",
    content:
      "Visit a running store for a gait analysis if you can. A decent pair of running shoes is the only real investment you need. Skip the expensive watch until you're hooked.",
  },
  {
    icon: Clock,
    category: "Scheduling",
    title: "Put runs on your calendar",
    content:
      "Treat workouts like appointments. Morning runs work for many beginners because nothing else competes for your time. Pick three days and protect them.",
  },
  {
    icon: Droplets,
    category: "Hydration",
    title: "Drink water, not just during runs",
    content:
      "For runs under 45 minutes, you don't need sports drinks. Stay hydrated throughout the day. Bring water on hot days or longer sessions.",
  },
  {
    icon: Moon,
    category: "Recovery",
    title: "Rest days are training days",
    content:
      "Your body adapts during rest, not during the run itself. Sleep 7–9 hours. Don't skip rest days to 'get ahead' — that's how beginners get injured.",
  },
  {
    icon: Wind,
    category: "Breathing",
    title: "Find a breathing rhythm",
    content:
      "Try breathing in for 3 steps and out for 3 steps. If that's hard, slow down. Mouth breathing is fine during exercise — don't overthink it.",
  },
  {
    icon: Heart,
    category: "Mindset",
    title: "Bad runs happen to everyone",
    content:
      "Some days your legs feel like lead. That's normal. Show up anyway, even if you walk more than planned. Consistency over perfection, always.",
  },
  {
    icon: Sun,
    category: "Safety",
    title: "Warm up and cool down",
    content:
      "Start every session with 5 minutes of brisk walking. End with 5 minutes of easy walking and light stretching. Your future knees will thank you.",
  },
];

export default function TipsPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <FadeIn className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Tips for New Runners
          </h1>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
            The stuff nobody tells you when you&apos;re starting out.
            Bookmark this page and come back whenever you need a reminder.
          </p>
        </FadeIn>

        <StaggerChildren className="grid gap-4 sm:grid-cols-2">
          {tips.map((tip) => (
            <StaggerItem key={tip.title}>
              <Card className="h-full border-border/60 hover:shadow-md transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <tip.icon className="size-5" />
                    </div>
                    <div>
                      <Badge variant="secondary" className="mb-2 text-xs">
                        {tip.category}
                      </Badge>
                      <h2 className="font-semibold text-lg">{tip.title}</h2>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                        {tip.content}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </div>
  );
}
