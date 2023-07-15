"use client";
import { useStoreZ } from "@/store";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

type Props = {
  children: ReactNode;
};

export default function AuthProvider({ children }: Props) {
  const router = useRouter();
  const isAuth = useStoreZ((state) => state.isAuth);
  useEffect(() => {
    if (!isAuth) {
      router.push("/login");
    } else if (isAuth) {
      router.push("/");
    }
  }, [isAuth, router]);
  return <div>{children}</div>;
}
