import React from 'react'
import { ActivityIndicator, StatusBar, StyleSheet, Text, View } from 'react-native'
import ErrorBoundary from 'react-native-error-boundary'
import ErrorPage from './ErrorPage'
import PropTypes from 'prop-types'

const SafeLoadingScreen = (props) => {
    const {isLoading,children,header} = props
    return (
        <ErrorBoundary FallbackComponent={ErrorPage}>
            <StatusBar barStyle="dark-content"/>
            <View style={styles.root}>
                {header}
                <View style={[styles.root, isLoading && styles.indicatorRoot]}>
                    {isLoading ? (
                        <ActivityIndicator />
                    ) : (
                        children
                    )}
                </View>
            </View>
        </ErrorBoundary>
    )
}

SafeLoadingScreen.propTypes = {
    isLoading: PropTypes.bool,
    header:PropTypes.node
};
export default SafeLoadingScreen

const styles = StyleSheet.create({
    root: {
        backgroundColor: 'white',
        flex:1,
    },
    indicatorRoot: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});
