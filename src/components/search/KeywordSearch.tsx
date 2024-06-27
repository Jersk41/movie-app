import React, { useEffect, useState } from 'react'
import {
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { API_ACCESS_TOKEN } from '@env'
import { Movie } from '../../types/app'
import MovieItem from '../movies/MovieItem'

const KeywordSearch = (): React.JSX.Element => {
  const [keyword, setKeyword] = useState<string>()
  const [movies, setMovies] = useState<Movie[]>([])

  const getMovieWithQuery = (): void => {
    const query = `?query=${keyword ? keyword.trim().normalize() : ''}&include_adult=false&language=en-US&page=1`
    const url = `https://api.themoviedb.org/3/search/movie${query}`
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
    getMovieWithQuery()

    return () => setKeyword('')
  }, [])

  const submitEvent = (): void => {
    getMovieWithQuery()
  }

  return (
    <View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Input title movie here"
          onChangeText={setKeyword}
          onSubmitEditing={() => submitEvent()}
        />
        <TouchableOpacity style={styles.searchIcon}>
          <FontAwesome name="search" size={20} color={'#444'} />
        </TouchableOpacity>
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
  inputContainer: {
    marginVertical: 8,
    width: '100%',
    borderRadius: 100,
    padding: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    alignItems: 'center',
    backgroundColor: 'lightgrey',
    borderBottomColor: 'darkblue',
  },
  textInput: {
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
    lineHeight: 24,
    flexBasis: '90%',
  },
  searchIcon: {
    flexBasis: '10%',
    width: 24,
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

export default KeywordSearch
