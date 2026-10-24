import type { Config } from "@netlify/functions";
import { desc } from "drizzle-orm";
import { db } from "../../db/index.js";
import { jobs } from "../../db/schema.js";

export default async (req: Request) => {
  try {
    if (req.method === "GET") {
      const allJobs = await db.select().from(jobs).orderBy(desc(jobs.createdAt));
      return Response.json(allJobs);
    }

    const { title, description, department, location, status } = await req.json();
    if (!title) {
      return Response.json({ message: "Job title is required" }, { status: 400 });
    }

    const [job] = await db
      .insert(jobs)
      .values({ title, description, department, location, status })
      .returning();
    return Response.json(job, { status: 201 });
  } catch (error) {
    console.error("Jobs API error:", error);
    return Response.json({ message: "Server error" }, { status: 500 });
  }
};

export const config: Config = {
  path: "/api/jobs",
  method: ["GET", "POST"],
};
