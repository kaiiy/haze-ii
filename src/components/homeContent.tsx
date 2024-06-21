import BudouX from "@/components/BudouX";

interface InfoProps {
    title: string;
    content: string | JSX.Element;
}

const Info = ({ title, content }: InfoProps) => (
    <div className="mb-6 font-notoSerif">
        <div className="text-2xl border-b border-charcoal mb-3 text-center">
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
        <div>
            <BudouX text="各ステージはそれ単体で解くことができます。" />
        </div>
        <div className="mb-3">
            <BudouX text="ステージをやり直す際には、ページをリロードしてください。" />
        </div>
        <div>
            <BudouX text="本作は、前作「" />
            <a
                href="https://haze.kaiix.dev/"
                className="text-blue-500"
                target="_blank"
            >
                <BudouX text="HAZE" />
            </a>
            <BudouX text="」における「STAGE 1」のシステムを踏襲しています。" />
        </div>
        <div>
            <BudouX text="本作を始める前に「HAZE: STAGE 1」のクリアをおすすめします。" />
        </div>
    </div>
);

const PreconditionContent = () => (
    <div className="text-xl flex flex-col text-center pt-1">
        <div className="mb-3">
            <BudouX text="マスとマスの境界に壁はない。" />
        </div>
        <div>
            <BudouX text="進みたい方向に進めない場合、その原因は進みたい方向に黒マスがあるためである。" />
        </div>
        <div className="mb-3">
            <BudouX text="黒マスを通り抜けることはできない。" />
        </div>
        <div>
            <BudouX text="斜めマス等、隣接しないマスへと移動することはない。" />
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
            <BudouX text="下の正方形「6」をクリックして、「右矢印キー」を6回、「スペースキー」を1回、「上矢印キー」を6回、そして最後に「エンターキー」を1回押してください。" />
        </div>
    </div>
);

export {
    Info,
    NoticeContent,
    PreconditionContent,
    Tutorial2Content,
    TutorialContent,
};
