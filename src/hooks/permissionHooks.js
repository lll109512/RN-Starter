import {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {Alert, Platform} from 'react-native';
import {RESULTS, PERMISSIONS, request} from 'react-native-permissions';

export const usePermission = (permissionType) => {
    const {t} = useTranslation('app');

    const requestPermission = useCallback(async () => {
        const result = await request(permissionType);
        switch (result) {
            case RESULTS.UNAVAILABLE:
                Alert.alert(
                    t('permissionError'),
                    t('perrmissionNotAvailable', {permissionType}),
                );
                console.log(
                    'This feature is not available (on this device / in this context)',
                );
                return false;
            case RESULTS.DENIED:
                Alert.alert(
                    t('permissionError'),
                    t('perrmissionDenied', {permissionType}),
                );
                console.log(
                    'The permission has not been requested / is denied but requestable',
                );
                return false;
            case RESULTS.LIMITED:
                Alert.alert(
                    t('permissionError'),
                    t('perrmissionLimited', {permissionType}),
                );
                console.log(
                    'The permission is limited: some actions are possible',
                );
                return false;
            case RESULTS.GRANTED:
                console.log('The permission is granted');
                return true;
            case RESULTS.BLOCKED:
                Alert.alert(
                    t('permissionError'),
                    t('perrmissionBlocked', {permissionType}),
                );
                console.log(
                    'The permission is denied and not requestable anymore',
                );
                return false;
        }
    }, [permissionType, __]);

    return {requestPermission};
};
export const useGeolocationPermission = () =>
    usePermission(
        Platform.OS === 'android'
            ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
            : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    );

export const useImageGalleryPermission = () =>
    usePermission(
        Platform.OS === 'android'
            ? PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
            : PERMISSIONS.IOS.PHOTO_LIBRARY,
    );

export const useCalendarPermission = () =>
    usePermission(
        Platform.OS === 'android'
            ? PERMISSIONS.ANDROID.WRITE_CALENDAR
            : PERMISSIONS.IOS.CALENDARS,
    );
