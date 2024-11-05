import { useState } from 'react'
import { HStack, VStack, Icon, Button } from "@chakra-ui/react"
import { FaUser } from "react-icons/fa";
import './App.css'

function Main() {
  const [count, setCount] = useState(0)

  return (
    <>
      <VStack>
        <h1><b>Manifest</b></h1>
        <HStack>
          <Button size='lg' colorPalette='red' onClick={() => setCount((count) => count + 1)}>
            Upload a Manfiestation
          </Button>
          <Button variant="subtle" size='lg'>
            Listen to your Manifestation
          </Button>
        </HStack>

        <Button variant="subtle" size='lg'>
          <FaUser /> <h2>Logout</h2>
        </Button>
      </VStack>
    </>
  )
}

export default Main
