import React from 'react'
import { ActivityIndicator, StatusBar, StyleSheet, Text, View } from 'react-native'
import ErrorBoundary from 'react-native-error-boundary'
import ErrorPage from './ErrorPage'
import PropTypes from 'prop-types'
import { Box, useColorMode, useColorModeValue } from 'native-base'

const SafeLoadingScreen = (props) => {
    const {isLoading,children,header} = props
    // const {colorMode} = useColorMode()
    return (
        <ErrorBoundary FallbackComponent={ErrorPage}>
            <Box flex={1} bg={useColorModeValue('warmGray.50', 'dark.100')}>
                {header}
                <View style={[styles.root, isLoading && styles.indicatorRoot]}>
                    {isLoading ? <ActivityIndicator /> : children}
                </View>
            </Box>
        </ErrorBoundary>
    );
}

SafeLoadingScreen.propTypes = {
    isLoading: PropTypes.bool,
    header:PropTypes.node
};
export default SafeLoadingScreen

const styles = StyleSheet.create({
    indicatorRoot: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});
