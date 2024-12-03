import { HStack, VStack, Text, Textarea, Grid, GridItem, Heading} from "@chakra-ui/react"
import { Button } from "@/components/ui/button"
import { FaUser } from "react-icons/fa";
import './App.css'
import { textToSpeechApi } from '@/services/tos';
import { authApi } from '@/services/auth';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate} from "react-router-dom";
import Trends from "./trends";
import { AUTH_TOKEN_STR, CHARS_BEFORE_TEXT } from "@/constants";

import { useMutation, useQuery } from "@apollo/client";
import { session } from "passport";
import { GetFestQuery, GetFestQueryVariables } from "@/generated/graphql";
import { createFest, getFest, updateFestText } from "@/graphql/fest";

// type Fest  {

// }
function Home() {
  const max_chars = import.meta.env.VITE_MAX_CHARS_PER_USER
  
  const [manText, setManText] = useState("")
  const [errorMessage, setError] = useState("")
  const [isLoading, setLoading] = useState(false)
  const [charactersLeft, setCharacterLeft] = useState(max_chars)
  const [isPlaying, setIsPlaying] = useState(false);
  const [updateField, { data, loading, error }] = useMutation(updateFestText);

  const [audioUrl, setAudioUrl] = useState('');
  const [helloText, setHelloText] = useState('')
  const navigate = useNavigate()
  const festQuery = useQuery<GetFestQuery, GetFestQueryVariables>(getFest);

  

  useEffect(() => { 
    
    
    const v = festQuery.data?.festCollection?.edges[0].node.fest_text
    console.log(typeof(v))
    if (v != undefined){
      setManText(JSON.parse(v)[0])
    }
   
  }, [festQuery])

  const playNoise = async () => {
    try {
      const response = await textToSpeechApi.tos(manText)
      const url = URL.createObjectURL(response);
      setAudioUrl(url);
    } catch (err) {
      console.error('Audio error:', err);
      setError('Error trying to convert Text to Speech')
      setIsPlaying(false);
    }
  };

  function playPreview() {
    uploadFest()
  }

  async function uploadFest() {
    try {
      const val = await updateField({
        variables: {
            userid: sessionStorage.getItem("userId"),
            festtext: JSON.stringify([manText]),
        },
    });
    console.log(val)
    } catch (error) {
      console.log(error)
      setError('Error trying to upload Manifest text')
    }
  }


  function signOut() {
    try {
      authApi.signout()
      localStorage.setItem(AUTH_TOKEN_STR, "")
      
    } catch (err) {
      setError('Error signing out')
    }
    navigate('/login')
  }
  function updateText(text: string) {
    setCharacterLeft(max_chars - text.length)
    setManText(text)
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
            <Textarea value={manText} placeholder='Write your manifestation here...' onChange={(e) => updateText(e.target.value)} />
            {audioUrl && <audio src={audioUrl} controls />}
            <HStack>
            <Button loading={isLoading} onClick={playNoise}>Listen</Button>
            <Button loading={isLoading} onClick={playPreview}>Read</Button>
            {(charactersLeft > CHARS_BEFORE_TEXT) && <Text color='red'>{charactersLeft}/{max_chars} characters Left</Text>}
            </HStack>
            <Text>{helloText}</Text>
            {error && <Text color='red'>{errorMessage}</Text>}
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
