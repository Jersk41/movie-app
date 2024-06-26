import React from 'react'
import { Text, View } from 'react-native'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MovieDetail = ({ route }: any): React.JSX.Element => {
  const { id } = route.params

  return (
    <View
      style={{
        display: 'flex',
        alignItems: 'center',
        marginTop: 32,
      }}
    >
      <Text style={{ fontSize: 30 }}>Movie ID: {id}</Text>
    </View>
  )
}

export default MovieDetail
