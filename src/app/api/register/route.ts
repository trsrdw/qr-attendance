import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcrypt";
import { User } from "@/types/user";
import { RowDataPacket } from "mysql2";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
    const { fullname, email, password } = await req.json();

    if (!fullname || !email || !password) {
        return NextResponse.json({ error: "All fields required" }, { status: 400 });
    }

    const [rows] = await db.execute<Pick<User, "id">[] & RowDataPacket[]>(
        "SELECT id FROM users WHERE email = ? LIMIT 1",
        [email]
    );

    if (rows.length > 0) {
        return NextResponse.json({ error: "Email already exists" }, { status: 409 });
    }

    const password_hash = await bcrypt.hash(password, 10);
    const uuid = uuidv4();

    await db.execute(
        "INSERT INTO users (id, fullname, email, password_hash, role) VALUES (?, ?, ?, ?, ?)",
        [uuid, fullname, email, password_hash, "superadmin"]
    );

    return NextResponse.json({ success: true });
}