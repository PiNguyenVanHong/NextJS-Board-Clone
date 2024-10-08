"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { useQuery } from "convex/react";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useRenameModal } from "@/store/use-rename-modal";

import { Actions } from "@/components/actions";
import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";

interface InfoProps {
    boardId: string;
}

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"],
});

export const TabSeparator = () => {
    return (
        <div className="text-neutral-300 px-1.5">

        </div>
    );
}

export const Info = ({
    boardId,
}: InfoProps) => {
    const { onOpen } = useRenameModal();

    const data = useQuery(api.board.get, {
        id: boardId as Id<"boards">,
    });

    if(!data) return <InfoSkeleton />;

    return (
        <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md">
            <Hint label="Go to Homepage" side="bottom" sideOffset={10}>
                <Button asChild className="px-2" variant={"board"}>
                    <Link href={"/homepage"}>
                        <Image
                            src={"/logo.png"}
                            alt="Board Logo"
                            width={40}
                            height={40}
                        />
                        <span className={cn(
                            "font-semibold text-xl ml-2 text-black",
                            font.className,
                        )}>
                            Boardify
                        </span>
                    </Link>
                </Button>
            </Hint>
            <TabSeparator />
            <Hint label="Edit title">
                <Button
                    className="text-base font-normal px-2"
                    variant={"board"}
                    onClick={() => onOpen(data._id, data.title)}
                >
                    {data.title}
                </Button>
            </Hint>
            <TabSeparator />
            <Actions
                id={data._id}
                title={data.title}
                side="bottom"
                sideOffset={10}
            >
                <div>
                    <Hint label="Main menu" side="bottom" sideOffset={10}>
                        <Button size={"icon"} variant={"board"}>
                            <Menu />
                        </Button>
                    </Hint>
                </div>
            </Actions>
        </div>
    );
}

export const InfoSkeleton = () => {
    return (
        <div
            className="w-[300px] absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md"
        >
        </div>
    );
}