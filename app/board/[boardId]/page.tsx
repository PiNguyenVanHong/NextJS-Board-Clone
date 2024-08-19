import { Room } from "@/components/room";
import { Loading } from "@/components/board-detail/loading";
import { Canvas } from "@/components/board-detail/canvas";

interface BoardPageProps {
  params: {
    boardId: string;
  };
}

const BoardPage = ({ params }: BoardPageProps) => {
  return (
    <Room roomId={params.boardId} fallback={<Loading />}>
      <Canvas boardId={params.boardId} />
    </Room>
  );
};

export default BoardPage;
