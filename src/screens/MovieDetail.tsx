import React from 'react'
import { View, Text, Button } from 'react-native'

export default function MovieDetail({ navigation }): React.JSX.Element {
  return (
    <View style={{ alignSelf: 'center', marginTop: '50%' }}>
      <Text style={{ marginBottom: 8 }}>Ini adalah halaman detail movie</Text>
      <Button
        title="Back"
        onPress={() => {
          navigation.navigate('MovieScreen')
        }}
      />
    </View>
  )
}
