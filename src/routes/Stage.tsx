import Scene0 from "@/scenes/scene0";
import Container from "@/components/Container";
import Nav from "@/components/Nav";

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
}

const Stage = ({ containerWidth }: StageProps) => {
  const baseSize = containerWidth / 24;

  return (
    <Container width={containerWidth}>
      <Canvas>
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 font-notoSans">
          <Scene0 baseSize={baseSize} />
        </div>
        <Nav text="SCENE 0" />
      </Canvas>
    </Container>
  );
};

export default Stage;
