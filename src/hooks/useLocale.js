import {useTranslation} from 'react-i18next';
import {enAU, zhCN} from 'date-fns/locale';

export const useLocale = () => {
    const {i18n} = useTranslation();
    return {
        locale: i18n.language,
        fnsLngLib: i18n.language === 'zh-CN' ? zhCN : enAU,
        ...i18n
    };
};
