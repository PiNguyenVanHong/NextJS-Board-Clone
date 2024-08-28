"use client";

import { ReactNode } from "react";
import { LiveMap, LiveObject, LiveList } from "@liveblocks/client";
import { ClientSideSuspense, LiveblocksProvider, RoomProvider } from "@liveblocks/react";

import { Layer } from "@/types/canvas";

interface RoomProps {
  children: ReactNode;
  roomId: string;
  fallback: NonNullable<ReactNode> | null;
}

export const Room = ({ children, roomId, fallback, }: RoomProps) => {
  return (
    <LiveblocksProvider
      authEndpoint={process.env.NEXT_PUBLIC_LIVEBLOCKS_URL!}
      throttle={16}
    >
      <RoomProvider 
        id={roomId} 
        initialPresence={{
          cursor: null,
          selection: [],
          pencilDraft: null,
          penColor: null,
        }}
        initialStorage={{
          layers: new LiveMap<string, LiveObject<Layer>>(),
          layerIds: new LiveList([]),
        }}
      >
        <ClientSideSuspense fallback={fallback}>
          {() => children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
};
