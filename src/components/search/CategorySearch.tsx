import React, { useEffect, useState } from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { API_ACCESS_TOKEN } from '@env'
import { Genre } from '../../types/app'
import { useNavigation, StackActions } from '@react-navigation/native'

const CategorySearch = (): React.JSX.Element => {
  const [categories, setCategories] = useState<Genre[]>()
  const [selectedCategory, setSelectedCategory] = useState<Genre>()

  useEffect(() => {
    const url = 'https://api.themoviedb.org/3/genre/movie/list?language=en'
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    }

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        setCategories(json.genres)
        console.log(categories, categories?.length)
      })
      .catch((err) => console.error('error:' + err))
    return () => console.debug('Data fetching cancelled')
  }, [])

  const navigation = useNavigation()
  const pushAction = StackActions.push('CategorySearchResult', {
    genre: selectedCategory,
  })

  return (
    <View style={styles.container}>
      <FlatList
        style={{
          ...styles.categoryList,
        }}
        data={categories}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              ...styles.categoryItem,
              backgroundColor:
                selectedCategory?.id === item.id ? '#8978A4' : '#C0B4D5',
            }}
            onPress={() => setSelectedCategory(item)}
            key={item.id}
          >
            <Text key={item.id.toString()} style={styles.categoryText}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
      />
      <TouchableOpacity
        style={styles.searchButton}
        onPress={() => {
          navigation.dispatch(pushAction)
        }}
      >
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    width: '100%',
    padding: 8,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  categoryList: {
    display: 'flex',
    width: '100%',
    gap: 4,
    marginTop: 4,
  },
  categoryItem: {
    flexShrink: 1,
    flexBasis: '50%',
    borderRadius: 10,
    margin: 6,
    padding: 10,
  },
  categoryText: {
    fontSize: 16,
    textAlign: 'center',
  },
  searchButton: {
    borderRadius: 25,
    padding: 16,
    margin: 8,
    backgroundColor: '#8978A4',
  },
  searchButtonText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
})

export default CategorySearch
