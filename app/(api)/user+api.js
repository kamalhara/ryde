// Works in Node.js, Next.js, serverless, and edge runtimes
import { neon } from "@neondatabase/serverless";

export async function POST(Request) {
  try {
    const sql = neon(process.env.DATABASE_URL);
    const { email, name, clerkId } = await Request.json();

    if (!email || !name || !clerkId) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const response = await sql`
        INSERT INTO users (email, name, clerk_id)
        VALUES (${email}, ${name}, ${clerkId})
        `;

    return Response.json({ success: true, data: response }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return Response.json(
      { error: "Failed to create user", details: error.message },
      { status: 500 },
    );
  }
}
// const users = await sql`SELECT * FROM users`;
