"use client";
import { useStoreZ } from "@/store";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";
import { Button } from "../atoms/button";

type Props = {};

export default function Navbar({}: Props) {
  const updateAuth = useStoreZ((state) => state.updateAuth);
  const isAuth = useStoreZ((state) => state.isAuth);
  const router = useRouter();
  const pathname = usePathname();
  const onClickHandler = () => {
    if (!isAuth) {
      if (pathname === "/login") {
        router.push("/signup");
      } else if (pathname === "/signup") {
        router.push("/login");
      }
      return;
    }
    updateAuth(false);
  };

  const message = useMemo(() => {
    if (!isAuth) {
      if (pathname === "/login") {
        return "SIGNUP";
      } else if (pathname === "/signup") {
        return "LOGIN";
      }
    }
    return "LOGOUT";
  }, [isAuth, pathname]);
  return (
    <nav className="pt-11 flex justify-end px-9">
      <Button
        variant="ghost"
        className="border-[#007AFF] border py-[10px] px-[22px] hover:bg-white
        text-[#007AFF]
        "
        onClick={onClickHandler}
      >
        {message}
      </Button>
    </nav>
  );
}
