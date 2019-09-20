import React from 'react'
import { View, Text, Button, SafeAreaView } from 'react-native'
import { Subject, merge } from 'rxjs'
import { combineProps, useRxController } from 'rx-react-container'
import { map, scan, startWith, withLatestFrom } from 'rxjs/operators'

import { RED } from './RED'


const controller = container => {
	const onPlus = new Subject()
	const onMinus = new Subject()
	const onStepPlus = new Subject()
	const onStepMinus = new Subject()

	const step = merge(
		onStepPlus.pipe(map(() => +1)),
		onStepMinus.pipe(map(() => -1)),
	).pipe(
		scan((acc, x) => acc + x, 0),
		startWith(0),
    )

	const count = merge(
		onPlus.pipe(map(() => +1)),
        onMinus.pipe(map(() => -1)),
	).pipe(
        withLatestFrom(step),
        map(([sign, step]) => sign * step),
		scan((acc, x) => acc + x, 0),
		startWith(0),
	)

	return combineProps(
		{ count, step },
		{ onPlus, onMinus, onStepPlus, onStepMinus },
	)
}

export const SteppedCount = props => {
	const state = useRxController(controller, props)
	if (!state) return <RED />

	const {
        onStepPlus, onStepMinus, step,
        onPlus, onMinus, count,
    } = state

	return (
		<SafeAreaView style={{ flexDirection: 'row', justifyContent: 'center',  marginTop: 200 }}>
		    <View style={{ alignItems: 'center' }}>
	    		<Text>step</Text>
	    		<Text>{step}</Text>
	    		<Button onPress={onStepPlus} title='more' />
	    		<Button onPress={onStepMinus} title='less' />
            </View>
    		<View style={{ alignItems: 'center' }}>
    			<Text>count</Text>
    			<Text>{count}</Text>
    			<Button onPress={onPlus} title='more' />
    			<Button onPress={onMinus} title='less' />
            </View>
		</SafeAreaView>
	)
}
