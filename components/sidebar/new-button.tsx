"use client";

import { Plus } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Hint } from "@/components/hint";
import CreateOrganizationPage from "@/components/create-organization/[[...index]]";

export const NewButton = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="aspect-square">
                    <Hint label="Create Oranization" side="right" align="start" sideOffset={18}>
                    <button className="bg-white-25 h-full w-full rounded-md flex items-center justify-center opacity-60 hover:opacity-100 transition" >
                        <Plus className="text-white" />
                    </button>
                    </Hint>
                </div>
            </DialogTrigger>
            <DialogContent className="p-0 bg-transparent border-none max-w-[480px]">
                <CreateOrganizationPage />
            </DialogContent>
        </Dialog>
    )
}