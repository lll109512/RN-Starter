import React from 'react'
import { flatten, get, isFunction, isNil, trimEnd } from "lodash";
import { View, Text } from "react-native";

const oneLine = (components, formik, i18n) => {
    return (
        <View style={{
            alignItems:"center",
            display:"flex",
            flexDirection:"row"
        }}>
            {components.map((item, index) => (
                <View key={index} style={{
                    marginLeft:index !== 0 ? 1 : 0,
                    flex:1
                }}>
                    {formikMapper(item, formik, i18n)}
                </View>
            ))}
        </View>
    );
};

const UndefinedView = (props)=><View><Text style={{textAlign: "center"}}>Undefined views of type:{props.type}</Text></View>
const UndefinedForm = (props)=><View><Text style={{textAlign: "center"}}>Undefined forms of type:{props.type}</Text></View>

export default class FormFactory {
    constructor(
        viewComponents = {},
        formComponents = {},
        viewLayoutComponents = ["divider", "title"]
    ) {
        this.viewComponents = {
            ...viewComponents,
            undefined: {
                component: UndefinedForm,
                placeholderValue: "",
            },
        };
        this.formComponents = {
            ...formComponents,
            undefined: {
                component: UndefinedView,
                defaultValue: "",
            },
        };
        this.viewLayoutComponents = viewLayoutComponents;
    }
    formikFormMapper({ field, formik, i18n, index, ...other }) {
        if (Array.isArray(field)) {
            return oneLine(field, formik, i18n);
        } else {
            if (field?.hide && field.hide(formik)) {
                return null;
            }
            const { component: Component, ...otherProps } =
                this.formComponents[field.type] || this.viewComponents["undefined"];
            return (
                <Component
                    formik={formik}
                    i18n={i18n}
                    index={index}
                    {...other}
                    {...otherProps}
                    {...field}
                />
            );
        }
    }
    formikViewMapper({ field, i18n, index, data, trimStar, ...other }) {
        const { label, title, name } = field;
        const displayTitle =
            title || (label && isFunction(label) ? label(data) : label) || i18n(name);
        const formatedTitle = trimStar ? trimEnd(trimEnd(displayTitle, "*")) : displayTitle;
        const { component: Component, ...otherProps } =
            this.viewComponents[field.type] || this.viewComponents["undefined"];
        return (
            <Component
                i18n={i18n}
                index={index}
                formatedTitle={formatedTitle}
                data={data}
                {...other}
                {...otherProps}
                {...field}
            />
        );
    }

    buildForm({ fields, formik, i18n }) {
        return fields.map((field, index) => this.formikFormMapper({ field, formik, i18n, index }));
    }

    buildView({ i18n, data, fields, keepFormat = false, trimStar = false }) {
        const filterField = keepFormat
            ? flatten(fields)
            : flatten(fields).filter(field => !this.viewLayoutComponents.includes(field.type));
        return filterField
            .filter(({ name }) => (keepFormat ? true : !isNil(data[name]) && data[name] !== ""))
            .map((field, index) => this.formikViewMapper({ field, i18n, trimStar, index, data }));
    }
}
