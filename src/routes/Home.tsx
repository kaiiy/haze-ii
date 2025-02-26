import Container from "@/components/Container";
import Nav from "@/components/Nav";
import { useEffect, useState } from "react";
import {
  Info,
  NoticeContent,
  PreconditionContent,
  Title,
  Tutorial2Content,
  Tutorial2DarkContent,
  TutorialContent,
} from "@/components/homeContent";
import { Scenes, SwitchPage } from "@/components/homeUI";
import NavTooltip from "@/components/NavTooltip";
import { SceneId, vStorage } from "@/lib/storage";

const PAGE0_SCENES: SceneId[] = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "A",
] as const;

const PAGE1_SCENES: SceneId[] = ["7", "8", "9", "B"] as const;
const PAGE2_SCENES: SceneId[] = ["10"] as const;

interface HomeProps {
  containerWidth: number;
}

const Home = ({ containerWidth }: HomeProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isDark, setIsDark] = useState(false);
  const [pageUpdated, setPageUpdated] = useState(-1);

  const storage = vStorage.load();
  const sceneStates = storage.sceneStates;

  const isAllClear = sceneStates.every((scene) => scene.checked) &&
    sceneStates.length > 0;

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Backspace") {
      // ブラウザのページバックを無効化
      e.preventDefault();
    }
  };

  const updatePage = (page: number) => {
    if (currentPage !== page) {
      setPageUpdated(page);
    }
    setCurrentPage(page);
    if (page === 0 || page === 1 || page === 2) {
      vStorage.overwrite({
        page,
      });
    } else {
      throw new Error("Invalid page number");
    }
  };

  useEffect(() => {
    const storage = vStorage.load();
    setCurrentPage(storage.page);
    setIsDark(storage.theme === "dark");
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (pageUpdated !== -1) {
      window.scrollTo(0, document.body.scrollHeight);
    }
  }, [pageUpdated]);

  return (
    <Container width={containerWidth} isDark={isDark}>
      <Nav
        text="HOME"
        shareText={`${
          !isAllClear
            ? "謎解きゲーム「MIST」\n"
            : "謎解きゲーム「MIST」\n\n ALL CLEAR!\n"
        }`}
      />
      <NavTooltip />

      <div className="flex flex-col">
        <Title isDark={isDark} allClear={isAllClear} />

        <div
          className="text-charcoal"
          style={{
            marginBottom: "40px",
          }}
        >
          <Info title="制作" content="kaiiy" isDark={isDark} />
          <Info title="想定プレイ時間" content="2時間" isDark={isDark} />
          <Info title="注意事項" content={<NoticeContent />} isDark={isDark} />
          <Info
            title="前提条件"
            content={<PreconditionContent />}
            isDark={isDark}
          />

          {currentPage === 0
            ? (
              <Info
                title="チュートリアル"
                content={<TutorialContent />}
                isDark={isDark}
              />
            )
            : ""}
          {currentPage === 1 && !isDark
            ? (
              <Info
                title="チュートリアル"
                content={<Tutorial2Content />}
                isDark={isDark}
              />
            )
            : ""}
          {currentPage === 1 && isDark
            ? (
              <Info
                title="チュートリアル"
                content={<Tutorial2DarkContent />}
                isDark={isDark}
              />
            )
            : ""}
        </div>

        {currentPage === 0
          ? <Scenes scenes={PAGE0_SCENES} states={sceneStates} />
          : ""}
        {currentPage === 1
          ? (
            <Scenes
              scenes={PAGE1_SCENES}
              isDark={isDark}
              states={sceneStates}
            />
          )
          : ""}
        {currentPage === 2
          ? <Scenes scenes={PAGE2_SCENES} states={sceneStates} />
          : ""}

        <SwitchPage
          currentPage={currentPage}
          setCurrentPage={updatePage}
          isDark={isDark}
        />
      </div>
    </Container>
  );
};

export default Home;
