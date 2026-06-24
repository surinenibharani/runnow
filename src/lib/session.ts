import { auth } from "@/lib/auth";

export async function getSessionUser() {
  const session = await auth();
  return session?.user ?? null;
}

export async function requireUser() {
  const user = await getSessionUser();
  if (!user?.id) {
    throw new Error("Unauthorized");
  }
  return user;
}
