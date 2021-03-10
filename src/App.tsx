/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  ScrollView,
  Dimensions,
} from 'react-native';
import {
  VictoryCandlestick,
  VictoryChart,
  VictoryTooltip,
  VictoryTheme,
} from 'victory-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {getStockQuote, getStockCandles} from './services/finnhub/stocks';
import {percentageChange} from './utils/finnhub.utils';
import Svg from 'react-native-svg';

const App = () => {
  const [data, setData] = useState([]);
  const [quote, setQuote] = useState({current: 0, previous: 0, timestamp: 0});

  useEffect(() => refresh(), []);

  const refresh = () => {
    refreshData();
    refreshQuote();
  };

  const refreshData = async () => {
    try {
      const candleData = await getStockCandles('AMZN');
      setData(candleData);
    } catch (error) {
      console.log('Opps:', error);
    }
  };

  const refreshQuote = async () => {
    try {
      const quoteData = await getStockQuote('AMZN');
      setQuote(quoteData);
    } catch (error) {
      console.log('Opps:', error);
    }
  };

  const percentChange = percentageChange(quote.current, quote.previous);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>AMZN Stonks Watcher</Text>
            <Text style={styles.sectionDescription}>
              Current: ${quote.current}
            </Text>
            <Text style={styles.sectionDescription}>
              Previous: ${quote.previous}
            </Text>
            <Text style={styles.sectionDescription}>
              {percentChange == 0 && 'No change'}
              {percentChange > 0 && `YAY up ${percentChange}%`}
              {percentChange < 0 && `BOO down ${percentChange}%`}
            </Text>
            <VictoryChart
              width={Dimensions.get('screen').width * 0.9}
              scale={{x: 'time'}}
              theme={VictoryTheme.material}>
              <VictoryCandlestick
                data={data}
                candleColors={{positive: 'green', negative: 'red'}}
                lowLabels={({datum}) => Math.round(datum.low)}
                lowLabelComponent={<VictoryTooltip pointerLength={0} />}
                labelOrientation={{
                  close: 'right',
                  open: 'right',
                  high: 'top',
                  low: 'bottom',
                }}
                events={[
                  {
                    target: 'data',
                    eventHandlers: {
                      onClick: () => ({
                        target: 'lowLabels',
                        mutation: () => ({active: true}),
                      }),
                    },
                  },
                ]}
              />
            </VictoryChart>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
});

export default App;
