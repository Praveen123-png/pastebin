/* eslint-disable @typescript-eslint/no-unused-vars */
// to display the whole data

import { NextResponse } from "next/server";
import pool from "../../../lib/db";

export async function GET(request: Request) {
  try {
    const result = await pool.query("SELECT * FROM pastebin");
    // console.log(result);

    if (result.rows.length === 0) {
      return NextResponse.json({ message: "Paste not found" }, { status: 404 });
    }

    return NextResponse.json(result.rows);
  } catch (error) {
    // console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
