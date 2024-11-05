import { useState } from 'react'
import { HStack, VStack, Icon, Button } from "@chakra-ui/react"
import { FaUser } from "react-icons/fa";
import './App.css'

function Home() {
  return (
    <>
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

        <Button variant="subtle" size='lg'>
          <FaUser /> <h2>Logout</h2>
        </Button>
      </VStack>
    </>
  )
}

export default Home
