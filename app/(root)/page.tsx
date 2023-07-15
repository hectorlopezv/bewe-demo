"use client";
import { useStoreZ } from "@/store";

export default function Home() {
  const user = useStoreZ();

  return (
    <div>{user.isAuth ? "You are logged in" : "You are not logged in"}</div>
  );
}
