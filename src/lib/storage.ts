import * as v from "valibot";

// 各 schema 定義
const themeSchema = v.picklist(["light", "dark"]);
const pageSchema = v.picklist([0, 1]);

const storageSchema = v.object({
    theme: themeSchema,
    page: pageSchema,
});
type Storage = v.InferInput<typeof storageSchema>;

const DEFAULT_STORAGE: Storage = {
    theme: "light",
    page: 0,
} as const;

// local storage key
const KEY = {
    THEME: "theme",
    PAGE: "page",
} as const;

// vStorage (Validated Storage) API
const save = (storage: Storage): void => {
    localStorage.setItem(KEY.THEME, storage.theme);
    localStorage.setItem(KEY.PAGE, storage.page.toString());
};

const overwrite = (partial: Partial<Storage>): void => {
    const storage = load();
    save({ ...storage, ...partial });
};

const load = (): Storage => {
    const rawTheme = localStorage.getItem(KEY.THEME);
    const rawPage = localStorage.getItem(KEY.PAGE);

    const storageResult = v.safeParse(storageSchema, {
        theme: rawTheme,
        page: rawPage,
    });

    // If the storage is corrupted or not initialized, save the default storage and return it
    if (!storageResult.success) {
        save(DEFAULT_STORAGE);
        return DEFAULT_STORAGE;
    }

    return storageResult.output;
};

const vStorage = {
    load,
    save,
    overwrite,
};

export { vStorage };
