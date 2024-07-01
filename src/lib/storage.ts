import * as v from "valibot";

// 各 schema 定義
const themeSchema = v.picklist(["light", "dark"]);
// Homeにおける表示ページ
const pageSchema = v.picklist([0, 1, 2]);

const SCENE_IDS = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "A",
    "7",
    "7d",
    "8",
    "8d",
    "9",
    "9d",
    "B",
    "10",
] as const;
type SceneId = typeof SCENE_IDS[number];
// クリアしたシーン
const sceneSchema = v.object({
    id: v.picklist(SCENE_IDS),
    checked: v.boolean(),
});
// クリアしたシーンの配列
const sceneStatesSchema = v.array(sceneSchema);
type SceneStates = v.InferInput<typeof sceneStatesSchema>;

const storageSchema = v.object({
    theme: themeSchema,
    page: pageSchema,
    sceneStates: sceneStatesSchema,
});
type Storage = v.InferInput<typeof storageSchema>;

const DEFAULT_STORAGE: Storage = {
    theme: "light",
    page: 0,
    sceneStates: SCENE_IDS.map((id) => ({ id, checked: false })),
} as const;

// local storage key
const KEY = {
    THEME: "theme",
    PAGE: "page",
    SCENE_STATES: "scene_states",
} as const;

// vStorage (Validated Storage) API
const save = (storage: Storage): void => {
    localStorage.setItem(KEY.THEME, storage.theme);
    localStorage.setItem(KEY.PAGE, storage.page.toString());
    localStorage.setItem(KEY.SCENE_STATES, JSON.stringify(storage.sceneStates));
};

const overwrite = (partial: Partial<Storage>): void => {
    const storage = load();
    save({ ...storage, ...partial });
};

const load = (): Storage => {
    const rawTheme = localStorage.getItem(KEY.THEME);
    const rawPage = localStorage.getItem(KEY.PAGE);
    const rawSceneStates = localStorage.getItem(KEY.SCENE_STATES);

    if (rawTheme === null || rawPage === null || rawSceneStates === null) {
        console.error(
            "Storage is not initialized. Saving the default storage.",
        );
        save(DEFAULT_STORAGE);
        return DEFAULT_STORAGE;
    }

    const storageResult = v.safeParse(storageSchema, {
        theme: rawTheme,
        page: Number(rawPage),
        sceneStates: JSON.parse(rawSceneStates),
    });

    // If the storage is corrupted or not initialized, save the default storage and return it
    if (!storageResult.success) {
        console.error(
            "Storage is corrupted or not initialized. Saving the default storage.",
            storageResult.issues.map((issue) => issue.message).join("\n"),
        );
        save(DEFAULT_STORAGE);
        return DEFAULT_STORAGE;
    }

    if (storageResult.output.sceneStates.length !== SCENE_IDS.length) {
        console.error(
            "Storage is corrupted. Saving the default storage.",
            "The number of scene states is invalid.",
        );
        save(DEFAULT_STORAGE);
        return DEFAULT_STORAGE;
    }

    return storageResult.output;
};

// シーンのクリア状態を上書き
const overwriteChecked = (id: SceneId, checked: boolean): void => {
    const storage = load();
    const sceneStates = storage.sceneStates.map((sceneState) => {
        if (sceneState.id === id) {
            return { id, checked };
        }
        return sceneState;
    });
    overwrite({ sceneStates });
};

const vStorage = {
    load,
    save,
    overwrite,
    overwriteChecked,
};

export type { SceneId, SceneStates, Storage as VStorage };
export { vStorage };
