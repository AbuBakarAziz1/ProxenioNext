"use client";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/UserContext";

export default function AdminDashboard() {
    const router = useRouter();
    const { user, loading } = useUser();
    if (loading) return <p>Loading...</p>;

    return<>
        <h1>Welcome, </h1>
    </>
    ;
}
