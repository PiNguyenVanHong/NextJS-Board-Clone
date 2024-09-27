"use client";

import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Star } from "lucide-react";
import { useSearchParams } from "next/navigation";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export const OrgSidebar = () => {
  const searchParams = useSearchParams();
  const favorites = searchParams.get("favorites");

  return (
    <div className="hidden lg:flex flex-col space-y-6 w-[206px] pl-5 pt-5">
      <Link href={"/homepage"}>
        <div className="flex items-center gap-x-2">
          <Image src={"/logo.png"} alt="Logo" height={60} width={60} />
          <span className={cn("font-semibold text-2xl", font.className)}>
            Boardify
          </span>
        </div>
      </Link>
      <OrganizationSwitcher
        appearance={{
          elements: {
            rootBox: {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              maxWidth: "376px",
            },
            organizationSwitcherTrigger: {
              padding: "6px",
              width: "100%",
              borderRadius: "8px",
              border: "1px solid #E5E7EB",
              justifyContent: "space-between",
              backgroundColor: "white",
            },
            organizationPreview__organizationSwitcherTrigger: {
              width: "150px",
            },
            organizationPreviewAvatarBox: {
              width: "32px",
              height: "32px",
            },
          },
        }}
        hidePersonal
      />
      <div className="space-y-1 w-full">
        <Button
          className="w-full font-normal justify-start px-2"
          asChild
          size={"lg"}
          variant={favorites ? "ghost" : "secondary"}
        >
          <Link href={"/homepage"}>
            <LayoutDashboard className="w-4 h-4 mr-2" />
            Team boards
          </Link>
        </Button>
        <Button
          className="w-full font-normal justify-start px-2"
          asChild
          size={"lg"}
          variant={!favorites ? "ghost" : "secondary"}
        >
          <Link
            href={{
              pathname: "/homepage",
              query: { favorites: true },
            }}
          >
          <div className="w-full flex">
            <Star className="w-4 h-4 mr-2" />
            Favorite boards
          </div>
          </Link>
        </Button>
      </div>
    </div>
  );
};
