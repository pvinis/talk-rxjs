import { Provider } from './components/provider'

import { accent, background, text } from './colors'


export const myTheme = {
    Provider,
    fonts: {
        heading: 'Iosevka Web, Iosevka',
        body: 'Iosevka Web, Iosevka',
        monospace: 'Iosevka Web, Iosevka',
    },
    colors: {
        text,
        background,
        primary: 'red',
    },
    styles: {
        root: {
            fontFamily: 'Iosevka Web, Iosevka',
            fontWeight: 300, // light
        },
        h1: {
            color: accent,
            fontWeight: 700, // bold
        },
        h2: {
            color: accent,
            fontWeight: 300, // light
            marginTop: 0,
        },
        h3: {
            fontWeight: 300, // light
            marginTop: 0,
        },
        h4: {
            fontWeight: 300, // light
            marginTop: 0,
        },
        inlineCode: {
            color: accent,
        },
        code: {
            color: accent,
            fontSize: '30px',
        },
        a: {
            color: accent,
        },
        p: {
            textAlign: 'center',
        },
    },
}
