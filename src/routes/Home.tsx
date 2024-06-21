import Container from "@/components/Container";
import { Link } from "react-router-dom";
import Nav from "@/components/Nav";
import { Tooltip } from "react-tooltip";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MdOutlineChevronLeft, MdOutlineChevronRight } from "react-icons/md";
import {
  Info,
  NoticeContent,
  PreconditionContent,
  Tutorial2Content,
  TutorialContent,
} from "@/components/homeContent";

const SwitchPage = () => {
  return (
    <div className="flex justify-center items-center gap-1 font-notoSans">
      <Button variant="outline" size="icon">
        <MdOutlineChevronLeft size={24} />
      </Button>
      <span
        style={{
          fontSize: "24px",
          lineHeight: "36px",
          marginTop: "-4px",
          paddingTop: "0px",
          paddingBottom: "0px",
          width: "10px",
          textAlign: "center",
          justifyContent: "center",
          fontWeight: 500,
        }}
      >
        |
      </span>
      <Button variant="outline" size="icon">
        <MdOutlineChevronRight size={24} />
      </Button>
    </div>
  );
};

const SCENES = ["0", "1", "2", "3", "4", "5", "6", "A", "7", "8", "9"];

interface HomeProps {
  containerWidth: number;
}

const Home = ({ containerWidth }: HomeProps) => {
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
      <Tooltip
        id="my-tooltip"
        style={{
          zIndex: "calc(infinity)",
        }}
      />

      <div className="flex flex-col">
        <div
          className="w-full text-center text-8xl text-charcoal font-sawarabi"
          style={{
            marginBottom: "80px",
          }}
        >
          MIST
        </div>
        <div
          className="text-charcoal"
          style={{
            marginBottom: "40px",
          }}
        >
          <Info title="制作" content="kaiiy" />
          <Info title="注意事項" content={<NoticeContent />} />
          <Info title="前提条件" content={<PreconditionContent />} />
          <Info title="チュートリアル" content={<TutorialContent />} />
          <Info title="チュートリアル2" content={<Tutorial2Content />} />
        </div>

        <div className="flex flex-wrap gap-3 justify-center font-notoSerif mb-12">
          {SCENES.map((stage, index) => (
            <Link to={`/${stage}`} key={index}>
              <div className="w-32 h-32 border border-charcoal bg-white text-center text-2xl flex items-center justify-center cursor-pointer transition duration-300 hover:text-lime hover:bg-charcoal">
                {stage}
              </div>
            </Link>
          ))}
        </div>

        <SwitchPage />
      </div>
    </Container>
  );
};

export default Home;
