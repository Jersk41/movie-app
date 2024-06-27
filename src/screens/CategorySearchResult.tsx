import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { Genre, Movie, CategorySearchResultScreenProps } from '../types/app'
import { API_ACCESS_TOKEN } from '@env'
import MovieItem from '../components/movies/MovieItem'

const CategorySearchResult = ({
  route,
}: CategorySearchResultScreenProps): React.JSX.Element => {
  const genre: Genre = route.params.genre
  const [movies, setMovies] = useState<Movie[]>([])

  const getMovieByGenre = (): void => {
    const query = `?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genre.id}`
    const url = `https://api.themoviedb.org/3/discover/movie${query}`
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    }
    fetch(url, options)
      .then(async (response) => await response.json())
      .then((response) => {
        if (response.results.length > 0) {
          setMovies(response.results)
        }
      })
      .catch((errorResponse) => {
        console.error(errorResponse)
      })
  }

  useEffect(() => {
    getMovieByGenre()
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Result of {genre.name} Genre</Text>
      </View>
      <FlatList
        style={{
          ...styles.movieList,
        }}
        showsVerticalScrollIndicator={true}
        horizontal={false}
        numColumns={3}
        data={movies}
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
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    width: '100%',
  },
  header: {
    marginVertical: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
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

export default CategorySearchResult
