// import { foundations } from './foundations';

// const { colors } = foundations;

// export const semanticTokens = {
//     colors: {
//         'body-text': colors.gray[800],
//         'body-bg': colors.white,
//         'border-color': colors.gray[200],
//         'inverse-text': colors.white,
//         'subtle-bg': colors.gray[100],
//         'subtle-text': colors.gray[600],
//         'placeholder-color': colors.gray[500],
//         primary: colors.violet[500],
//         secondary: colors.blue[500],
//         error: colors.red[500],
//         success: colors.green[500],
//         warning: colors.yellow[500],
//         info: colors.blue[500],
//     },
// };


// semanticTokens.ts
import { foundations } from './foundations';

const { colors } = foundations;

export const semanticTokens = {
    colors: {
        // Updated for a dark theme
        'body-text': colors.gray[1700], // Using a lighter gray for text
        'body-bg': colors.gray[2100], // Using a dark background color
        'border-color': colors.gray[700], // A lighter gray for borders
        'inverse-text': colors.gray[600],
        'subtle-bg': colors.gray[2000],
        'subtle-text': colors.gray[1800],
        'placeholder-color': colors.gray[1800],
        primary: colors.violet[500],
        secondary: colors.blue[500],
        error: colors.red[500],
        success: colors.green[500],
        warning: colors.yellow[500],
        info: colors.blue[500],
    },
};