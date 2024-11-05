import { Box } from "@chakra-ui/react";
import { Outlet, Link } from "react-router-dom";
import './landingpage.css'

const LandingPage = () => {
    return (<>
       
        <Link to="/login" replace={true} >Welcome to Manifest</Link>
        <Box className='circle' >

        </Box>

        <Outlet />
    </>)

}

export default LandingPage