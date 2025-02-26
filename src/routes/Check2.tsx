import ContainerBase from "@/components/ContainerBase";
import Nav from "@/components/Nav";
import NavTooltip from "@/components/NavTooltip";
import { Switch } from "@/components/ui/switch";
import Clear from "@/components/Clear";
import { calcFontSizeFromBaseSize } from "@/lib/style";

import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";

import { Checkbox } from "@/components/ui/checkbox";

import { VStorage, vStorage } from "@/lib/storage";
import { useEffect, useState } from "react";

import { COLOR } from "@/lib/const";

const loadChecked = (id: string, storage: VStorage) => {
  const scene = storage.sceneStates.find((scene) => scene.id === id);
  if (scene === undefined) {
    throw new Error(`Scene ${id} is not found in the storage`);
  }
  return scene.checked;
};

interface SceneProps {
  baseSize: number;
  containerWidth: number;
}

const Scene = ({ containerWidth, baseSize }: SceneProps) => {
  const [isDark, setIsDark] = useState(false);

  const storage = vStorage.load();

  const sceneStates = [
    {
      title: "SCENE 7",
      checked: {
        light: loadChecked("7", storage),
        dark: loadChecked("7d", storage),
      },
    },
    {
      title: "SCENE 8",
      checked: {
        light: loadChecked("8", storage),
        dark: loadChecked("8d", storage),
      },
    },
    {
      title: "SCENE 9",
      checked: {
        light: loadChecked("9", storage),
        dark: loadChecked("9d", storage),
      },
    },
  ] as const;

  const showClear = sceneStates.every((scene) => {
    return scene.checked.light && scene.checked.dark;
  });

  if (showClear) {
    vStorage.overwriteChecked("B", true);
  }

  const fontSize = calcFontSizeFromBaseSize(baseSize);

  const switchTheme = () => {
    vStorage.overwrite({
      theme: isDark ? "light" : "dark",
    });
    setIsDark(!isDark);
  };

  useEffect(() => {
    const storage = vStorage.load();
    setIsDark(storage.theme === "dark");
  }, []);

  return (
    <ContainerBase
      width={containerWidth}
      style={{
        minHeight: "100vh",
        position: "relative",
      }}
      isDark={isDark}
    >
      <NavTooltip />
      <Nav text="CHECKPOINT 2" />

      <div
        className="absolute w-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        style={{
          zIndex: 10,
        }}
      >
        <div
          className={`font-notoSerif ${isDark ? "text-lime" : "text-charcoal"}`}
          style={{
            marginBottom: "80px",
          }}
        >
          <div
            className={`text-2xl border-b ${
              isDark ? "border-white" : "border-charcoal"
            } text-center mb-3`}
          >
            クリア条件
          </div>
          <div className="text-2xl text-center">
            すべてにチェックがつくこと
          </div>
        </div>

        {sceneStates.map((scene, index) => (
          <div
            className={`flex items-center space-x-4 justify-center mb-4 ${
              isDark ? "text-lime" : "text-charcoal"
            }`}
            key={index}
          >
            <Checkbox
              disabled
              checked={isDark ? scene.checked.dark : scene.checked.light}
              className={`${isDark ? "border-white" : ""}`}
            />
            <span
              style={{
                fontSize: "28px",
                lineHeight: "28px",
              }}
            >
              {scene.title}
            </span>
          </div>
        ))}

        <div
          className="flex items-center space-x-6 justify-center"
          style={{
            marginTop: "80px",
            marginBottom: "40px",
          }}
        >
          <CiLight
            size={36}
            color={`${isDark ? COLOR.LIME : COLOR.CHARCOAL}`}
          />
          <Switch
            checked={isDark}
            onClick={switchTheme}
            className="border-lime"
          />
          <MdDarkMode
            size={36}
            color={`${isDark ? COLOR.LIME : COLOR.CHARCOAL}`}
          />
        </div>

        <Clear
          showClear={showClear}
          fontSize={fontSize}
          isDark={isDark}
          sharedText="Checkpoint 2 Clear!"
        />
      </div>
    </ContainerBase>
  );
};

export default Scene;
