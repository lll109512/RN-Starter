import {StyleSheet, Text, View} from 'react-native';
import React, {Suspense} from 'react';
import Home from 'screens/Home';
import Orientation from 'react-native-orientation';
import {serialize} from 'superagent';
import {RNConfig} from 'swr/config';
import {SWRConfig} from 'swr';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {RootNavigator} from 'routes';
import {
    formComponents,
    viewComponents,
} from 'components/FormGenerator/FormGeno';
import {FormProvider} from 'components/FormGenerator/ContextProvider';
import {NativeBaseProvider} from 'native-base';
import { colorModeManager, theme } from 'config/theme';

import {
    useFonts,
    Roboto_100Thin,
    Roboto_100Thin_Italic,
    Roboto_300Light,
    Roboto_300Light_Italic,
    Roboto_400Regular,
    Roboto_400Regular_Italic,
    Roboto_500Medium,
    Roboto_500Medium_Italic,
    Roboto_700Bold,
    Roboto_700Bold_Italic,
    Roboto_900Black,
    Roboto_900Black_Italic,
} from '@expo-google-fonts/roboto';

const App = (props) => {
    React.useEffect(() => {
        Orientation.lockToPortrait();
    }, []);

    const [fontsLoaded] = useFonts({
        Roboto_100Thin,
        Roboto_100Thin_Italic,
        Roboto_300Light,
        Roboto_300Light_Italic,
        Roboto_400Regular,
        Roboto_400Regular_Italic,
        Roboto_500Medium,
        Roboto_500Medium_Italic,
        Roboto_700Bold,
        Roboto_700Bold_Italic,
        Roboto_900Black,
        Roboto_900Black_Italic,
    });
    if (!fontsLoaded) {
        return <></>;
    }

    return (
        <Suspense fallback={<Text style={{marginTop: 200}}>Loading... </Text>}>
            <NativeBaseProvider
                theme={theme}
                colorModeManager={colorModeManager}>
                <FormProvider
                    formComponents={formComponents}
                    viewComponents={viewComponents}>
                    <SWRConfig value={{...RNConfig, use: [serialize]}}>
                        <SafeAreaProvider>
                            <NavigationContainer>
                                <RootNavigator />
                            </NavigationContainer>
                        </SafeAreaProvider>
                    </SWRConfig>
                </FormProvider>
            </NativeBaseProvider>
        </Suspense>
    );
};

export default App;
