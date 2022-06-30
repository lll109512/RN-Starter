import { extendTheme } from "native-base";
import { storage } from "stores";

export const designSystemColors = {
    light: {
        primary: 'yellow.400',
        primaryPressed: 'yellow.500',
        white: 'warmGray.50',
        dark: 'dark.100',
        tabActive: 'yellow.400',
        tabInactive: 'warmGray.500',
    },
    dark: {
        primary: 'yellow.400',
        primaryPressed: 'yellow.500',
        white: 'dark.100',
        dark: 'warmGray.50',
        tabActive: 'yellow.400',
        tabInactive: 'warmGray.400',
    },
};

export const colorModeManager = {
    get: async () => {
        try {
            let val = storage.getString('colorMode');
            return val === 'dark' ? 'dark' : 'light';
        } catch (e) {
            console.log('get color mode error:',e);
            return 'light';
        }
    },
    set: async (value) => {
        try {
            storage.set('colorMode', value);
        } catch (e) {
            console.log('set color mode error:',e);
        }
    },
};


const newColorTheme = {
    brand: {
        900: '#8287af',
        800: '#7c83db',
        700: '#b3bef6',
    },
    
};

export const theme = extendTheme({
    colors: newColorTheme,
    components: {
        Button: {
            variants: {
                primary: ({colorMode, colorScheme}) => {
                    return {
                        backgroundColor: designSystemColors.light.primary,
                        _text: {
                            color: designSystemColors.light.dark,
                        },
                        _pressed: {
                            backgroundColor: designSystemColors.light.primaryPressed,
                        },
                    };
                },
                cancel: ({colorMode, colorScheme}) => {
                    return {
                        backgroundColor: 'warmGray.200',
                        _text: {
                            color: designSystemColors.light.dark,
                        },
                        _pressed: {
                            backgroundColor: 'warmGray.300',
                        },
                    };
                },
            },
            defaultProps:{
                variant:"primary"
            }
        },
    },
    fontConfig: {
        Roboto: {
            100: {
                normal: 'Roboto_100Thin',
                italic: 'Roboto_100Thin_Italic',
            },
            300: {
                normal: 'Roboto_300Light',
                italic: 'Roboto_300Light_Italic',
            },
            400: {
                normal: 'Roboto_400Regular',
                italic: 'Roboto_400Regular_Italic',
            },
            500: {
                normal: 'Roboto_500Medium',
                italic: 'Roboto_500Medium_Italic',
            },
            700: {
                normal: 'Roboto_700Bold',
                italic: 'Roboto_700Bold_Italic',
            },
            900: {
                normal: 'Roboto_900Black',
                italic: 'Roboto_900Black_Italic',
            },
        },
    },

    //TODO: has issues, not working
    fonts: {
        heading: 'Roboto',
        body: 'Roboto',
        mono: 'Roboto',
    },
});