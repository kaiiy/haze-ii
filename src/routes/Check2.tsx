import ContainerBase from "@/components/ContainerBase";
import Nav from "@/components/Nav";
import NavTooltip from "@/components/NavTooltip";
import { Switch } from "@/components/ui/switch";

import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";

import { Checkbox } from "@/components/ui/checkbox"


interface SceneProps {
    baseSize: number;
    containerWidth: number;
}


const Scene = ({ containerWidth }: SceneProps) => {
    return (
        <ContainerBase width={containerWidth} style={{
            minHeight: "100vh",
            position: "relative",
        }} >
            <NavTooltip />
            <Nav text="CHECKPOINT 2" />



            <div className="absolute w-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" style={{
                zIndex: 10
            }}>


                <div className="font-notoSerif" style={{
                    marginBottom: "80px",
                }}>
                    <div className="text-2xl border-b border-charcoal text-center mb-3">
                        クリア条件
                    </div>
                    <div className="text-2xl text-center">すべてにチェックがつくこと</div>
                </div>



                <div className="flex items-center space-x-3 justify-center mb-3">
                    <Checkbox disabled checked={true} />
                    <span className="text-3xl">SCENE 7</span>
                </div>
                <div className="flex items-center space-x-3 justify-center mb-3">
                    <Checkbox disabled checked={true} />
                    <span className="text-3xl">SCENE 8</span>
                </div>
                <div className="flex items-center space-x-3 justify-center mb-3">
                    <Checkbox disabled checked={true} />
                    <span className="text-3xl">SCENE 9</span>
                </div>


                <div className="flex items-center space-x-6 justify-center" style={{
                    marginTop: "80px",
                }}>
                    <CiLight size={36} />
                    <Switch />
                    <MdDarkMode size={36} />
                </div>
            </div>
        </ContainerBase>
    );
}

export default Scene;
