import { TestScheduler } from 'rxjs/testing'


export const booleanMap = {
	t: true,
	f: false,
}

export const numberMap = {
	0: 0,
	1: 1,
	2: 2,
	3: 3,
	4: 4,
	5: 5,
	6: 6,
	7: 7,
	8: 8,
	9: 9,
}

export const voidMap = {
	o: null,
	x: null,
	v: null,
}

export const getTestScheduler = () => new TestScheduler((actual, expected) =>
	expect(actual).toEqual(expected)
)
