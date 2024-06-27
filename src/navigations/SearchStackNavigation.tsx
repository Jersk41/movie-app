import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MovieDetail from '../screens/MovieDetail'
import { SearchStackParamList } from '../types/app'
import Search from '../screens/Search'
import SearchResult from '../screens/CategorySearchResult'

const Stack = createNativeStackNavigator<SearchStackParamList>()

const SearchStackNavigator = (): React.JSX.Element => {
  return (
    <Stack.Navigator initialRouteName="SearchScreen">
      <Stack.Screen
        name="SearchScreen"
        component={Search}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="CategorySearchResult" component={SearchResult} />
      <Stack.Screen name="MovieDetail" component={MovieDetail} />
    </Stack.Navigator>
  )
}

export default SearchStackNavigator
