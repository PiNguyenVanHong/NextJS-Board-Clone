"use client";

import { useOthers, useSelf } from "@liveblocks/react";
import { connectionIdToColor } from "@/lib/utils";

import { UserAvatar } from "@/components/user-avatar";

const MAX_SHOWN_USERS = 5;

export const Participants = () => {
    const users = useOthers();
    const currentUser = useSelf();
    const hasMoreUsers = users.length > MAX_SHOWN_USERS;

    console.log(users);
    

    return (
        <div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md">
            <div className="flex gap-x-2">
                {users.slice(0, MAX_SHOWN_USERS).map(({ connectionId, info }) => {
                    return (
                        <UserAvatar 
                            borderColor={connectionIdToColor(connectionId)}
                            key={connectionId}
                            src={info?.picture}
                            name={info?.name}
                            fallback={info?.name?.[0] || "T"}
                        />
                    )
                })}

                {currentUser && (
                    <UserAvatar
                        borderColor={connectionIdToColor(currentUser.connectionId)}
                        src={currentUser.info?.picture}
                        name={`${currentUser.info?.name} (You)`}
                        fallback={currentUser.info?.name?.[0]}
                    />
                )}    

                {hasMoreUsers && (
                    <UserAvatar
                        name={`${users.length - MAX_SHOWN_USERS} more`}
                        fallback={`+${users.length - MAX_SHOWN_USERS}`}
                    />
                )}
            </div>           
        </div>
    );
}

export const ParticipantsSkeleton = () => {
    return (
        <div className="w-[100px] absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md">
        </div>
    );
}