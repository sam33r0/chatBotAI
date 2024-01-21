import { useEffect, useRef, useState } from 'react'
import { useForm } from "react-hook-form";
import {
  Box,
  Text,
  Input,
  Button
} from "@chakra-ui/react"
import Message from './Component/Message';
import OpenAI from "openai"
function App() {
  const scrRef = useRef(null);
  const openai = new OpenAI({ apiKey: import.meta.env.VITE_OPENAIKEY, dangerouslyAllowBrowser: true });
  //console.log(api_key);
  const [message, setMessage] = useState([{
    role: "assistant",
    content: "I am an AI assistant and I am here to help you. How may I assist you today?",
  }]);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      content: ""
    },
  });
  const submit = async (data) => {
    message.push({
      role: "user",
      content: data.content,
      
    })
    setMessage(message);
    reset();
    try {
      const completion = await openai.chat.completions.create({
        messages: message,
        model: "gpt-3.5-turbo",
      });
      message.push({
        role:'assistant',
        content: completion.choices[0].message.content,
      })
      setMessage(message);
      reset();
    }
    catch (error) {
      console.log(error);
    }
    scrRef.current?.scrollIntoView({ behavior: 'smooth' });
  }
  return (
    <>
      <Box position="sticky"
        top="0"
        background="#38246c"
        zIndex={100}
      >
        <Text
          bgGradient="linear(to-l, #FF4500, #00FA9A)"
          bgClip="text"
          fontSize="5xl"
          fontWeight="extrabold"
          textAlign="center"
        >
          ChatBot AI
        </Text>
      </Box>
      <div >
        <Box >
          <Box mb="5%" ml="5%" mr="5%" display="flex" flexFlow="column"
            flexDirection="column"
            gridGap={2} justifyContent="flex-start" >
            {message.map((elem) => (
              elem.role == 'user'
                ?
                <Box
                  maxWidth="70%"
                  px="1"
                  py="1"
                  bg="#D8BFD8"
                  position="relative"
                  left="30%"
                  m="1"
                  rounded="30"
                  textAlign="right"
                  key={Math.random()}>
                  <Message textElement={elem.content} />
                </Box>
                :
                <Box
                  px="1"
                  py="1"
                  maxWidth="70%"
                  bg="#FFF5EE"
                  position="relative"
                  m="1"
                  rounded="30"
                  textAlign="left"
                  key={Math.random()}>
                  <Message textElement={elem.content} />
                </Box>
            ))}
          </Box>
          <Box mt="20%" ref={scrRef}></Box>
          <Box display="flex" justifyContent="space-between" position="sticky">
            <form onSubmit={handleSubmit(submit)} >
              <Input
                {...register("content", { required: true })}
                background="black"
                textColor="white"
                ml="5%"
                width="80%"
                focusBorderColor='lime'
                variant='solid'
                pos="fixed" bottom="0"
                placeholder='Enter Your Message'
                size="md" />

              <Button type="submit" mr="5%" width="10%" pos="fixed" right="0" bottom="0" colorScheme='teal' variant='solid' >
                SEND
              </Button>
            </form>
          </Box>

        </Box>
      </div>
    </>
  )
}

export default App
