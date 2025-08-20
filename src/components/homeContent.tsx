import React from "react";
import BudouX from "@/components/BudouX";
import { vStorage } from "@/lib/storage";

interface TitleProps {
  isDark?: boolean;
  allClear: boolean;
}

const Title = ({ isDark = false, allClear }: TitleProps) => (
  <div
    className={`w-full text-center font-sawarabi ${
      !isDark ? "text-black" : "text-white"
    }`}
    style={{
      marginBottom: "80px",
    }}
  >
    <div className="text-8xl">
      HAZE II
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
  isDark?: boolean;
}

const Info = ({ title, content, isDark = false }: InfoProps) => (
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

const PreconditionContent = () => {
  const storage = vStorage.load();
  const sceneStates = storage.sceneStates;

  const isCheckpointClear = sceneStates.find(
    (sceneState) => sceneState.id === "C",
  )?.checked;
  if (isCheckpointClear === undefined) {
    throw new Error("isCheckpointClear is undefined");
  }

  return (
    <div className="text-xl flex flex-col text-center pt-1">
      <div>
        <BudouX text="マスとマスの境界に壁はない。" />
      </div>
      <div>
        <BudouX text="盤面には白マスと黒マスのみが存在する。" />
      </div>
      <div className="mt-3">
        <BudouX text="移動可能なマスは上下左右に隣接する白マスのみである。" />
      </div>
      <div>
        <BudouX text="黒マスのあるマスへは進めない。" />
      </div>
      <div className="mt-3">
        <BudouX text="SとGは盤面中にどちらも1つしか存在しない。" />
      </div>
      {isCheckpointClear && (
        <div className="mt-3 font-bold">
          <BudouX text="[NEW] 白マス中の数字はGからの最短距離を表す。" />
        </div>
      )}
    </div>
  );
};

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
  PreconditionContent,
  Title,
  Tutorial2Content,
  Tutorial2DarkContent,
  TutorialContent,
};
