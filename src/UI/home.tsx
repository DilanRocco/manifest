import { HStack, VStack, Input, Text, Textarea, Grid, GridItem, Heading} from "@chakra-ui/react"
import { Field } from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import { FaUser } from "react-icons/fa";
import './App.css'
import { textToSpeechApi } from '@/services/tos';
import { authApi } from '@/services/auth';
import { useState, useCallback } from 'react';
import { Outlet, useNavigate} from "react-router-dom";
import Trends from "./trends";


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
      uploadFest()
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

  function uploadFest() {

  }


  function signOut() {
    try {
      authApi.signout()
      localStorage.setItem(import.meta.env.VITE_AUTH_TOKEN_STR, "")
      
    } catch (err) {
      setError('Error signing out')
    }
    navigate('/login')
  }
  function updateText(text: string) {
    setCharacterLeft(max_chars - text.length)
    setManText(text)
  }
  function playPreview(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    uploadFest()
    console.log('show-popup')
  }
      return (
        <>
        <Grid templateColumns="repeat(2, 1fr)">
          <GridItem>
          <Heading>Trends</Heading>
          <Trends />
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
            <Button loading={loading} onClick={e=>{playPreview(e)}}>Read</Button>
            {(charactersLeft < 21) && <Text color='red'>{charactersLeft}/{max_chars} characters Left</Text>}
            </HStack>
            {error && <Text color='red'>{error}</Text>}
            <Button colorPalette='red' variant="subtle" size='lg' onClick={signOut}>
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
