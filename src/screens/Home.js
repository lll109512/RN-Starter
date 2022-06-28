import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SafeLoadingScreen from 'components/SafeLoadingScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from 'hooks/useAuth';
import { useApp } from 'hooks/useApp';

const Home = () => {
    const {locale} = useApp();
    return (
        <SafeLoadingScreen>
            <SafeAreaView edges={['top']}>
                <Text>language: {locale.locale}</Text>
            </SafeAreaView>
        </SafeLoadingScreen>
    );
};

export default Home;
