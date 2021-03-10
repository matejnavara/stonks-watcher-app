import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {CleanQuoteData} from '../../interfaces/finnhub.interface';
import {percentageChange} from '../../utils/finnhub.utils';

import Emoji from '../Emoji';

interface Props {
  quote: CleanQuoteData;
}

const CandleChart = (props: Props) => {
  const {quote} = props;
  const percentChange = percentageChange(quote.current, quote.previous);

  let color = 'black';
  let changeComp = <Text>No Change</Text>;
  if (percentChange > 0) {
    color = 'green';
    changeComp = (
      <Text style={{...styles.infoText, color: color}}>
        Noice. Up {percentChange}% <Emoji label="stocks up" symbol="📈" />
      </Text>
    );
  }
  if (percentChange < 0) {
    color = 'red';
    changeComp = (
      <Text style={{...styles.infoText, color: color}}>
        Oh no. Down {percentChange}% <Emoji label="stocks down" symbol="📉" />
      </Text>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={{...styles.currentPrice, color: color}}>
        ${quote.current}
      </Text>
      <Text style={styles.infoText}>Previous close: ${quote.previous}</Text>
      {changeComp}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  currentPrice: {
    fontSize: 30,
  },
  infoText: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: 'gray',
  },
});

export default CandleChart;
