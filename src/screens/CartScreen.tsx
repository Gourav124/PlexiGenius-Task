import { View, Text } from 'react-native'
import React from 'react'
import colors from '../theme/colors'

const CartScreen = () => {
  return (
    <View style={{flex:1, justifyContent:'center', alignItems:'center',backgroundColor:colors.primary}}>
      <Text style = {{color:'#fff'}}>Cart Screen</Text>
    </View>
  )
}

export default CartScreen