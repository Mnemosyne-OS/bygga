import { connection } from "next/server";
import { hasKey } from "@/lib/together";

export async function GET() {
  await connection();
  return Response.json({ ai: hasKey() });
}
