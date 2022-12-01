import { Link, Box, Image } from "@chakra-ui/react"

function HeaderBar() {

    return (
        <Box bgColor="#32D7B9" flexDirection="row" height="5vh" >
            <Link href="/" display="block" maxWidth="64px"><Image src={process.env.PUBLIC_URL + "/icon.png"} alt="logo" maxH="5vh" maxWidth="64px" /></Link>
        </Box>

    )

}

export default HeaderBar;