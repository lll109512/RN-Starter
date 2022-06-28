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

const App = (props) => {
    React.useEffect(() => {
        Orientation.lockToPortrait();
    }, []);
    return (
        <Suspense fallback={<Text style={{marginTop: 200}}>Loading... </Text>}>
            <NativeBaseProvider>
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
