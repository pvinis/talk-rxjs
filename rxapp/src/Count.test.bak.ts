import { cold } from 'jest-marbles'

import { getTestScheduler, voidMap, numberMap } from './test-helpers'
import { controller } from './Count'


/* eslint-disable no-multi-spaces */

describe('count', () => {
	it('counts to four', () => {
		const testScheduler = getTestScheduler()
		testScheduler.run(({ cold, expectObservable, flush }) => {
			const onPlus =  cold('--x-x-xx', voidMap)
			const onMinus = cold('--------', voidMap)
			const expected =     '0-1-2-34'

			const cont = controller(null, { onPlus, onMinus  })
			const output = cont.output.count
			expectObservable(output).toBe(expected, numberMap)
		})
	})
	it('counts to four again', () => {
		const onPlus =   cold('-x-x-xx-xx', voidMap)
		const onMinus =  cold('--x-x-----', voidMap)
		const expected = cold('0101012-34', numberMap)

		const cont = controller(null, { onPlus, onMinus  })
		const output = cont.output.count
		expect(output).toBeObservable(expected)
	})
})
