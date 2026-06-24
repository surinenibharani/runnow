import { prisma } from "@/lib/prisma";
import { DEFAULT_PLAN_ID } from "@/lib/plans";
import { serializeCompletedIds } from "@/lib/plan-alignment";

export async function getOrCreateUserTrainingPlan(userId: string) {
  const existing = await prisma.userTrainingPlan.findUnique({ where: { userId } });
  if (existing) return existing;

  return prisma.userTrainingPlan.create({
    data: {
      userId,
      planId: DEFAULT_PLAN_ID,
      currentWeek: 1,
      restDay: 7,
      longRunDay: 6,
      runDaysPerWeek: 3,
      completedIds: "[]",
    },
  });
}

export async function updateUserTrainingPlan(
  userId: string,
  data: {
    planId?: string;
    currentWeek?: number;
    restDay?: number;
    longRunDay?: number;
    runDaysPerWeek?: number;
    completedIds?: string[];
    streak?: number;
    lastCompletedDate?: Date | null;
  }
) {
  await getOrCreateUserTrainingPlan(userId);

  return prisma.userTrainingPlan.update({
    where: { userId },
    data: {
      ...(data.planId !== undefined && { planId: data.planId }),
      ...(data.currentWeek !== undefined && { currentWeek: data.currentWeek }),
      ...(data.restDay !== undefined && { restDay: data.restDay }),
      ...(data.longRunDay !== undefined && { longRunDay: data.longRunDay }),
      ...(data.runDaysPerWeek !== undefined && {
        runDaysPerWeek: data.runDaysPerWeek,
      }),
      ...(data.completedIds !== undefined && {
        completedIds: serializeCompletedIds(data.completedIds),
      }),
      ...(data.streak !== undefined && { streak: data.streak }),
      ...(data.lastCompletedDate !== undefined && {
        lastCompletedDate: data.lastCompletedDate,
      }),
    },
  });
}

export function isCoach(user: {
  role: string;
  subscriptionTier: string;
  stripeSubscriptionId?: string | null;
  stripeSubscriptionStatus?: string | null;
}): boolean {
  if (user.subscriptionTier !== "COACH" && user.role !== "COACH") return false;

  // Dev / legacy accounts without Stripe billing
  if (!process.env.STRIPE_SECRET_KEY || !user.stripeSubscriptionId) {
    return user.subscriptionTier === "COACH" || user.role === "COACH";
  }

  return (
    user.subscriptionTier === "COACH" &&
    !!user.stripeSubscriptionStatus &&
    ["active", "trialing"].includes(user.stripeSubscriptionStatus)
  );
}

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);
}

export async function uniqueTeamSlug(base: string): Promise<string> {
  let slug = slugify(base) || "team";
  let suffix = 0;
  while (true) {
    const candidate = suffix === 0 ? slug : `${slug}-${suffix}`;
    const exists = await prisma.team.findUnique({ where: { slug: candidate } });
    if (!exists) return candidate;
    suffix += 1;
  }
}
