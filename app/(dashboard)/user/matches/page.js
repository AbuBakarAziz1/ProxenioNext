"use client"

import TabSection from "@/components/TabSection";
import { useUser } from "@/app/context/UserContext";


export default function Matches() {
  const { currentUser } = useUser();

  const userId = currentUser.id;
  return (
    <div>
      <TabSection userId={userId} />
    </div>
  );
}
