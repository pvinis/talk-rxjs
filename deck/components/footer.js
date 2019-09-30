import React from 'react'
import { useDeck } from 'mdx-deck'
import { View, Text } from 'react-native-web'

import { accent, text } from '../colors'

const MyText = props => (
    <Text {...props} style={{
        color: text,
        fontFamily: 'Iosevka Web, Iosevka',
        fontSize: 30,
    }} />
)

export const Footer = props => {
    const state = useDeck()

    return (
        <View style={{
            position: 'absolute',
            bottom: 0,
            height: 40,
            borderTopWidth: 1,
            borderTopColor: accent,
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
        }}>
            <MyText>{state.index} / {state.length - 1}</MyText>
            <MyText>Pavlos Vinieratos</MyText>
            <MyText accessibilityRole='link' target="_blank" href='https://twitter.com/pvinis'>@pvinis</MyText>
        </View>
    )
}
