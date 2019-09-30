import React from 'react'
import { Text, Button, SafeAreaView } from 'react-native'
import { Subject, merge } from 'rxjs'
import { combineProps, useRxController } from 'rx-react-container'
import { map, scan, startWith } from 'rxjs/operators'

import { RED } from './RED'


const controller = container => {
	const onPlus = new Subject()
	const onMinus = new Subject()

	const count = merge(
		onPlus.pipe(map(() => +1)),
		onMinus.pipe(map(() => -1)),
	).pipe(
		scan((acc, x) => acc + x, 0),
		startWith(0),
	)

	return combineProps(
		{ count },
		{ onPlus, onMinus },
	)
}

export const Count = props => {
	const state = useRxController(controller, props)
	if (!state) return <RED />

	const { onPlus, onMinus, count } = state

	return (
		<SafeAreaView style={{ alignItems: 'center', marginTop: 200 }}>
			<Text>count</Text>
			<Text>{count}</Text>
			<Button onPress={onPlus} title='more' />
			<Button onPress={onMinus} title='less' />
		</SafeAreaView>
	)
}
