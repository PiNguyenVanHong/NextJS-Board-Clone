"use client";

import { toast } from "sonner";
import { Link2, Pencil, Trash2 } from "lucide-react";

import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";

import { useRenameModal } from "@/store/use-rename-modal";
import { ConfirmModal } from "@/components/confirm-modal";
import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { redirect, useRouter } from "next/navigation";

interface ActionsProps {
    children: React.ReactNode;
    side?: DropdownMenuContentProps["side"];
    sideOffset?: DropdownMenuContentProps["sideOffset"];
    id: string;
    title: string;
}

export const Actions = ({
    children, side, sideOffset, id, title,
}: ActionsProps) => {
    const { onOpen } = useRenameModal();
    const { mutate, pending } = useApiMutation(api.board.remove);
    const router = useRouter();

    const onCopyLink = () => {
        navigator.clipboard.writeText(
            `${window.location.origin}/board/${id}`,
        )
            .then(() => toast.success("Link copied"))
            .catch(() => toast.error("Failed to copy link"));
    };

    const onDelete = () => {
        mutate({ id })
            .then(() => {
                toast.success("Board deleted");
                router.push("/homepage");
            })
            .catch(() => {
                toast.error("Failed to delete board");
                router.push("/homepage");
            });
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-60"
                onClick={(e) => e.stopPropagation()}
                side={side}
                sideOffset={sideOffset}
            >
                <DropdownMenuItem
                    className="p-3 cursor-pointer"
                    onClick={onCopyLink}
                >
                    <Link2 className="w-4 h-4 mr-2" />
                    Copy board link
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="p-3 cursor-pointer"
                    onClick={() => onOpen(id, title)}
                >
                    <Pencil className="w-4 h-4 mr-2" />
                    Rename
                </DropdownMenuItem>
                <ConfirmModal
                    header="Delete board?"
                    description="This will delete the board and all of its contents."
                    disabled={pending}
                    onConfirm={onDelete}
                >
                    <Button
                        className="p-3 cursor-pointer text-sm w-full justify-start font-normal"
                        variant={"ghost"}
                    >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                    </Button>
                </ConfirmModal>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}