import type { Config, Context } from "@netlify/functions";
import { desc, eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { candidates } from "../../db/schema.js";

export default async (req: Request, context: Context) => {
  try {
    const { id } = context.params;

    // PATCH /api/candidates/:id — move a candidate to another stage
    if (id) {
      const { stage } = await req.json();
      const [candidate] = await db
        .update(candidates)
        .set({ stage })
        .where(eq(candidates.id, Number(id)))
        .returning();
      if (!candidate) {
        return Response.json({ message: "Candidate not found" }, { status: 404 });
      }
      return Response.json(candidate);
    }

    if (req.method === "GET") {
      const all = await db.select().from(candidates).orderBy(desc(candidates.createdAt));
      return Response.json(all);
    }

    // POST accepts JSON or multipart form data (resume upload form)
    const body = req.headers.get("content-type")?.includes("multipart/form-data")
      ? Object.fromEntries((await req.formData()).entries())
      : await req.json();
    const { name, email, phone, stage } = body as Record<string, string>;

    if (!name || !email) {
      return Response.json({ message: "Name and email are required" }, { status: 400 });
    }

    const [existing] = await db.select().from(candidates).where(eq(candidates.email, email));
    if (existing) {
      return Response.json(
        { message: "Candidate with this email already exists" },
        { status: 400 }
      );
    }

    const [candidate] = await db
      .insert(candidates)
      .values({ name, email, phone, stage })
      .returning();
    return Response.json(candidate, { status: 201 });
  } catch (error) {
    console.error("Candidates API error:", error);
    return Response.json({ message: "Server error" }, { status: 500 });
  }
};

export const config: Config = {
  path: ["/api/candidates", "/api/candidates/:id"],
  method: ["GET", "POST", "PATCH"],
};
