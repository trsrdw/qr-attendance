import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import mysql from "mysql2/promise";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import type { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                const [rows] = await db.execute(
                    "SELECT * FROM users WHERE email = ? LIMIT 1",
                    [credentials.email]
                );

                const user = (rows as mysql.RowDataPacket[])[0];
                if (!user) return null;

                const isValid = await bcrypt.compare(credentials.password, user.password_hash);
                if (!isValid) return null;

                return {
                    id: user.id,
                    name: user.fullname,
                    email: user.email,
                    role: user.role,
                    event_slug: user.event_slug,
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
                token.event_slug = user.event_slug;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
                session.user.role = token.role;
                session.user.event_slug = token.event_slug;
            }
            return session;
        },
    },
    pages: {
        signIn: "/auth/login",
    },
    secret: process.env.NEXTAUTH_SECRET!,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
