import {StyleSheet, Text, View} from 'react-native';
import React, { useState } from 'react';
import SafeLoadingScreen from 'components/SafeLoadingScreen';
import {SafeAreaView} from 'react-native-safe-area-context';
import { useLocale } from 'hooks/useLocale';
import { Box, Button, Spinner, useDisclose } from 'native-base';
import FastImageWithLoading from 'components/FastImageWithLoading';
import FastImage from 'react-native-fast-image';
import { DateTimePickerModal } from 'components/Pickers';

const Me = () => {
    const {changeLanguage} = useLocale()
    const {isOpen,onOpen,onClose} = useDisclose()
    const [date,setDate] = useState(null)
    return (
        <SafeLoadingScreen>
            <SafeAreaView edges={['top']}>
                <Text>Me</Text>
                <Button onPress={() => changeLanguage('zh-CN')}>zh-CN</Button>
                <Button onPress={() => changeLanguage('en-US')}>en-US</Button>
                <Box w="full" h={40} mt={3}>
                    <FastImageWithLoading
                        resizeMode={FastImage.resizeMode.cover}
                        source={{
                            uri: 'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg',
                        }}
                    />
                </Box>
                <Box mt={3}>
                    <Button onPress={onOpen}>datePicker</Button>
                    <DateTimePickerModal
                        open={isOpen}
                        onClose={onClose}
                        date={date}
                        onSave={(date) => setDate(date)}
                    />
                </Box>
            </SafeAreaView>
        </SafeLoadingScreen>
    );
};

export default Me;
