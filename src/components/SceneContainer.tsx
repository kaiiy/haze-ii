import Container from "@/components/SceneBaseContainer";
import Nav from "@/components/Nav";
import NavTooltip from "@/components/NavTooltip";
import { SceneId } from "@/lib/storage";
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
  isDark?: boolean;
  id: SceneId;
}

const SceneContainer = (
  { containerWidth, navText, children, isDark, id }: StageProps,
) => {
  return (
    <Container width={containerWidth} isDark={isDark}>
      <Canvas>
        <NavTooltip />
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {children}
        </div>
        <Nav text={navText} id={id} />
      </Canvas>
    </Container>
  );
};

export default SceneContainer;
