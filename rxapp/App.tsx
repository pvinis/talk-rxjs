import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';
import {  of, Subject, merge } from 'rxjs';
import { connect, combineProps, useRxController } from 'rx-react-container';
import { map, scan, switchMap, startWith } from 'rxjs/operators';


  function appController(container) {
    const onMinus = new Subject();
    const onPlus = new Subject();

    const click = merge(
      onMinus.pipe(map(() => -1)),
      onPlus.pipe(map(() => +1))
    );
    const step = of(1)

    const totalCount = step.pipe(
      switchMap(step => click.pipe(map(v => v * step))),
      startWith(0),
      scan((acc, x) => acc + x, 0)
    );

    return combineProps(
      { totalCount , },
      { onMinus , onPlus  }
    );
  }

 export default function App(props) {
    const state = useRxController(appController, props);
    if(!state) return null;
    const { onMinus, onPlus, totalCount, } = state;
    return (
        <View style={{marginTop: 100}}>
        <Button onPress={onMinus} title='-' />
        <Text>{totalCount}</Text>
        <Button onPress={onPlus} title='+' />
      </View>
    );
  }
