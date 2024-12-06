import { Box, Button, Heading, Link, Text } from "@chakra-ui/react"
import { Blockquote } from "@/components/ui/blockquote"

export const HowToPage = () => {

return (
    <Box bg="#242424" minW="300px" maxW="90vh" minH="90vh" spaceY="1" p={8}>
        <Heading> What does it mean to "Manifest"</Heading>
        <hr></hr>
        <Text>There's many different interperations of what to manifest means. In this app, we try to give you a practical way to figure out what it means for you. 
            <br></br>
            <br></br>
            
        Manifesting can be thought of as listening or reading positive thoughts. You are the one who creates these thoughts. In this app, we provide you with the ability to listen or read to your prompts - choosing between listening or reading is mostly a preference. A manifest can come in many different forms. When getting started for the first time, it's suggested to start with many one lined sentences with assertive claims. These claims are places are you want to be in the future. As a general thought, push further. Go from something like 'I am good at Basketball' to 'I am the best basketball player I've ever seen' As a more advanced approach, you can start with multi-line more complex thoughts. There are some initial examples below on where to start.
        </Text>
        <br></br>
        
        <Heading>Background</Heading>
        <hr></hr>
        <Text>The book Secret by Rhonda Byrne claims that when you manifest, the things you say magnetically attract to you via the universe's law of attraction
        </Text>
        <Text>In the bible it says: </Text>
        <Blockquote>“Therefore I tell you, whatever you ask in prayer, believe that you have received it, and it will be yours.” - Mark 11:24</Blockquote>
        <Text>Many others just think the results come from the placebo effect </Text>
        <Text>Wherever this phenomenon comes from, it's been proven to work</Text>
        <Link href="\">Start now!</Link>
    </Box>)

}   