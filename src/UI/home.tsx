import { HStack, VStack, Text, Textarea, Grid, GridItem, Heading, Link} from "@chakra-ui/react"
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
import { GetFestQuery, GetFestQueryVariables, GetHistoryQuery, GetHistoryQueryVariables } from "@/generated/graphql";
import { createFest, getFest, updateFestText } from "@/graphql/fest";
import { updateHistory, getHistory } from "@/graphql/history";
import { useDatabase } from "@/provider/databaseProvider";


// type Fest  {

// }
function Home() {
  const max_chars = import.meta.env.VITE_MAX_CHARS_PER_USER
  
  const [manText, setManText] = useState("")
  const [errorMessage, setError] = useState("")
  const [isLoading, setLoading] = useState(false)
  const [charactersLeft, setCharacterLeft] = useState(max_chars)
  const [isPlaying, setIsPlaying] = useState(false);
  const [updateFestField, { data, loading, error }] = useMutation(updateFestText);
  const [updateHistoryField, { data: dataHistory, loading: loadingHistory, error: errorHistory }] = useMutation(updateHistory);

  


  const [audioUrl, setAudioUrl] = useState('');
  const [helloText, setHelloText] = useState('')
  const navigate = useNavigate()
 

  
  const {fest, history, user, loading: databaseLoading, error: databaseError, refresh } = useDatabase()

  useEffect(() => {
    const fest2 = fest
    if (fest != undefined){
      setManText(JSON.parse(fest2?.fest_text ?? "")[0])
    }
   
  }, [fest, history])

  async function uploadHistory() {
    const userId = sessionStorage.getItem("userId")
    if (userId == undefined){
      setError('Invalid Session Token, Try Reloading')
      return
    } 
    const now = Date.now()
    const festTimes = JSON.parse(history?.fest_time)

    const newTimes = festTimes.concat([now])
    const maxStreak = Math.max(history?.max_streak, newTimes.length)

    if (festTimes.length > 0 && 0 == Math.floor(Math.abs(now - festTimes[festTimes.length-1]) / (1000 * 3600 * 24))){
      // Don't update streak two times in one day
      return
    }
      try {
        const val = await updateHistoryField({
          variables: {
              userid: sessionStorage.getItem("userId"),
              streak: JSON.stringify(newTimes.length),
              max_streak: JSON.stringify(maxStreak),
              fest_time: JSON.stringify(newTimes)
          },
      });

      refresh()

      } catch (error) {
        console.log(error)
        setError('Error trying to upload Manifest text')
      }
  }

  const playNoise = async () => {
    setLoading(true)
    try {
      const response = await textToSpeechApi.tos(manText)
      const url = URL.createObjectURL(response);
      setAudioUrl(url);
    } catch (err) {
      console.error('Audio error:', err);
      setError('Error trying to convert Text to Speech')
      setIsPlaying(false);
    }
    setLoading(false)
  };

  function playPreview() {
    setLoading(true)
    uploadFest()
    uploadHistory()
    setLoading(false)
    navigate("/read-view", { state: { text: manText } })
  }
  

  async function uploadFest() {
    try {
      const val = await updateFestField({
        variables: {
            userid: sessionStorage.getItem("userId"),
            festtext: JSON.stringify([manText]),
        },
    });
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
            <Link href="/benefits"> Learn how to Manifest</Link>
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
