import { Loader } from "lucide-react";

import { InfoSkeleton } from "@/components/board-detail/info";
import { ParticipantsSkeleton } from "@/components/board-detail/participants";
import { ToolbarSkeleton } from "@/components/board-detail/toolbar";

export const Loading = () => {
    return (
        <main
            className="w-full h-full relative bg-neutral-100 touch-none flex items-center justify-center"
        >
            <Loader className="w-6 h-6 text-muted-foreground animate-spin" />
            <InfoSkeleton />
            <ParticipantsSkeleton />
            <ToolbarSkeleton />
        </main>
    )
}