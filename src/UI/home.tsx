import { HStack, VStack, Input, Text, Textarea, Grid, GridItem} from "@chakra-ui/react"
import { Field } from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import { FaUser } from "react-icons/fa";
import './App.css'
import { textToSpeechApi } from '@/services/tos';
import { authApi } from '@/services/auth';
import { useState, useCallback } from 'react';
import { Outlet, useNavigate} from "react-router-dom";


function Home() {
  const max_chars = import.meta.env.VITE_MAX_CHARS_PER_USER
  const [manText, setManText] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [charactersLeft, setCharacterLeft] = useState(max_chars)
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');
  
  const navigate = useNavigate()

  const playNoise = async () => {
    try {
      console.log(manText)
      const response = await textToSpeechApi.tos(manText)
      const audioBlob = await response.blob();
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
    } catch (err) {
      console.error('Audio error:', err);
      setError('Error trying to convert Text to Speech')
      setIsPlaying(false);
    }
  };
  function signOut() {
    try {
      authApi.signout()
      navigate('/login')
    } catch (err) {
      setError('Error signing out')
    }
  }
  function updateText(text: string) {
    setCharacterLeft(max_chars - text.length)
    setManText(text)
  }
  function handleChange(text:string) {
    setManText(text)
  }
      return (
        <>
        <Grid templateColumns="repeat(2, 1fr)">
          <GridItem>
          <Text>Trends</Text>
          </GridItem>
          <GridItem>
          <VStack gap="4" width={400}>
            <h1><b>Manifest</b></h1>
            <HStack>
            </HStack>
            <Textarea placeholder='Write your manifestation here...' onChange={(e) => updateText(e.target.value)} />

            {audioUrl && <audio src={audioUrl} controls />}
            <HStack>
            <Button loading={loading} onClick={playNoise}>Listen</Button>
            <Button loading={loading} onClick={playNoise}>Read</Button>
            {(charactersLeft < 21) && <Text color='red'>{charactersLeft}/{max_chars} characters Left</Text>}
            </HStack>
            {error && <Text color='red'>{error}</Text>}
            <Button colorPalette='red' variant="subtle" size='lg' onSubmit={signOut}>
              <FaUser /> <h2>Logout</h2>
            </Button>
            
          </VStack>
          </GridItem>
          </Grid>
          <Outlet/>
        </>
      )
    }

export default Home
