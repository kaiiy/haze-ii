
const SCENE_IDS = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "L",
] as const;

const sceneIdsBefore = (currentId: SceneId): SceneId[] => {
    const index = SCENE_IDS.indexOf(currentId);
    if (index === -1) {
        throw new Error(`The scene ID ${currentId} is not found in SCENE_IDS`);
    }
    return SCENE_IDS.slice(0, index + 1);
};

type SceneId = typeof SCENE_IDS[number];

export { SCENE_IDS, sceneIdsBefore };
export type { SceneId };