import { useEffect, useState } from 'react';
import axios from 'axios';


function RSSFeedPane() {

    const [rssData, setRSSData] = useState([]);

    async function getRSSFeed() {
        await axios.get("/api/rss/get")
            .then((response) => {
                console.log(response.data)
                setRSSData(response.data);
            })   
    }

    useEffect(() => {
        getRSSFeed();
    }, []);

    useEffect(() => {
        console.log(rssData);
    }, [rssData]);


    return (
        <div data-testid="rss-feed-pane-component">
            <h1>RSS Feed Pane</h1>
        </div>
    );
}

export default RSSFeedPane;