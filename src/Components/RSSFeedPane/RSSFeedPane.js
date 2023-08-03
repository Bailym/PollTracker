import { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Text, Box, GridItem, Divider, Flex, Link} from '@chakra-ui/react';


function RSSFeedPane() {

    const [rssData, setRSSData] = useState();
    const [rssFeedComponents, setRSSFeedComponents] = useState(null);

    useEffect(() => {
        async function getRSSFeed() {
            await axios.get("/api/rss/get")
                .then((response) => {
                    setRSSData(response.data);
                })
        }

        getRSSFeed();
    }, []);

    useEffect(() => {
        function CreateRSSFeedComponents() {
            var newRSSFeedCompnents = [];
            for (let i = 0; i < rssData.items.length; i++) {
                newRSSFeedCompnents.push(
                    <GridItem key={i} bg={"rgba(245, 245, 245, 0.75)"} boxShadow={"0px 4px 4px 5px rgba(0, 0, 0, 0.1)"} colSpan={1} padding={"2rem"}>
                        <Flex justifyContent={"space-between"} flexDirection={"column"}>
                            <Box flex={1}>
                                <Text fontWeight={"bold"}>{rssData.items[i].pubDate}</Text>
                                <Divider />
                                <Text>{rssData.items[i].title}</Text>
                            </Box>
                            <Box flex={4}>
                                <Text>{rssData.items[i].contentSnippet}</Text>
                            </Box>
                            <Box flex={1}>
                                <Link href={rssData.items[i].link}color={"#438ad1"}>Visit Link [BBC News]</Link>
                            </Box>
                        </Flex>
                    </GridItem>
                )
            }
            setRSSFeedComponents(newRSSFeedCompnents);
        }

        if (rssData === undefined) {
            return;
        }
        CreateRSSFeedComponents();
    }, [rssData]);


    return (
        <Grid data-testid="rss-feed-pane-component" templateColumns='repeat(2, 1fr)' gap={4}>
            {rssFeedComponents}
        </Grid>
    );
}

export default RSSFeedPane;