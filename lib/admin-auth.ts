import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export async function requireAdmin() {
  const session = await getSession();
  
  if (!session) {
    redirect("/login");
  }
  
  if (session.role !== "ADMIN") {
    redirect("/dashboard");
  }
  
  return session;
}

export async function isAdmin() {
  const session = await getSession();
  return session?.role === "ADMIN";
}
