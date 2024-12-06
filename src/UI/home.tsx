import { HStack, VStack, Text, Textarea, Grid, GridItem, Heading, Link, Spacer, IconButton, Icon, Box, Center} from "@chakra-ui/react"
import { Button } from "@/components/ui/button"
import { FaGear } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import './App.css'
import { textToSpeechApi } from '@/services/tos';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate} from "react-router-dom";
import Trends from "./trends";
import { AUTH_TOKEN_STR, CHARS_BEFORE_TEXT, MAX_CHARS_PER_USER } from "@/constants";

import { useMutation, useQuery } from "@apollo/client";
import { session } from "passport";
import { GetFestQuery, GetFestQueryVariables, GetHistoryQuery, GetHistoryQueryVariables } from "@/generated/graphql";
import { createFest, getFest, updateFestText } from "@/graphql/fest";
import { updateHistory, getHistory } from "@/graphql/history";
import { useDatabase } from "@/provider/databaseProvider";
import { useAuth } from "@/provider/authProvider";


// type Fest  {

// }
function Home() {
  const max_chars = MAX_CHARS_PER_USER
  
  const [manText, setManText] = useState<string[]>([])
  const [errorMessage, setError] = useState("")
  const [isLoading, setLoading] = useState(false)
  const [charactersLeft, setCharacterLeft] = useState(max_chars)
  const [isPlaying, setIsPlaying] = useState(false);
  const [updateFestField, { data, loading, error }] = useMutation(updateFestText);
  const [updateHistoryField, { data: dataHistory, loading: loadingHistory, error: errorHistory }] = useMutation(updateHistory);
  const authApi = useAuth()
  
  const [currentFestPage, setCurrentFestPage] = useState(0)
  const [maxFestPage, setMaxFestPage] = useState(0)

  const [audioUrl, setAudioUrl] = useState('');
  const navigate = useNavigate()
 

  
  const {fest, history, user, loading: databaseLoading, error: databaseError, refresh } = useDatabase()

  useEffect(() => {
    if (fest != undefined){
      var fest_texts: string[] = Object.values(JSON.parse(fest?.fest_text))

      setMaxFestPage(fest_texts.length)
      setManText(fest_texts)
      console.log(manText)
      if (manText.length == 0) {
        return 
      }
      setCharacterLeft(max_chars - manText[currentFestPage].length)
      console.log(currentFestPage)
      
    }
   
  }, [fest, history])

  useEffect(() => {
    console.log(manText)
    if (manText.length == 0) {
      return 
    }
    setCharacterLeft(max_chars - manText[currentFestPage].length)
    setMaxFestPage(manText.length)
  }, [currentFestPage])

  async function uploadHistory() {
    const now = Date.now()
    const festTimes = JSON.parse(history?.fest_time)

    const newTimes = festTimes.concat([now])
    const maxStreak = Math.max(history?.max_streak, newTimes.length)
    if (festTimes.length > 0 && 0 == Math.floor((now / (1000 * 3600 * 24))) - Math.floor((festTimes[festTimes.length-1]) / (1000 * 3600 * 24))){
      return
    }
      try {
        const val = await updateHistoryField({
          variables: {
              userid: authApi.getToken,
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
    uploadFest()
    uploadHistory()
    await displayTextToSpeech();
    setLoading(false)
  };

  async function displayTextToSpeech() {
    try {
      const response = await textToSpeechApi.tos(manText[currentFestPage]);
      const url = URL.createObjectURL(response);
      setAudioUrl(url);
    } catch (err) {
      console.error('Audio error:', err);
      setError('Error trying to convert Text to Speech');
      setIsPlaying(false);
    }
  }

  function playPreview() {
    setLoading(true)
    uploadFest()
    uploadHistory()
    setLoading(false)
    navigate("/read-view", { state: { text: manText[currentFestPage] } })
  }

  function test() {
    
  }
  
  async function uploadFest() {

    try {
      const val = await updateFestField({
        variables: {
            userid: authApi.getToken,
            festtext: JSON.stringify(manText),
        },
    });
    } catch (error) {
      console.log(error)
      setError('Error trying to upload Manifest text')
    }
  }

  function updateText(texts: string) {
    console.log()
    setCharacterLeft(max_chars - texts.length)
    if (charactersLeft <= 0) {
      return 
    }
   
    manText[currentFestPage] = texts
    setManText(manText)
    
  }

  function addFest() {
    const fest_texts: string[] = manText
    console.log(typeof(fest_texts))
    console.log(...fest_texts.slice(0, currentFestPage))
    var newArr = [
      ...fest_texts.slice(0, currentFestPage+1),  
      "",                  
      ...fest_texts.slice(currentFestPage+1)      
    ];
    setManText(newArr)
    setCurrentFestPage(currentFestPage+1)
    
    
  }

  function removeFest() {
    if (manText == undefined || manText.length == 1) {
      return
    }
    var newText = manText.filter((_: string, i: number) => {
      return i != currentFestPage
    })
    setManText(newText)
    setMaxFestPage(maxFestPage-1)
    if (newText.length == currentFestPage) {
      setCurrentFestPage(currentFestPage - 1)
    }
  }
  const FestArea = () => {
   return (
    <VStack gap="0" width={400}>
    {(charactersLeft < CHARS_BEFORE_TEXT) && <Text float="right" color='red'>{charactersLeft}/{max_chars} </Text>}
    <Grid templateColumns="repeat(3, 1fr)">
    <GridItem> 
      <HStack>  
      <IconButton color="white" variant={"ghost"} onClick={() =>setCurrentFestPage(Math.max(0, currentFestPage-1))}><IoIosArrowBack/> </IconButton>
      <Text float={"left"}>{currentFestPage+1}/{maxFestPage}</Text>
      <IconButton color="white" variant={"ghost"} onClick={() =>setCurrentFestPage(Math.min(manText.length-1, currentFestPage+1))}><IoIosArrowForward /> </IconButton>
      </HStack>
      </GridItem>
    <GridItem>
    <HStack>
    <Button loading={isLoading} onClick={playNoise}>Listen</Button>
    <Button loading={isLoading} onClick={playPreview}>Read</Button>
    </HStack>
    </GridItem>
    <GridItem>
    <Center float={"right"}>
    <IconButton color="white" variant={"ghost"} onClick={addFest}><IoIosAddCircleOutline/> </IconButton>
    <IconButton color="white" variant={"ghost"} onClick={removeFest}><MdDelete/> </IconButton>
    </Center>
    </GridItem>
    </Grid>
   
    {audioUrl && <audio src={audioUrl} controls />}
    </VStack>)
    
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
            <Textarea value={manText[currentFestPage]} placeholder='Write your manifestation here...' onChange={(e) => updateText(e.target.value)} />
            <FestArea/>
            <Button>Save </Button>
            {error && <Text color='red'>{errorMessage}</Text>}
            
            <HStack>
              <Link href="/how-to"> Learn how</Link>
              |
              <Link href="/benefits"> Benefits</Link>
              
            </HStack>
            <Link href="/settings" colorPalette='red'>
              <FaGear /> <h2>Settings</h2>
            </Link> 

          </VStack>
          </GridItem>
          </Grid>
          <Outlet/>
        </>
      )
    }

export default Home


