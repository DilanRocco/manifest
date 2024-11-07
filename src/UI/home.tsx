import { HStack, VStack, Input } from "@chakra-ui/react"
import { Field } from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import { FaUser } from "react-icons/fa";
import './App.css'
import { textToSpeechApi } from '@/services/tos';
import { useState, useCallback } from 'react';

function Home() {
  const [manText, setManText] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [outputPath, setOutputPath] = useState("")


  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');

  const playNoise = async () => {
    try {
      console.log(manText)
      const response = await textToSpeechApi.tos(manText)
      const audioBlob = await response.blob();
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
    } catch (err) {
      console.error('Audio error:', err);
      setIsPlaying(false);
    }
  };

  function handleChange(text:string) {
    console.log(text)
    setManText(text)
    console.log(manText, "mantext")
  }

      return (
        <>
          <button
            onClick={playNoise}
            disabled={isPlaying}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
          >
            {isPlaying ? 'Playing...' : 'Play Noise'}
          </button>
          {audioUrl && <audio src={audioUrl} controls />}
          <p>testing</p>
          <VStack>
            <h1><b>Manifest</b></h1>
            <HStack>
              <Button size='lg' colorPalette='red'>
                Upload a Manfiestation
              </Button>
              <Button variant="subtle" size='lg'>
                Listen to your Manifestation
              </Button>
            </HStack>
            <Field>
              <Input placeholder='Write your manifestation here' onChange={e => handleChange(e.target.value)} />
            </Field>
            <Button loading={loading} onClick={playNoise}>Generate Manifest and Listen</Button>

            <Button variant="subtle" size='lg'>
              <FaUser /> <h2>Logout</h2>
            </Button>
          </VStack>
        </>
      )
    }

export default Home
