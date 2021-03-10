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
  ActivityIndicator,
} from 'react-native';

import {getStockQuote, getStockCandles} from './services/finnhub/stocks';
import {CleanCandleData} from './interfaces/finnhub.interface';

import CurrentPrice from './components/CurrentPrice';
import CandleChart from './components/CandleChart';

const App = () => {
  const [candles, setCandles] = useState<CleanCandleData>({
    data: [],
    highest: 0,
    lowest: 0,
  });
  const [quote, setQuote] = useState({current: 0, previous: 0, timestamp: 0});

  useEffect(() => refresh(), []);

  const refresh = () => {
    refreshData();
    refreshQuote();
  };

  const refreshData = async () => {
    try {
      const candleData = await getStockCandles('AMZN');
      setCandles(candleData);
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

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>AMZN Stonks Watcher</Text>
            {quote.current > 0 ? (
              <CurrentPrice quote={quote} />
            ) : (
              <ActivityIndicator />
            )}
            {candles.data.length > 0 ? (
              <CandleChart candles={candles} />
            ) : (
              <ActivityIndicator size="large" />
            )}
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
    color: 'black',
  },
});

export default App;
