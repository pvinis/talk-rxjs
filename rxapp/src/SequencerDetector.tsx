import React from 'react'
import { View, Text, Button, SafeAreaView } from 'react-native'
import R from 'ramda'
import { Subject, merge, Observable } from 'rxjs'
import { combineProps, useRxController } from 'rx-react-container'
import { map, scan, startWith, withLatestFrom } from 'rxjs/operators'

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
	const onReset = new Subject()
	// const onDirection = new Subject()

	const direction: Observable<Direction> = merge(
		onLeft.pipe(map(() => Direction.Left)),
		onRight.pipe(map(() => Direction.Right)),
		onUp.pipe(map(() => Direction.Up)),
		onDown.pipe(map(() => Direction.Down)),
	)

	const sequenceSoFar: Observable<Sequence> = merge(
		direction,
		onReset.pipe(map(() => null))
	).pipe(
		scan((acc, direction) => {
			if (direction === null) return []
			return R.concat(acc, [direction])
		}, [] as Sequence),
		startWith([]),
	)

	const recognizedSequence = sequenceSoFar.pipe(
		map(seq => {
			if (R.equals(seq, Sequences.Konami)) return 'Konami'
			if (R.equals(seq, Sequences.Left)) return 'Left!'
			return ''
		})
	)

	return combineProps(
		{ sequenceSoFar, recognizedSequence },
		{ onLeft, onRight, onUp, onDown, onReset },
	)
}

export const SequenceDetector = props => {
	const state = useRxController(controller, props)
	if (!state) return <RED />

	const {
		onLeft, onRight, onUp, onDown, onReset,
		sequenceSoFar, recognizedSequence,
		// some callback to do somethins
	} = state

	return (
		<SafeAreaView style={{ alignItems: 'center', marginTop: 200 }}>
			<View style={{ height: 200, width: 300 }}>
				<View style={{ position: 'absolute', top: 0, left: 150 }}><Button onPress={onUp} title='up' /></View>
				<View style={{ position: 'absolute', bottom: 0, left: 150 }}><Button onPress={onDown} title='down' /></View>
				<View style={{ position: 'absolute', left: 0, top: 100 }}><Button onPress={onLeft} title='left' /></View>
				<View style={{ position: 'absolute', right: 0 , top: 100 }}><Button onPress={onRight} title='right' /></View>
				<View style={{ position: 'absolute', left: 150, top: 100 }}><Button onPress={onReset} title='reset' /></View>
			</View>
			<View style={{ alignItems: 'center' }}>
				<Text>sequenceSoFar</Text>
				<Text>{sequenceSoFar.join(', ')}</Text>
				<Text>recognizedSequence</Text>
				<Text>{recognizedSequence}</Text>
			</View>
		</SafeAreaView>
	)
}
