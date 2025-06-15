"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useSession } from "next-auth/react";

type Role = "general" | "staff" | "superadmin";

interface AuthContextType {
    role: Role;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
    role: "general",
    isAuthenticated: false,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const { data: session, status } = useSession();
    const [role, setRole] = useState<Role>("general");

    useEffect(() => {
        if (status === "authenticated" && session?.user?.role) {
            const userRole = session.user.role as Role;
            setRole(userRole);
        } else if (status === "unauthenticated") {
            setRole("general");
        }
    }, [status, session]);

    return (
        <AuthContext.Provider value={{ role, isAuthenticated: status === "authenticated" }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);