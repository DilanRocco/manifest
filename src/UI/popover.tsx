import { PopoverProps } from "@/types/props";
import { Text, Heading, VStack} from "@chakra-ui/react"

const Popover = (props:PopoverProps) => {
    <>
    <VStack>
    <Heading>My Manifestation</Heading>
    <Text>{props.text}</Text>
    </VStack>
    </>
}

export default Popover