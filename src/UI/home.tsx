import { HStack, VStack, Text, Textarea, Grid, GridItem, Heading, Link, Spacer, IconButton, Icon, Box, Center} from "@chakra-ui/react"
import { Button } from "@/components/ui/button"
import { FaGear } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaSave } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import './App.css'
import { textToSpeechApi } from '@/services/tos';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate} from "react-router-dom";
import Trends from "./trends";
import { CHARS_BEFORE_TEXT, MAX_CHARS_PER_USER, MAX_TIMES_LISTENED_PER_DAY } from "@/constants";

import { useMutation, useQuery } from "@apollo/client";
import { createFest, updateFestText } from "@/graphql/fest";
import { updateHistory, updateTimesListenedToday } from "@/graphql/history";
import { useDatabase } from "@/provider/databaseProvider";
import { useAuth } from "@/provider/authProvider";
import { determineMaxStreak, determineStreak } from "./streak";


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
 
  const [updateTimesListened, { data: dataTimesListened, loading: loadingTimesListened, error: errorTimesListened }] = useMutation(updateTimesListenedToday);
  const authApi = useAuth()
  
  const [currentFestPage, setCurrentFestPage] = useState(0)
  const [maxFestPage, setMaxFestPage] = useState(1)
  const [shouldShowSave, setShouldShowSave] = useState(false)

  const [listensToday, setListensToday] = useState(0)
  const [audioUrl, setAudioUrl] = useState('');
  const navigate = useNavigate()
 

  
  const {fest, history, user, loading: databaseLoading, error: databaseError, refresh } = useDatabase()

  useEffect(() => {

    if (fest != undefined){
      var fest_texts: string[] = Object.values(JSON.parse(fest?.fest_text))
      setMaxFestPage(fest_texts.length)
      setManText(fest_texts)
    }
    if (manText.length != 0) {
      setCharacterLeft(max_chars - manText[currentFestPage].length)

    }

    if (history?.times_listened_today == undefined) {
      return
    }
    console.log("HOW MANY TIMES YOU IN HERE?")
    setListensToday(history?.times_listened_today)
    
  }, [fest, history])



  useEffect(() => {

    if (manText.length == 0) {
      return 
    }
    setCharacterLeft(max_chars - manText[currentFestPage].length)
    setMaxFestPage(manText.length)
  }, [currentFestPage])
  

  async function uploadHistory(listened: boolean) {
    const now = new Date()
    const timeSince = now.getTime()
    const festTimes: number[] = JSON.parse(history?.fest_time ?? [])
    const newTimes = festTimes.concat([timeSince]) 
    const lastFest = new Date((festTimes[festTimes.length-1]))
    if (festTimes.length > 0 && now.getDate() == new Date(lastFest).getDate()) {
        console.log("OVER HERE?")
        uploadTimesListened(listened)
        return
    } 
      try {
        const val = await updateHistoryField({
          variables: {
              userid: authApi.getToken,
              streak: -4,
              max_streak: -4,
              fest_time: JSON.stringify(newTimes),
              times_listened_today: JSON.stringify(1)
          },
      });


      } catch (error) {
        console.log(error)
        
        setError('Error trying to upload Manifest text')
      }
      refresh()
      setListensToday(1)
  }

  // we already know it's the same day
  async function uploadTimesListened(listened: boolean) {
    if (!listened) {
      return
    }
    const timesListened = Math.min(MAX_TIMES_LISTENED_PER_DAY, Number(listensToday)+ (listened ? 1 : 0))
    setListensToday(timesListened)

    try {
      const val = await updateTimesListened({
        variables: {
            userid: authApi.getToken,
            times_listened_today: timesListened
        },
        
    });
    refresh()
    } catch (e) {
      setError("Error Uploading Data")
    }

  
  }

  const playManifest = async () => {
    setLoading(true)
    uploadFest()
    uploadHistory(true)
    console.log(listensToday, "THE LISTENSTODYA")
    if (listensToday <= 5) {
      await displayTextToSpeech();
    } else {
      setError("You are Limited to 5 Requests per Day")
      console.log(errorMessage)
    }
    setShouldShowSave(false)
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

  function readManifest() {
    setLoading(true)
    uploadFest()
    uploadHistory(false)
    setLoading(false)
    setShouldShowSave(false)
    navigate("/read-view", { state: { text: manText[currentFestPage] } })
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
    setShouldShowSave(true)
    
    setCharacterLeft(max_chars - texts.length)
    if (charactersLeft <= 0) {
      return 
    }
   
    manText[currentFestPage] = texts
    setManText(manText)
    
  }

  function addFest() {
    const fest_texts: string[] = manText
    var newArr = [
      ...fest_texts.slice(0, currentFestPage+1),  
      "",                  
      ...fest_texts.slice(currentFestPage+1)      
    ];
    setManText(newArr)
    setShouldShowSave(true)
    setCurrentFestPage(currentFestPage+1)
    
    
  }
  function save() {
    try {
      uploadFest()
      setShouldShowSave(false)
    }
    catch (e) {
      setError("Error trying to save Manifest text")
    }
    
    
    
  }

  function removeFest() {
    if (manText == undefined || manText.length == 1) {
      return
    }
    var newText = manText.filter((_: string, i: number) => {
      return i != currentFestPage
    })
    setShouldShowSave(true)
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
    <Button loading={isLoading} onClick={playManifest}>Listen</Button>
    <Button loading={isLoading} onClick={readManifest}>Read</Button>
    </HStack>
    </GridItem>
    <GridItem>
    <Center float={"right"}>
    {shouldShowSave && <IconButton background={"green"} onClick={save}> <FaSave/></IconButton>}
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
        <Grid 
        templateColumns="repeat(2, 1fr)"
        data-state="open"
        _open={{
            animation: "fade-in 300ms ease-in",
        }}>
          <GridItem>
          <Heading>Trends</Heading>
          <Trends />
          </GridItem>
          <GridItem>
          <VStack gap="4" width={400}>
            <h1><b>Manifest</b></h1>
            <Textarea value={manText[currentFestPage]} placeholder='Write your manifestation here...' onChange={(e) => updateText(e.target.value)} />
            <FestArea/>
            
            {errorMessage && <Text color='red'>{errorMessage}</Text>}
            
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


