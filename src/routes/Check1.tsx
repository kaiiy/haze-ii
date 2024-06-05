import Container from "@/components/Container";
import Nav from "@/components/Nav";
import { Input } from "@/components/ui/input";

interface InfoProps {
  title: string;
  content: string | JSX.Element;
}

const SubInfo = ({ title, content }: InfoProps) => (
  <div className="mb-6 font-notoSerif">
    <div className="text-2xl border-b border-charcoal text-center">
      {title}
    </div>
  </div>
);

interface SceneProps {
  baseSize: number;
  containerWidth: number;
}

const Scene = ({ baseSize, containerWidth }: SceneProps) => {
  return (
    <Container width={containerWidth}>
      <Nav text="CHECKPOINT 1" />

      <div className="flex gap-6">
        <div className="w-1/2">
          <SubInfo title="S = 3" content="" />
          <div className="flex flex-wrap gap-3 justify-center font-notoSerif mb-6">
            <div
              className={`w-32 h-32 border border-charcoal text-center text-2xl flex items-center justify-center text-charcoal bg-white`}
            >
              0
            </div>
            <div
              className={`w-32 h-32 border border-charcoal text-center text-2xl flex items-center justify-center text-charcoal bg-white`}
            >
              2
            </div>
            <div
              className={`w-32 h-32 border border-charcoal text-center text-2xl flex items-center justify-center text-charcoal bg-white`}
            >
              3
            </div>
          </div>
        </div>
        <div className="w-1/2">
          <SubInfo title="S = 5" content="" />
          <div className="flex flex-wrap gap-3 justify-center font-notoSerif mb-6">
            <div
              className={`w-32 h-32 border border-charcoal text-center text-2xl flex items-center justify-center text-charcoal bg-white`}
            >
              1
            </div>
          </div>
        </div>
      </div>

      <div
        className="flex gap-6"
        style={{
          marginBottom: "80px",
        }}
      >
        <div className="w-1/2">
          <SubInfo title="S = ①" content="" />
          <div className="flex flex-wrap gap-3 justify-center font-notoSerif mb-6">
            <div
              className={`w-32 h-32 border border-charcoal text-center text-2xl flex items-center justify-center text-charcoal bg-white`}
            >
              4
            </div>
          </div>
        </div>

        <div className="w-1/2">
          <SubInfo title="S = ②" content="" />
          <div className="flex flex-wrap gap-3 justify-center font-notoSerif mb-6">
            <div
              className={`w-32 h-32 border border-charcoal text-center text-2xl flex items-center justify-center text-charcoal bg-white`}
            >
              5
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3 mb-3">
        <div
          className="text-2xl font-notoSerif"
          style={{
            height: "40px",
            lineHeight: "40px",
          }}
        >
          ①
        </div>
        <Input />
      </div>
      <div className="flex gap-3">
        <div
          className="text-2xl font-notoSerif"
          style={{
            height: "40px",
            lineHeight: "40px",
          }}
        >
          ②
        </div>
        <Input />
      </div>
    </Container>
  );
};

export default Scene;
