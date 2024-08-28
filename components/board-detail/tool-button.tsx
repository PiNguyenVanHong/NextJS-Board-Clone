"use client";

import { LucideIcon } from "lucide-react";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ToolButtonProps {
    index?: string;
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    isActive?: boolean;
    isDisabled?: boolean;
}

export const ToolButton = ({
    index, label, icon: Icon, onClick, isActive, isDisabled,
}: ToolButtonProps) => {

    return (
        <Hint label={label} side="right" sideOffset={14}>
            <Button
                disabled={isDisabled}
                onClick={onClick}
                size={"icon"}
                variant={isActive ? "boardActive" : "board"}
            >
                <Icon />
                <span className={cn(
                    "relative -bottom-3 text-[9px]",
                    isActive ? " text-blue-800"
                    : "text-zinc-400",
                )}>{index}</span>
            </Button>
        </Hint>
    );
}