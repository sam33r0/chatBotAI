import React from 'react'
import { Text } from '@chakra-ui/react'


function Message({
    textElement="Hello Welcome to ChatBot AI"
}) {
  return (
    <>
    <Text
        ml="5%" mr="5%"
        bgGradient="linear(to-l, #FF4500, #00FA9A)"
        bgClip="text"
        fontSize="2xl"
        fontWeight="extrabold"
        >
            {textElement}          
    </Text>
    </>
  )
}

export default Message