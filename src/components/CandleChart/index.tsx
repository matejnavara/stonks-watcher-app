import React from 'react';
import {Dimensions} from 'react-native';
import {
  VictoryCandlestick,
  VictoryChart,
  VictoryLabel,
  VictoryTheme,
} from 'victory-native';

import {CleanCandleData} from '../../interfaces/finnhub.interface';

interface Props {
  candles: CleanCandleData;
}

const CandleChart = (props: Props) => {
  const {candles} = props;
  return (
    <VictoryChart
      width={Dimensions.get('screen').width * 0.95}
      height={Dimensions.get('screen').height * 0.5}
      minDomain={{y: candles.lowest - 20}}
      maxDomain={{y: candles.highest + 40}}
      scale={{x: 'time'}}
      theme={VictoryTheme.material}>
      <VictoryCandlestick
        data={candles.data}
        candleColors={{positive: 'green', negative: 'red'}}
        highLabels={({datum}) => Math.round(datum.high)}
        highLabelComponent={<VictoryLabel />}
        lowLabels={({datum}) => Math.round(datum.low)}
        lowLabelComponent={<VictoryLabel />}
        labelOrientation={{
          close: 'right',
          open: 'right',
          high: 'top',
          low: 'bottom',
        }}
        style={{
          labels: {fill: 'tomato', padding: 2},
          closeLabels: {fill: 'blue', padding: 2},
          highLabels: {fill: 'green', padding: 2},
          lowLabels: {fill: 'red', padding: 2},
          openLabels: {fill: 'blue', padding: 2},
        }}
      />
    </VictoryChart>
  );
};

export default CandleChart;
