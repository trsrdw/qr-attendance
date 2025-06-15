import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            role: "superadmin" | "staff";
            event_slug: string | null;
        } & DefaultSession["user"];
    }

    interface User extends DefaultUser {
        id: string;
        role: "superadmin" | "staff";
        event_slug: string | null;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        role: "superadmin" | "staff";
        event_slug: string | null;
    }
}
