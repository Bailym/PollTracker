const axios = require('axios');
const RSSFeedURL = "http://feeds.bbci.co.uk/news/politics/rss.xml"


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
            req.send(RSSFeedData);
            res.sendStatus(200);
        }
    }
}
