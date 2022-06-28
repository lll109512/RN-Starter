import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Text, View} from 'react-native';

const ErrorPage = (props) => {
    const {text} = props;
    const {t} = useTranslation('app');
    return (
        <View style={styles.root}>
            <Text style={styles.text}>{text || t('pageErrorText')}</Text>
        </View>
    );
};

export default ErrorPage;

const styles = StyleSheet.create({
    root: {
        backgroundColor: 'white',
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'black',
        fontSize: 18,
    },
});
