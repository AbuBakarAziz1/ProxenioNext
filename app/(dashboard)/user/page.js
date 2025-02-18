"use client";
import { useUser } from "@/app/context/UserContext";

export default function UserDashboard() {
  const { currentUser, loading } = useUser();

    return <h1>Welcome, {currentUser.username}!</h1>;
  }
  