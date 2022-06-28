import { isFunction, flatten, pick,isNil, isEmpty } from "lodash"
import { useFormik } from "formik"
import { formContext } from "./ContextProvider";
import { useContext } from "react";
import * as yup from "yup";

export const useForm = ({ fields=[], i18n=v=>v, defaultValues={}, onSubmit=()=>{},additionalNames=[] }) => {
    const { factory, viewLayoutComponents, formComponents } = useContext(formContext);

    const filterField = flatten(fields).filter(field => !viewLayoutComponents.includes(field.type));
    const validationSchema = yup.object(
        filterField.reduce((prev, curr) => {
            return { ...prev, [curr.name]: curr?.yup?.nullable() };
        }, {})
    );

    const formik = useFormik({
        initialValues: {
            ...filterField.reduce((prev, curr) => {
                const initValue = formComponents[curr.type]?.defaultValue || null;
                return { ...prev, [curr.name]: initValue };
            }, {}),
            ...pick(
                defaultValues,
                filterField.map(o => o.name)
            ),
        },
        validationSchema: validationSchema,
        onSubmit: async values => {
            const formik = { values };
            // only return input unhidden value
            const names = filterField
                .filter(item => {
                    if (item.hide) {
                        return !item.hide(formik);
                    } else {
                        return item.name?true:false
                    }
                })
                .map(item => item.name);
            const picked = pick(values, [...names,...additionalNames]);
            await onSubmit(picked);
        },
    });

    return {
        formik,
        handleSubmit: formik.handleSubmit,
        formGenerator: () => factory.buildForm({ fields, formik, i18n }),
        submitDisabled: !formik.isValid||isEmpty(formik.touched)
    };
};

export const useFormView = ({fields,i18n,data,keepFormat,trimStar})=>{
    const { factory } = useContext(formContext);
    if (isNil(fields) || isNil(data)) {
        return {
            viewGenerator: () => [],
        };
    }
    return {
        viewGenerator: () =>
            factory.buildView({ fields, i18n, keepFormat, trimStar, data }),
    };
}