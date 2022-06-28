import React from 'react';
import SafeLoadingScreen from 'components/SafeLoadingScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from 'hooks/useAuth';
import { useApp } from 'hooks/useApp';
import { Button, Text, useColorMode } from 'native-base';

const Home = () => {
    const {locale} = useApp();
    const {toggleColorMode} = useColorMode();
    return (
        <SafeLoadingScreen>
            <SafeAreaView edges={['top']}>
                <Text color="cyan.800" fontSize={'4xl'}>
                    language: {locale.locale}
                </Text>
                <Button onPress={toggleColorMode}>Toggle color</Button>
            </SafeAreaView>
        </SafeLoadingScreen>
    );
};

export default Home;
