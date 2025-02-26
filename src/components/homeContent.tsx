import React from "react";
import BudouX from "@/components/BudouX";

interface TitleProps {
  isDark: boolean;
  allClear: boolean;
}

const Title = ({ isDark, allClear }: TitleProps) => (
  <div
    className={`w-full text-center  font-sawarabi ${
      !isDark ? "text-black" : "text-white"
    }`}
    style={{
      marginBottom: "80px",
    }}
  >
    <div className="text-8xl">
      MIST
    </div>
    {allClear
      ? (
        <div className="text-4xl mt-4">
          ALL CLEAR!
        </div>
      )
      : ""}
  </div>
);

interface InfoProps {
  title: string;
  content: string | React.JSX.Element;
  isDark: boolean;
}

const Info = ({ title, content, isDark }: InfoProps) => (
  <div
    className={`mb-6 font-notoSerif ${!isDark ? "text-charcoal" : "text-lime"}`}
  >
    <div
      className={`text-2xl border-b ${
        !isDark ? "border-charcoal" : "border-lime"
      } mb-3 text-center`}
    >
      {title}
    </div>
    <div className="text-2xl text-center">{content}</div>
  </div>
);

const NoticeContent = () => (
  <div className="text-xl flex flex-col text-center pt-1">
    <div className="mb-3">
      <BudouX text="キーボード操作が必須です。PCでご覧ください。" />
    </div>
    <div className="mb-3">
      <BudouX text="ステージをやり直す際には、ページをリロードしてください。" />
    </div>
  </div>
);

const PreconditionContent = () => (
  <div className="text-xl flex flex-col text-center pt-1">
    <div>
      <BudouX text="マスとマスの境界に壁はない。" />
    </div>
    <div className="mb-3">
      <BudouX text="進みたい方向に進めない場合、その原因は進みたい方向に黒マスがあるためである。" />
    </div>
    <div className="mb-3">
      <BudouX text="黒マスを通り抜けることはできない。" />
    </div>
    <div>
      <BudouX text="移動可能なマスは上下左右に隣接するマスのみである。" />
    </div>
    <div className="mb-3">
      <BudouX text="SとGは盤面中にどちらも1つしか存在しない。" />
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

const Tutorial2Content = () => (
  <div className="text-xl flex flex-col text-center pt-1">
    <div>
      <BudouX text="下の正方形「7」をクリックして、「右矢印キー」を4回、「スペースキー」を1回、「上矢印キー」を4回、そして最後に「エンターキー」を1回押してください。" />
    </div>
  </div>
);

const Tutorial2DarkContent = () => (
  <div className="text-xl flex flex-col text-center pt-1">
    <div>
      <BudouX text="下の正方形「7」をクリックして、「右矢印キー」を4回、「スペースキー」を1回、「上矢印キー」を2回、そして最後に「エンターキー」を1回押してください。" />
    </div>
  </div>
);

export {
  Info,
  NoticeContent,
  PreconditionContent,
  Title,
  Tutorial2Content,
  Tutorial2DarkContent,
  TutorialContent,
};
