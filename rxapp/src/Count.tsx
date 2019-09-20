import React from 'react'
import { Text, Button, SafeAreaView } from 'react-native'
import { of, Subject, merge } from 'rxjs'
import { combineProps, useRxController } from 'rx-react-container'
import { map, scan, switchMap, startWith } from 'rxjs/operators'

import { RED } from './RED'


const CountController = container => {
	const onMinus = new Subject()
	const onPlus = new Subject()

	const click = merge(
		onMinus.pipe(map(() => -1)),
		onPlus.pipe(map(() => +1))
	)
	const step = of(1)

	const totalCount = step.pipe(
		switchMap(step => click.pipe(map(v => v * step))),
		startWith(0),
		scan((acc, x) => acc + x, 0)
	)


	return combineProps(
		{ totalCount },
		{ onMinus, onPlus },
	)
}

export const Count = props => {
	const state = useRxController(CountController, props)
    if (!state) return <RED />

	const { onMinus, onPlus, totalCount } = state

	return (
		<SafeAreaView style={{ alignItems: 'center' , marginTop: 200 }}>
			<Text>{totalCount}</Text>
			<Button onPress={onPlus} title='more' />
			<Button onPress={onMinus} title='less' />
		</SafeAreaView>
	)
}
