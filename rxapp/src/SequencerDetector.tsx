import React from 'react'
import { View, Text, Button, SafeAreaView } from 'react-native'
import R from 'ramda'
import { Subject, merge, Observable } from 'rxjs'
import { combineProps, useRxController } from 'rx-react-container'
import { map, scan, startWith, withLatestFrom, debounceTime } from 'rxjs/operators'

import { RED } from './RED'


enum Direction {
    Left = 'LEFT',
    Right = 'RIGHT',
    Up = 'UP',
    Down = 'DOWN',
}

type Sequence = Direction[]

const Sequences = {
	Left: [Direction.Left],
	Konami: [
		Direction.Up,
		Direction.Up,
		Direction.Down,
		Direction.Down,
		Direction.Left,
		Direction.Right,
		Direction.Left,
		Direction.Right,
	],
}


const controller = container => {
	const onLeft = new Subject()
	const onRight = new Subject()
	const onUp = new Subject()
	const onDown = new Subject()

	return combineProps(
		{ },
		{ onLeft, onRight, onUp, onDown },
	)
}

export const SequenceDetector = props => {
	const state = useRxController(controller, props)
	if (!state) return <RED />

	const {
		onLeft, onRight, onUp, onDown,
	} = state

	return (
		<SafeAreaView style={{ alignItems: 'center', marginTop: 200 }}>
			<View style={{ height: 200, width: 300 }}>
				<View style={{ position: 'absolute', top: 0, left: 150 }}><Button onPress={onUp} title='up' /></View>
				<View style={{ position: 'absolute', bottom: 0, left: 150 }}><Button onPress={onDown} title='down' /></View>
				<View style={{ position: 'absolute', left: 0, top: 100 }}><Button onPress={onLeft} title='left' /></View>
				<View style={{ position: 'absolute', right: 0 , top: 100 }}><Button onPress={onRight} title='right' /></View>
			</View>
			<View style={{ alignItems: 'center' }}>
			</View>
		</SafeAreaView>
	)
}
