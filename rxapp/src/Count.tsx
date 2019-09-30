import React from 'react'
import { Text, Button, SafeAreaView } from 'react-native'
import { Subject, merge } from 'rxjs'
import { combineProps, useRxController } from 'rx-react-container'
import { map, scan, startWith } from 'rxjs/operators'

import { RED } from './RED'


const controller = container => {
}

export const Count = props => {
	return (
		<SafeAreaView style={{ alignItems: 'center', marginTop: 200 }}>
		</SafeAreaView>
	)
}
