"use client";

import {
  Circle,
  MousePointer2,
  Pencil,
  Redo2,
  Square,
  StickyNote,
  Type,
  Undo2,
} from "lucide-react";
import { useEffect } from "react";
import { CanvasMode, CanvasState, LayerType } from "@/types/canvas";

import { ToolButton } from "@/components/board-detail/tool-button";

interface ToolbarProps {
  canvasState: CanvasState;
  setCanvasState: (newState: CanvasState) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export const Toolbar = ({
  canvasState,
  setCanvasState,
  undo,
  redo,
  canUndo,
  canRedo,
}: ToolbarProps) => {
  const handleSelect = () => {
    setCanvasState({ mode: CanvasMode.None });
  };

  const handleText = () => {
    setCanvasState({
      mode: CanvasMode.Inserting,
      layerType: LayerType.Text,
    });
  };

  const handleStickyNote = () => {
    setCanvasState({
        mode: CanvasMode.Inserting,
        layerType: LayerType.Note,
      });
  };

  const handleRectangle = () => {
    setCanvasState({
        mode: CanvasMode.Inserting,
        layerType: LayerType.Rectangle,
      });
  };

  const handleEllipse = () =>  {
    setCanvasState({
        mode: CanvasMode.Inserting,
        layerType: LayerType.Ellipse,
      });
  };

  const handlePen = () => {
    setCanvasState({
        mode: CanvasMode.Pencil,
      });
  };

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      switch (e.key) {
        case "1": {
            handleSelect();
            break;
        }
        case "2": {
            handleText();
            break;
        }
        case "3": {
            handleStickyNote();
            break;
        }
        case "4": {
            handleRectangle();
            break;
        }
        case "5": {
            handleEllipse();
            break;
        }
        case "6": {
            handlePen();
            break;
        }
      }
    }

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div className="absolute top-1/2 -translate-y-1/2 left-2 flex flex-col gap-y-4">
      <div className="bg-white rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-md">
        <ToolButton
            index="1"
          label="Select"
          icon={MousePointer2}
          onClick={() => handleSelect}
          isActive={
            canvasState.mode === CanvasMode.None ||
            canvasState.mode === CanvasMode.Translating ||
            canvasState.mode === CanvasMode.SelectionNet ||
            canvasState.mode === CanvasMode.Pressing ||
            canvasState.mode === CanvasMode.Resizing
          }
        />
        <ToolButton
            index="2"
          label="Text"
          icon={Type}
          onClick={handleText}
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Text
          }
        />
        <ToolButton
            index="3"
          label="Sticky note"
          icon={StickyNote}
          onClick={handleStickyNote}
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Note
          }
        />
        <ToolButton
            index="4"
          label="Rectangle"
          icon={Square}
          onClick={handleRectangle}
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Rectangle
          }
        />
        <ToolButton
            index="5"
          label="Ellipse"
          icon={Circle}
          onClick={handleEllipse}
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Ellipse
          }
        />
        <ToolButton
            index="6"
          label="Pen"
          icon={Pencil}
          onClick={handlePen}
          isActive={canvasState.mode === CanvasMode.Pencil}
        />
      </div>
      <div className="bg-white rounded-md p-1.5 flex flex-col items-center shadow-md">
        <ToolButton
          label="Undo"
          icon={Undo2}
          onClick={undo}
          isDisabled={!canUndo}
        />
        <ToolButton
          label="Redo"
          icon={Redo2}
          onClick={redo}
          isActive={!canRedo}
        />
      </div>
    </div>
  );
};

export const ToolbarSkeleton = () => {
  return (
    <div className="absolute top-1/2 -translate-y-1/2 left-2 flex flex-col gap-y-4 bg-white w-[52px] h-[360px] shadow-md rounded-md"></div>
  );
};
