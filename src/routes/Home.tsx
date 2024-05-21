import Container from "@/components/Container";
import BudouX from "@/components/BudouX";

interface InfoProps {
  title: string;
  content: string | JSX.Element;
}

const Info = ({ title, content }: InfoProps) => (
  <div className="mb-6">
    <div className="text-2xl border-b border-black mb-3 text-center">
      {title}
    </div>
    <p className="text-2xl text-center">{content}</p>
  </div>
);

const NoticeContent = () => (
  <div className="text-xl flex flex-col text-center pt-1">
    <div>
      <BudouX text="各ステージはそれ単体で解くことができます。" />
    </div>
    <div className="mb-3">
      <BudouX text="ステージをやり直す際には、ページをリロードしてください。" />
    </div>
    <div>
      <BudouX text="本作は、前作「" />
      <a
        href="https://kaiiy.github.io/haze/"
        className="text-blue-500"
        target="_blank"
      >
        <BudouX text="HAZE" />
      </a>
      <BudouX text="」のシステムを踏襲しています。" />
    </div>
    <div>
      <BudouX text="先に「HAZE: STAGE 1」をプレイされることをおすすめします。" />
    </div>
  </div>
);

const TutorialContent = () => (
  <div className="text-xl flex flex-col text-center pt-1">
    <div>
      <BudouX text="下の正方形「0」をクリックして、「右矢印キー」を3回、「スペースキー」を1回、「右矢印キー」を3回、そして最後に「エンターキー」を1回押してください。" />
    </div>
  </div>
);

interface HomeProps {
  containerWidth: number;
}

const Home = ({ containerWidth }: HomeProps) => {
  return (
    <Container width={containerWidth}>
      <div className="flex flex-col font-sawarabi">
        <div
          className="w-full text-center text-8xl"
          style={{
            marginTop: "80px",
            marginBottom: "80px",
          }}
        >
          VIEW
        </div>
        <div
          style={{
            marginBottom: "40px",
          }}
        >
          <Info title="制作" content="kaiiy" />
          <Info title="注意事項" content={NoticeContent()} />
          <Info title="チュートリアル" content={TutorialContent()} />
        </div>
        <div className="flex flex-wrap gap-3 justify-center">
          {[
            "0",
            "1",
            "2",
            "3",
            "1",
            "2",
            "3",
          ].map((stage) => (
            <div className="w-32 h-32 border border-black text-center text-2xl flex items-center justify-center">
              {stage}
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Home;
