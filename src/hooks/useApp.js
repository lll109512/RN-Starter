import { useAuth } from "./useAuth";
import { useLocale } from "./useLocale";

export const useApp = () => {
    const authState = useAuth();
    const localeState = useLocale();
    return {
        auth:authState,
        locale:localeState
    };
};
