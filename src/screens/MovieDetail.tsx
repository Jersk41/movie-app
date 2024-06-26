import React from 'react'
import {
  ImageBackground,
  Text,
  StyleSheet,
  View,
  ScrollView,
} from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import MovieList from '../components/movies/MovieList'
import { MovieDetailScreenProps } from '../types/app'
import FavoriteSwitch from '../components/FavoriteSwitch'

const MovieDetail = ({ route }: MovieDetailScreenProps): React.JSX.Element => {
  const movie = route.params.data

  return (
    <ScrollView style={{ overflow: 'visible' }}>
      <View>
        <ImageBackground
          resizeMode="cover"
          style={styles.coverImage}
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
          }}
        >
          <LinearGradient
            colors={['#00000000', 'rgba(0, 0, 0, 0.7)']}
            locations={[0.6, 0.8]}
            style={styles.gradientStyle}
          >
            <Text style={styles.movieTitle}>{movie.title}</Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
              }}
            >
              <View style={styles.ratingContainer}>
                <FontAwesome name="star" size={16} color={'yellow'} />
                <Text style={styles.rating}>{movie.vote_average}</Text>
              </View>
              <FavoriteSwitch movie={movie} />
            </View>
          </LinearGradient>
        </ImageBackground>
      </View>
      <View style={styles.metaContainer}>
        <Text>{movie.overview}</Text>
        <View style={styles.metaContent}>
          <View style={styles.metaItem}>
            <Text style={styles.metaItemTitle}>Original Language:</Text>
            <Text>{movie.original_language}</Text>
            <Text style={[styles.metaItemTitle, { marginTop: 4 }]}>
              Release Date:
            </Text>
            <Text>{movie.release_date.toString()}</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.metaItemTitle}>Popularity:</Text>
            <Text>{movie.popularity}</Text>
            <Text style={[styles.metaItemTitle, { marginTop: 4 }]}>
              Vote Count:
            </Text>
            <Text>{movie.vote_count}</Text>
          </View>
        </View>
      </View>
      <MovieList
        title={'Recommendation'}
        path={`movie/${movie.id}/recommendations`}
        coverType={'poster'}
        key={movie.title}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  movieTitle: {
    color: 'white',
    marginBottom: 4,
    fontSize: 16,
  },
  coverImage: {
    width: '100%',
    aspectRatio: '16/9',
  },
  gradientStyle: {
    padding: 16,
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  rating: {
    color: 'yellow',
    fontWeight: '700',
  },
  metaContainer: {
    padding: 16,
    marginBottom: 4,
  },
  metaContent: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 8,
  },
  metaItem: {
    flexGrow: 1,
  },
  metaItemTitle: {
    fontWeight: 'bold',
  },
  recommendationContainer: {
    marginTop: 32,
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 16,
  },
})

export default MovieDetail
