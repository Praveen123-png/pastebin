// to display individual id's

import { NextResponse } from "next/server";
import pool from "../../../../lib/db";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;

    const result = await pool.query("SELECT * FROM pastebin WHERE id = $1", [id]);
    // console.log("Params:", context.params);

    if (result.rows.length === 0) {
      return NextResponse.json({ message: "Paste not found" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    // console.error(error);
    return NextResponse.json({ message: "Server error", error: error }, { status: 500 });
  }
}
  