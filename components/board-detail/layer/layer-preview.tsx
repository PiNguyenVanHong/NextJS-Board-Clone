"use client";

import { memo } from "react";
import { useStorage } from "@liveblocks/react";
import { LayerType } from "@/types/canvas";
import { colorToCss } from "@/lib/utils";

import { Rectangle } from "@/components/board-detail/layer/rectangle";
import { Ellipse } from "@/components/board-detail/layer/ellipse";
import { Text } from "@/components/board-detail/layer/text";
import { Note } from "@/components/board-detail/layer/note";
import { Path } from "@/components/board-detail/layer/path";

interface LayerPreviewProps {
    id: string;
    onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void;
    selectionColor?: string;
}

export const LayerPreview = memo(({
    id, onLayerPointerDown, selectionColor,
}: LayerPreviewProps) => {
    const layer = useStorage((root) => root.layers.get(id));

    if(!layer) {
        return null;
    }

    switch(layer.type) {
        case LayerType.Path: 
            return (
                <Path
                    key={id}
                    points={layer.points}
                    onPointerDown={(e) => onLayerPointerDown(e, id)}
                    x={layer.x}
                    y={layer.y}
                    fill={layer.fill ? colorToCss(layer.fill) : "#000"}
                    stroke={selectionColor}
                />
            )
        case LayerType.Note: 
            return (
                <Note 
                    id={id}
                    layer={layer}
                    onPointerDown={onLayerPointerDown}
                    selectionColor={selectionColor}
                />
            )
        case LayerType.Text: 
            return (
                <Text 
                    id={id}
                    layer={layer}
                    onPointerDown={onLayerPointerDown}
                    selectionColor={selectionColor}
                />
            )
        case LayerType.Ellipse:
            return (
                <Ellipse
                    id={id}
                    layer={layer}
                    onPointerDown={onLayerPointerDown}
                    selectionColor={selectionColor}
                />
            )
        case LayerType.Rectangle: 
            return (
                <Rectangle 
                    id={id}
                    layer={layer}
                    onPointerDown={onLayerPointerDown}
                    selectionColor={selectionColor}
                />
            );
        default:
            console.warn("Unknow layer type");
            return null;
    }
});

LayerPreview.displayName = "LayerPreview";