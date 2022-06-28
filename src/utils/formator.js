import { format, formatDistance, formatRelative, parseISO } from "date-fns";
import { enUS, zhCN } from "date-fns/locale";
import numeral from "numeral";

export const currencyFormator = (value, currency = "") => {
    return numeral(value).format(`${currency}0,0.[00]`);
};

export const percentageFormator = (value) => {
    return numeral(value).format("0.[00]%");
};

export const KFormator = (value) => {
    return numeral(value).format("0.[0]a");
};

export const formatMonthYear = (ISODate) => {
    return format(parseISO(ISODate), "MMMM yyyy");
};

export const formatDateTime = (ISODate) => {
    return format(parseISO(ISODate), "dd/MM/yyyy HH:mm:ss");
};

export const formatRelativeDay = (ISODate) => {
    return formatRelative(parseISO(ISODate), new Date());
};

export const i18nLocaleMapper = {
    "en-US": enUS,
    "zh-CN": zhCN,
};

export const formateTimeLeft = (ISODate, locale = "en-US") => {
    return formatDistance(parseISO(ISODate), new Date(), {
        locale: i18nLocaleMapper[locale] || enUS,
    });
};
