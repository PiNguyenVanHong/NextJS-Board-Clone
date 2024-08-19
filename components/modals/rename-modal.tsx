"use client";

import { FormEvent, FormEventHandler, useEffect, useState } from "react";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogClose,
    DialogFooter,
    DialogTitle,
} from "@/components/ui/dialog";
import { useRenameModal } from "@/store/use-rename-modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const RenameModal = () => {
    const { mutate, pending } = useApiMutation(api.board.update);

    const { isOpen, onClose, initialValues, } = useRenameModal();

    const [title, setTitle] = useState(initialValues.title);

    useEffect(() => {
        setTitle(initialValues.title);
    }, [initialValues.title]);

    const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        mutate({
            id: initialValues.id,
            title,
        })
            .then(() => {
                toast.success("Board edited");
                onClose();
            })
            .catch(() => toast.error("Failed to rename board"));

    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Edit board title
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    <form className="space-y-4" onSubmit={onSubmit}>
                        <Input
                            className="text-zinc-900"
                            disabled={pending}
                            required
                            maxLength={60}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Board Title"
                        />
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button disabled={pending} type="button" variant={"outline"}>
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button disabled={pending} type="submit">
                                Save
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    )
}