import ContainerBase from "@/components/ContainerBase";
import Nav from "@/components/Nav";
import NavTooltip from "@/components/NavTooltip";
import { Switch } from "@/components/ui/switch";

import { CiLight, CiDark } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";

import { Checkbox } from "@/components/ui/checkbox"


interface SceneProps {
    baseSize: number;
    containerWidth: number;
}


const Scene = ({ containerWidth, baseSize }: SceneProps) => {
    return (
        <ContainerBase width={containerWidth} style={{
            minHeight: "100vh",
        }} >
            <NavTooltip />
            <Nav text="CHECKPOINT 2" />


            <div className="font-notoSerif" style={{
                marginTop: "60px",
                marginBottom: "160px",
            }}>
                <div className="text-2xl border-b border-charcoal text-center mb-3">
                    クリア条件
                </div>
                <div className="text-2xl text-center">すべてにチェックがつくこと</div>
            </div>

            <div className="flex items-center space-x-6 justify-center" style={{
                marginBottom: "160px",
            }}
            >
                <CiLight size={36} />
                <Switch />
                <MdDarkMode size={36} />
            </div>

            <div className="flex items-center space-x-3 justify-center mb-3">
                <Checkbox />
                <span className="text-3xl">SCENE 7</span>
            </div>
            <div className="flex items-center space-x-3 justify-center mb-3">
                <Checkbox />
                <span className="text-3xl">SCENE 8</span>
            </div>
            <div className="flex items-center space-x-3 justify-center mb-3">
                <Checkbox />
                <span className="text-3xl">SCENE 9</span>
            </div>
        </ContainerBase>
    );
}

export default Scene;
