import { useEffect } from 'react';

import { useAppConfig } from '@app/useAppConfig';
import { useIsThemeV2 } from '@app/useIsThemeV2';
import { useCustomTheme } from '@src/customThemeContext';

// add new theme ids here
// eslint-disable-next-line @typescript-eslint/no-unused-vars
enum ThemeId {}

function useCustomThemeId() {
    const { config, loaded } = useAppConfig();

    if (!loaded) {
        return loadThemeIdFromLocalStorage();
    }

    return config.visualConfig.theme?.themeId || null;
}

export function useSetAppTheme() {
    const isThemeV2 = useIsThemeV2();
    const { config } = useAppConfig();
    const { updateTheme } = useCustomTheme();
    const customThemeId = useCustomThemeId();

    useEffect(() => {
        setThemeIdLocalStorage(customThemeId);
    }, [customThemeId]);

    useEffect(() => {
        // Here, we have hardcoded the logic to use the dark theme for the new UI.
        // This bypasses any flags or local storage settings to ensure the dark theme is always applied.
        // The old UI remains untouched because its theming is handled separately.
        if (isThemeV2) {
            import('../conf/theme/theme_v2dark.config.json').then((theme) => updateTheme(theme));
        } else {
            import('../conf/theme/theme_light.config.json').then((theme) => updateTheme(theme));
        }
    }, [config, isThemeV2, updateTheme, customThemeId]);
}

function setThemeIdLocalStorage(customThemeId: string | null) {
    if (!customThemeId) {
        removeThemeIdFromLocalStorage();
    } else if (loadThemeIdFromLocalStorage() !== customThemeId) {
        saveToLocalStorage(customThemeId);
    }
}

const CUSTOM_THEME_ID_KEY = 'customThemeId';

export function loadThemeIdFromLocalStorage(): string | null {
    return localStorage.getItem(CUSTOM_THEME_ID_KEY);
}

function removeThemeIdFromLocalStorage() {
    return localStorage.removeItem(CUSTOM_THEME_ID_KEY);
}

function saveToLocalStorage(customThemeId: string) {
    localStorage.setItem(CUSTOM_THEME_ID_KEY, customThemeId);
}
