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
  View,
  Text,
  Image,
  StatusBar,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Button,
  Dimensions,
} from 'react-native';

import {getStockQuote, getStockCandles} from './services/finnhub/stocks';
import {CleanCandleData} from './interfaces/finnhub.interface';

import {styles} from './styles.global';
import CurrentPrice from './components/CurrentPrice';
import CandleChart from './components/CandleChart';
import ImageLoader from './components/ImageLoader';

const App = () => {
  const [candles, setCandles] = useState<CleanCandleData>({
    data: [],
    highest: 0,
    lowest: 0,
  });
  const [quote, setQuote] = useState({current: 0, previous: 0, timestamp: 0});
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => refresh(), []);

  const refresh = () => {
    const fetchData = async () => {
      setRefreshing(true);
      await refreshCandles();
      await refreshQuote();
      setRefreshing(false);
    };
    fetchData();
  };

  const refreshCandles = async () => {
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
        <ScrollView
          contentContainerStyle={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={refresh} />
          }>
          <ImageLoader
            source={require('./assets/stonks-viewer.jpeg')}
            resizeMode="cover"
            style={{
              flex: 1,
              maxHeight: Dimensions.get('screen').height * 0.4,
              maxWidth: Dimensions.get('screen').width,
            }}
          />
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>AMZN</Text>
            {!refreshing || quote.current > 0 ? (
              <CurrentPrice quote={quote} />
            ) : (
              <ActivityIndicator />
            )}
            {!refreshing || candles.data.length > 0 ? (
              <CandleChart candles={candles} />
            ) : (
              <ActivityIndicator size="large" />
            )}
            {!refreshing && (
              <Button
                onPress={refresh}
                title="Refresh"
                color="#201584"
                accessibilityLabel="Refresh stock data"
              />
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default App;
