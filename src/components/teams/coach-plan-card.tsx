"use client";

import Link from "next/link";
import {
  BarChart3,
  Check,
  CreditCard,
  Crown,
  Loader2,
  LogIn,
  Shield,
  UserPlus,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { COACH_PLAN_BENEFITS, COACH_PLAN_PRICE } from "@/lib/coach-plan";

const benefitIcons = [Users, UserPlus, Shield, BarChart3, Check, CreditCard];

type CoachPlanCardProps = {
  isAuthenticated: boolean;
  checkoutLoading?: boolean;
  onSubscribe?: () => void;
};

export function CoachPlanCard({
  isAuthenticated,
  checkoutLoading = false,
  onSubscribe,
}: CoachPlanCardProps) {
  return (
    <Card className="border-primary/25 bg-gradient-to-br from-primary/10 via-primary/5 to-background overflow-hidden">
      <CardContent className="p-6 sm:p-8 space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Crown className="size-6 text-primary" />
              <Badge variant="secondary">Coach plan</Badge>
            </div>
            <h2 className="text-2xl font-bold tracking-tight">Subscribe as coach</h2>
            <p className="text-muted-foreground max-w-xl">
              {isAuthenticated
                ? "Create teams, approve athletes, and monitor everyone's training progress from one dashboard."
                : "Log in or sign up, then subscribe to unlock coach features for your training group."}
            </p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-3xl font-bold">{COACH_PLAN_PRICE.label}</p>
            <p className="text-sm text-muted-foreground">Billed monthly · cancel anytime</p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {COACH_PLAN_BENEFITS.map((benefit, i) => {
            const Icon = benefitIcons[i] ?? Check;
            return (
              <div
                key={benefit.title}
                className="flex gap-3 rounded-xl border border-border/60 bg-background/80 p-4"
              >
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-4" />
                </div>
                <div>
                  <p className="font-medium text-sm">{benefit.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="rounded-xl border border-border/60 bg-muted/30 p-4 text-sm text-muted-foreground">
          <p className="font-medium text-foreground">Pricing details</p>
          <ul className="mt-2 space-y-1 list-disc list-inside">
            <li>
              <strong className="text-foreground">{COACH_PLAN_PRICE.label}</strong> for full coach
              access
            </li>
            <li>Secure checkout powered by Stripe</li>
            <li>Update payment method or cancel from your account billing portal</li>
            <li>Runners join teams for free — only coaches need a subscription</li>
          </ul>
        </div>

        <div className="flex flex-wrap gap-3">
          {isAuthenticated ? (
            <Button onClick={onSubscribe} disabled={checkoutLoading}>
              {checkoutLoading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <CreditCard className="size-4" />
              )}
              Subscribe as coach
            </Button>
          ) : (
            <>
              <Button
                nativeButton={false}
                render={<Link href="/login?callbackUrl=/teams" />}
              >
                <CreditCard className="size-4" />
                Subscribe as coach
              </Button>
              <Button
                variant="outline"
                nativeButton={false}
                render={<Link href="/login?callbackUrl=/teams" />}
              >
                <LogIn className="size-4" />
                Log in
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
