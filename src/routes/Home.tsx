import Container from "@/components/Container";
import Nav from "@/components/Nav";
import { useEffect, useState } from "react";
import {
  Info,
  NoticeContent,
  PreconditionContent,
  Title,
  Tutorial2Content,
  TutorialContent,
} from "@/components/homeContent";
import { Scenes, SwitchPage } from "@/components/homeUI";
import NavTooltip from "@/components/NavTooltip";
import { vStorage } from "@/lib/storage";

const PAGE_NUM = 2;

const PAGE0_SCENES = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "A",
] as const;

const PAGE1_SCENES = ["7", "8", "9", "B"] as const;

interface HomeProps {
  containerWidth: number;
}

const Home = ({ containerWidth }: HomeProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isDark, setIsDark] = useState(false);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Backspace") {
      // ブラウザのページバックを無効化
      e.preventDefault();
    }
  };

  const updatePage = (page: number) => {
    setCurrentPage(page);
    if (page === 0 || page === 1) {
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

  return (
    <Container width={containerWidth} isDark={isDark}>
      <Nav text="HOME" />
      <NavTooltip />

      <div className="flex flex-col">
        <Title isDark={isDark} />

        <div
          className="text-charcoal"
          style={{
            marginBottom: "40px",
          }}
        >
          <Info title="制作" content="kaiiy" isDark={isDark} />
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
            : (
              <Info
                title="チュートリアル"
                content={<Tutorial2Content />}
                isDark={isDark}
              />
            )}
        </div>

        {currentPage === 0
          ? <Scenes scenes={PAGE0_SCENES} />
          : <Scenes scenes={PAGE1_SCENES} isDark={isDark} />}

        <SwitchPage
          currentPage={currentPage}
          setCurrentPage={updatePage}
          pageNum={PAGE_NUM}
          isDark={isDark}
        />
      </div>
    </Container>
  );
};

export default Home;
