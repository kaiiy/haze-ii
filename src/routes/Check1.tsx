import ContainerBase from "@/components/ContainerBase";
import Nav from "@/components/Nav";
import { Link } from "react-router-dom";

interface InfoProps {
  title: string;
}

const Info = ({ title }: InfoProps) => (
  <div className="mb-6 font-notoSerif">
    <div className="text-2xl border-b border-charcoal text-center">
      {title}
    </div>
  </div>
);

const SceneBox = ({ index }: { index: string }) => (
  <Link to={`/${index}`}>
    <div
      className={`w-32 h-32 border border-charcoal text-center text-2xl flex items-center justify-center cursor-pointer   transition duration-300 hover:text-[#f7f7f7] hover:bg-charcoal text-charcoal bg-white`}
    >
      {index}
    </div>
  </Link>
);

interface SceneProps {
  baseSize: number;
  containerWidth: number;
}

const Scene = ({ baseSize, containerWidth }: SceneProps) => {
  return (
    <ContainerBase
      width={containerWidth}
      style={{
        marginTop: "40px",
      }}
    >
      <Nav text="CHECKPOINT 1" />

      <div className="flex gap-6">
        <div className="w-1/2">
          <Info title="S = 3" />
          <div className="flex flex-wrap gap-3 justify-center font-notoSerif mb-6">
            <SceneBox index="0" />
            <SceneBox index="2" />
            <SceneBox index="3" />
          </div>
        </div>
        <div className="w-1/2">
          <Info title="S = 5" />
          <div className="flex flex-wrap gap-3 justify-center font-notoSerif mb-6">
            <SceneBox index="1" />
          </div>
        </div>
      </div>

      <div
        className="flex gap-6"
        style={{
          marginBottom: "20px",
        }}
      >
        <div className="w-1/2">
          <Info title="S = 4" />
          <div className="flex flex-wrap gap-3 justify-center font-notoSerif mb-6">
            <SceneBox index="4" />
          </div>
        </div>

        <div className="w-1/2">
          <div className="mb-6 font-notoSerif">
            <div className="text-2xl border-b border-charcoal text-center">
              <div className="flex justify-center">
                <span>S =</span>
                {/* TODO: 入力できるようにする  */}
                <div className="w-8 h-8 border cursor-pointer rounded-md ml-2 relative bg-white">
                  <span
                    className="absolute left-1/2 transform -translate-x-1/2"
                    style={{
                      top: "-2px",
                    }}
                  >
                    4
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 justify-center font-notoSerif mb-6">
            <SceneBox index="5" />
          </div>
        </div>
      </div>
    </ContainerBase>
  );
};

export default Scene;
