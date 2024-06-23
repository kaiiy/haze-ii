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
      <Nav text="HOME" />
      <NavTooltip />

      <div className="flex flex-col">
        <Title />

        <div
          className="text-charcoal"
          style={{
            marginBottom: "40px",
          }}
        >
          <Info title="制作" content="kaiiy" />
          <Info title="注意事項" content={<NoticeContent />} />
          <Info title="前提条件" content={<PreconditionContent />} />

          {currentPage === 0
            ? <Info title="チュートリアル" content={<TutorialContent />} />
            : <Info title="チュートリアル" content={<Tutorial2Content />} />}
        </div>

        {currentPage === 0 ? Scenes(PAGE0_SCENES) : Scenes(PAGE1_SCENES)}

        <SwitchPage
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageNum={PAGE_NUM}
        />
      </div>
    </Container>
  );
};

export default Home;
