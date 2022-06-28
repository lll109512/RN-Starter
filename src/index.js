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

const App = (props) => {
    React.useEffect(() => {
        Orientation.lockToPortrait();
    }, []);
    return (
        <Suspense fallback={<Text style={{marginTop: 200}}>Loading... </Text>}>
            <SWRConfig value={{...RNConfig, use: [serialize]}}>
                <SafeAreaProvider>
                    <NavigationContainer>
                        <RootNavigator />
                    </NavigationContainer>
                </SafeAreaProvider>
            </SWRConfig>
        </Suspense>
    );
};

export default App;
