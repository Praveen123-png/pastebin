/* eslint-disable @typescript-eslint/no-unused-vars */

// to display the whole data
import { NextResponse } from "next/server";
import pool from "../../../lib/db";
import { stat } from "fs";

export async function GET(request: Request) {
  try {
    // step-1: fetching data
    const result = await pool.query("SELECT * FROM pastebin");

    // step-2: Check for absolute
    if (result.rows.length === 0) {
      return NextResponse.json({ message: "Paste not found" }, { status: 404 });
    }

    // step-3: return the result
    return NextResponse.json(result.rows);
  } catch (error) {
    return NextResponse.json({ message: "Server error", error: error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    // used to insert data through form-data in postman, use different method when inserting data through frontend
    const formData = await request.formData();
    const body = formData.get("content");

    // console.log("body: ", body);

    // check for absolute
    if (!body) {
      return NextResponse.json({ error: "Content cannot be empty" }, { status: 400 });
    }

    // inserting into DB
    const result = await pool.query(
      "INSERT INTO pastebin (content) VALUES ($1) RETURNING *",
      [body],
    );

    // returning the updated row with success message
    return NextResponse.json(
      {
        message: "Paste Created successfully",
        newPaste: result.rows[0],
      },
      { status: 201 },
    );
  } catch (error) {
    console.log("DB error: ", error);

    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: "Something went wrong, server error!",
          error: error.message,
        },
        { status: 500 },
      );
    }

    return NextResponse.json({ message: "Unknown server error" }, { status: 500 });
  }
}
