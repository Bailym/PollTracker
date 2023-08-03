const axios = require('axios');
const RSSFeedURL = "http://feeds.bbci.co.uk/news/politics/rss.xml"
let RSSParser = require('rss-parser');


async function parseRSSFeedData(data) {
    let rssParser = new RSSParser();
    let rssFeedData = await rssParser.parseURL(RSSFeedURL);
    return rssFeedData
}


module.exports = {
    async GetRSSFeed(req, res) {
        var RSSFeedData = {};
    
        try{
            RSSFeedData = await axios.get(RSSFeedURL)
        }
        catch (error) {
            console.log(error.stack);
            res.sendStatus(500)
        }
        finally {
            var parsedRssData = await parseRSSFeedData(RSSFeedData.data);
            res.send(parsedRssData);
        }
    }
}
