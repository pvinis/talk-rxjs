import React from 'react'
import { Text, Button, SafeAreaView } from 'react-native'
import { Subject, merge } from 'rxjs'
import { combineProps, useRxController } from 'rx-react-container'
import { map, scan, startWith } from 'rxjs/operators'

import { RED } from './RED'


export const controller = (container, input = {
	onPlus: new Subject(),
	onMinus: new Subject(),
}) => {
	const { onPlus, onMinus } = input

	const count = merge(
		onPlus.pipe(map(() => +1)),
		onMinus.pipe(map(() => -1)),
	).pipe(
		scan((acc, x) => acc + x, 0),
		startWith(0),
	)

	return {
		input: { onPlus, onMinus },
		output: { count },
	}
}

const useMyRxController = (bareController, props) => {
	const controller = (container) => {
		const bc = bareController(container)
		return combineProps(bc.output, bc.input)
	}
	return useRxController(controller, props)
}


export const Count = props => {
	const state = useMyRxController(controller, props)
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
