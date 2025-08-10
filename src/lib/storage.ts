import * as v from "valibot";
import { SceneId, SCENE_IDS } from "@/lib/scene";

const sceneSchema = v.object({
    id: v.picklist(SCENE_IDS),
    checked: v.boolean(),
});

// クリアしたシーンの配列
const sceneStatesSchema = v.array(sceneSchema);
type SceneStates = v.InferInput<typeof sceneStatesSchema>;

const storageSchema = v.object({
    currentScene: v.picklist(SCENE_IDS),
    sceneStates: sceneStatesSchema,
});
type Storage = v.InferInput<typeof storageSchema>;

const DEFAULT_STORAGE: Storage = {
    currentScene: "0",
    sceneStates: SCENE_IDS.map((id) => ({ id, checked: false })),
} as const;

// local storage key
const KEY = {
    CURRENT_SCENE: "current_scene",
    SCENE_STATES: "scene_states",
} as const;

// vStorage (Validated Storage) API
const save = (storage: Storage): void => {
    localStorage.setItem(KEY.CURRENT_SCENE, String(storage.currentScene));
    localStorage.setItem(KEY.SCENE_STATES, JSON.stringify(storage.sceneStates));
};

const overwrite = (partial: Partial<Storage>): void => {
    const storage = load();
    save({ ...storage, ...partial });
};

const load = (): Storage => {
    const rawCurrentScene = localStorage.getItem(KEY.CURRENT_SCENE);
    const rawSceneStates = localStorage.getItem(KEY.SCENE_STATES);

    // If the storage is not initialized, save the default storage and return it
    if (rawCurrentScene === null || rawSceneStates === null) {
        save(DEFAULT_STORAGE);
        return DEFAULT_STORAGE;
    }

    const storageResult = v.safeParse(storageSchema, {
        currentScene: rawCurrentScene,
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

const updateCurrentSceneToNext = (currentId: SceneId): void => {
    const index = SCENE_IDS.indexOf(currentId);
    if (index === -1) {
        throw new Error(`The scene ID ${currentId} is not found in SCENE_IDS`);
    }
    if (index === SCENE_IDS.length - 1) {
        return;
    }
    overwrite({ currentScene: SCENE_IDS[index + 1] });
};

const vStorage = {
    load,
    save,
    overwrite,
    overwriteChecked,
    updateCurrentSceneToNext
};

export type { SceneId, SceneStates, Storage as VStorage };
export { vStorage };
