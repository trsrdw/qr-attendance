export type User = {
    id: string;
    fullname: string;
    email: string;
    password_hash: string;
    role: "superadmin" | "staff";
    event_slug: string | null;
    created_at: string;
};
