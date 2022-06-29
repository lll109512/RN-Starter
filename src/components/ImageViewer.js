import { Icon } from '@genx/react';
import React, { useState } from 'react';

import {
    Modal,
    TouchableOpacity,
    ActivityIndicator,
    PermissionsAndroid,
    Platform,
    StyleSheet,
    View,
    Text
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import Orientation from 'react-native-orientation';
import FastImageWithLoading from './FastImageWithLoading';
import BackIcon from './BackIcon';

const ImagesViewer = ({
    open,
    onClose,
    images,
    noIndicator,
    index,
}) => {
    React.useEffect(() => {
        Orientation.unlockAllOrientations();
        return () => Orientation.lockToPortrait();
    }, []);

    const _renderHeader = (props) => (
        <TouchableOpacity style={styles.header} onPress={onClose}>
            {/* <Icon name='close-outline' type='ionicon' color='white' size={30}/> */}
            <BackIcon color={'white'}/>
        </TouchableOpacity>
    );

    return (
        <Modal
            visible={open}
            transparent={true}
            supportedOrientations={[
                'portrait',
                'portrait-upside-down',
                'landscape',
                'landscape-left',
                'landscape-right',
            ]}
            style={{ width: '100%', height: '100%' }}
        >
            <View style={{ flex: 1 }}>
                <ImageViewer
                    index={index}
                    imageUrls={images}
                    useNativeDriver
                    loadingRender={() => <ActivityIndicator color={'white'} />}
                    renderIndicator={(currentIndex, allSize) =>
                        noIndicator ? null : (
                            <Text
                                style={{
                                    color: 'white',
                                    alignSelf: 'center',
                                    zIndex: 999,
                                    position: 'absolute',
                                    top: 52,
                                    fontWeight:'500',
                                    fontSize:18,
                                }}
                            >
                                {currentIndex + '/' + allSize}
                            </Text>
                        )
                    }
                    renderHeader={_renderHeader}
                    onSwipeDown={onClose}
                    enableSwipeDown
                    saveToLocalByLongPress={false}
                    renderImage={(props) => <FastImageWithLoading {...props} />}
                />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        top: 48,
        left: -4,
        height: 46,
        width: 46,
        zIndex: 999,
    },
});

export default ImagesViewer;
