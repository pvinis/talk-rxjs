import React from 'react'
import { createAppContainer, FlatList } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { Appearance, AppearanceProvider, useColorScheme } from 'react-native-appearance'
import { Button } from 'react-native'

import { Count } from './src/Count'
import { SteppedCount } from './src/SteppedCount'
import { SequenceDetector } from './src/SequencerDetector'


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

const Navigation = createAppContainer(AppNavigator)

const App = () => {
	const theme = useColorScheme()

	return (
		<AppearanceProvider>
			<Navigation theme={theme} />
		</AppearanceProvider>
	)
}

export default App
