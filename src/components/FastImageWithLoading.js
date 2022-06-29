import {Box, Spinner} from 'native-base';
import React, {useState} from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import FastImage from 'react-native-fast-image';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import Ionicons from '@expo/vector-icons/Ionicons';

const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);
const MAX_RELOAD_FAST_IMAGE = 3;

const FastImageWithLoading = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [fastImageKey, setFastImageKey] = useState(1);
    const {source} = props;
    const rStyle = useAnimatedStyle(() => {
        const x = isLoading || hasError ? 0 : 1;
        return {
            opacity: withTiming(x, {duration: 400}),
        };
    });
    return (
        <View
            style={[
                {flex: 1, height: '100%', width: '100%', overflow: 'hidden'},
                props.style,
            ]}>
            <Box
                style={[
                    {backgroundColor: '#c9c9c9'},
                    StyleSheet.absoluteFillObject,
                    {
                        alignItems: 'center',
                        justifyContent: 'center',
                        display: 'flex',
                    },
                    props.style,
                ]}>
                {hasError && (
                    <Ionicons name="cloud-offline-outline" color={'white'} />
                )}
                {isLoading && <Spinner size="sm" />}
            </Box>

            <AnimatedFastImage
                key={fastImageKey}
                {...props}
                style={[{flex: 1}, props.style, rStyle]}
                onLoadStart={() => {
                    setHasError(false);
                    setIsLoading(true);
                }}
                onLoadEnd={() => {
                    setIsLoading(false);
                }}
                onError={(error) => {
                    setHasError(true);
                    if (source.uri) {
                        if (fastImageKey < MAX_RELOAD_FAST_IMAGE) {
                            setTimeout(() => {
                                setFastImageKey(fastImageKey + 1);
                            }, 1000);
                        } else {
                            console.warn(
                                "Fast Image error occur, max increment reach, the image won't be displayed",
                            );
                        }
                    }
                }}
            />
        </View>
    );
};

export default FastImageWithLoading;

const styles = StyleSheet.create({});
