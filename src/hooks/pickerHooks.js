import { launchImageLibrary } from 'react-native-image-picker';
import {useImageGalleryPermission} from './permissionHooks'

export const useImagePickerWithPermission = (options={})=>{
    const { requestPermission } = useImageGalleryPermission();
    return async ()=>{
        // const grant = await requestPermission();
        // if(grant){
            return new Promise((resolve, reject) => {
                launchImageLibrary(
                    {
                        mediaType: 'photo',
                        maxWidth: '1680',
                        maxHeight: '1680',
                        quality: 0.5,
                        includeBase64: true,
                        ...options,
                    },
                    ({ didCancel, errorCode, errorMessage, assets, ...others }) => {
                        if (didCancel){
                            reject('cabcelled');
                            return;
                        } 
    
                        if (errorMessage) {
                            reject(errorMessage);
                            return
                        }
                        if (assets.length === 1) {
                            resolve(assets[0]);
                        } else {
                            resolve(assets);
                        }
                    }
                );

            });
        // }
    }
}

export const useVideoPickerWithPermission = (options={})=>{
    // const { requestPermission } = useImageGalleryPermission();
    return async ()=>{
        // const grant = await requestPermission();
        // if(grant){
            return new Promise((resolve, reject) => {
                launchImageLibrary(
                    {
                        mediaType: 'video',
                        ...options,
                    },
                    ({ didCancel, errorCode, errorMessage, assets, ...others }) => {
                        if (didCancel){
                            reject('cabcelled');
                            return;
                        } 
    
                        if (errorMessage) {
                            reject(errorMessage);
                            return
                        }
                        if (assets.length === 1) {
                            resolve(assets[0]);
                        } else {
                            resolve(assets);
                        }
                    }
                );

            });
        // }
    }
}