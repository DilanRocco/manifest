import { Box, Spacer, Text, VStack } from "@chakra-ui/react";
import { Outlet, Link } from "react-router-dom";
import './landingpage.css'


const LandingPage = () => {
    return (<>
        <VStack>
        <Text className="title">Welcome to Manifest</Text>
        <Spacer />
        <Link className="button" to="/login" replace={true} >Start Manifesting </Link>
        
        </VStack>
        <Box className='circle' >

        </Box>
        <Outlet />
    </>)

}

export default LandingPage