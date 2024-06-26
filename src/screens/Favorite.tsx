import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import MovieItem from '../components/movies/MovieItem'
import { Movie } from '../types/app'

const Favorite = (): React.JSX.Element => {
  const [refreshing, setRefreshing] = useState(true)
  const [favoriteList, setFavoriteList] = useState<Movie[]>()
  const getFavoriteList = async () => {
    try {
      const storedData = await AsyncStorage.getItem('@FavoriteList')
      if (storedData) {
        const data: Movie[] = JSON.parse(storedData)
        setFavoriteList(data)
        setRefreshing(false)
      }
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getFavoriteList()
  }, [])

  return (
    <View>
      {refreshing ? <ActivityIndicator /> : null}
      {favoriteList ? (
        <FlatList
          style={{
            ...styles.movieList,
          }}
          showsVerticalScrollIndicator={true}
          horizontal={false}
          numColumns={3}
          data={favoriteList}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={getFavoriteList}
            />
          }
          renderItem={({ item }) => (
            <MovieItem
              movie={item}
              key={item.id.toString()}
              size={styles.posterCoverImageSize}
              coverType={'poster'}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <Text style={styles.notFoundText}>
          {"No recommendation founded :'("}
        </Text>
      )}
    </View>
  )
}
const styles = StyleSheet.create({
  movieList: {
    paddingHorizontal: 8,
    marginHorizontal: 'auto',
    marginVertical: 8,
  },
  posterCoverImageSize: {
    width: 100,
    height: 160,
  },
  notFoundText: {
    color: 'darkred',
    fontSize: 20,
    display: 'flex',
    alignSelf: 'center',
    marginTop: 24,
  },
})
export default Favorite
