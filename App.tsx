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
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import moment from 'moment';

import {DataObject, QuoteObject} from './src/interfaces/app.interface';

const finnhub = require('finnhub');

const App = () => {
  const [data, setData] = useState({});
  const [current, setCurrent] = useState(0);

  const api_key = finnhub.ApiClient.instance.authentications['api_key'];
  api_key.apiKey = 'c13io2748v6rj20aijf0';
  const finnhubClient = new finnhub.DefaultApi();

  useEffect(() => refresh(), []);

  const refresh = () => {
    refreshData();
    refreshQuote();
  };

  const refreshData = () =>
    finnhubClient.stockCandles(
      'AMZN', // Symbol
      'D', // resolution
      moment().subtract(1, 'week').unix(), //from timestamp
      moment().unix(), //to timestamp
      {},
      (error: Error, data: DataObject) => {
        const normalisedData = data.t.map(
          (timestamp: number, index: number) => ({
            values: {
              shadowH: data.h[index],
              shadowL: data.l[index],
              open: data.o[index],
              close: data.c[index],
            },
            label: moment.unix(timestamp).format('DD/MM/YYYY'),
          })
        );
        console.log(normalisedData);
        setData(normalisedData);
      }
    );

  const refreshQuote = () =>
    finnhubClient.quote('AMZN', (error: Error, data: QuoteObject) => {
      console.log('current', data);
      setCurrent(data.c);
    });

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Stonks Watcher</Text>
            <Text style={styles.sectionDescription}>
              Current AMZN: ${current}
            </Text>
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
    backgroundColor: 'pink',
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
