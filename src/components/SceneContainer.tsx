import Container from "@/components/SceneBaseContainer";
import Nav from "@/components/Nav";
import { Tooltip } from "react-tooltip";

type CanvasProps = {
  children: React.ReactNode;
};
const Canvas = ({ children }: CanvasProps) => {
  return (
    <div className="w-full relative h-screen">
      {children}
    </div>
  );
};

interface StageProps {
  containerWidth: number;
  navText: string;
  children: React.ReactNode;
}

const SceneContainer = ({ containerWidth, navText, children }: StageProps) => {
  return (
    <Container width={containerWidth}>
      <Canvas>
        <Tooltip
          id="my-tooltip"
          style={{
            zIndex: "calc(infinity)",
          }}
        />
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {children}
        </div>
        <Nav text={navText} />
      </Canvas>
    </Container>
  );
};

export default SceneContainer;
