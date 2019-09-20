import React from 'react'
import { createAppContainer, FlatList } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import { Count } from './src/Count'
import { SteppedCount } from './src/SteppedCount'
import { SequenceDetector } from './src/SequencerDetector'
import { Button } from 'react-native'


const List = (props) => (
	<>
		<Button title='Count' onPress={() => props.navigation.navigate('Count')} />
		<Button title='Stepped Count' onPress={() => props.navigation.navigate('SteppedCount')} />
		<Button title='Sequence Detector' onPress={() => props.navigation.navigate('SequenceDetector')} />
	</>
)

const AppNavigator = createStackNavigator({
	List: { screen: List },
	Count: { screen: Count },
	SteppedCount: { screen: SteppedCount },
	SequenceDetector: { screen: SequenceDetector },
})

export default createAppContainer(AppNavigator)
