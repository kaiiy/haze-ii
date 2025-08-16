import Container from "@/components/Container";
import Nav from "@/components/Nav";
import { useEffect } from "react";
import {
  Info,
  PreconditionContent,
  Title,
  TutorialContent,
} from "@/components/homeContent";
import { Scenes } from "@/components/homeUI";
import NavTooltip from "@/components/NavTooltip";
import NavTooltipClear from "@/components/NavTooltipClear";
import { vStorage } from "@/lib/storage";
import { sceneIdsBefore } from "@/lib/scene";

interface HomeProps {
  containerWidth: number;
}

const Home = ({ containerWidth }: HomeProps) => {
  const storage = vStorage.load();
  const sceneStates = storage.sceneStates;
  const currentScene = storage.currentScene;

  const isAllClear = sceneStates.every((scene) => scene.checked) &&
    sceneStates.length > 0;

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Backspace") {
      // ブラウザのページバックを無効化
      e.preventDefault();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <Container width={containerWidth}>
      <Nav
        text="HOME"
        shareText={`${
          !isAllClear
            ? "謎解きゲーム『HAZE II』\n"
            : "謎解きゲーム『HAZE II』\n\n ALL CLEAR!\n"
        }`}
      />
      <NavTooltip />
      <NavTooltipClear show={isAllClear} />

      <div className="flex flex-col">
        <Title allClear={isAllClear} />

        <div
          className="text-charcoal"
          style={{
            marginBottom: "40px",
          }}
        >
          <Info title="制作" content="kaiiy" />
          <Info title="想定プレイ時間" content="30分" />
          <Info
            title="前提条件"
            content={<PreconditionContent />}
          />

          <Info
            title="チュートリアル"
            content={<TutorialContent />}
          />
        </div>

        <Scenes scenes={sceneIdsBefore(currentScene)} states={sceneStates} />
      </div>
    </Container>
  );
};

export default Home;
