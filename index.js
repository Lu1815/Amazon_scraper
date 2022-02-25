const express = require('express');
const request = require('request-promise');

const app = express();
const PORT = process.env.PORT || 5000;

//TO GET THE DATA FROM AMAZON IN JSON FORMAT I'M USING scraperapi.com
const generateScraperUrl = (apiKey) => `https://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to my Amazon Scrapper API. <br/> You can use your own APIKey from scraperapi.com. <br/><br/> The available endpoints are: <br/><br/> - /products/:productId <br/> - /products/:producId/reviews <br/> - /products/:productId/offers <br/> - /search/:searchQuery <br/><br/> Then you can add your APIKey like this at the end of the url: ?api_key=myApiKey');
});

//GET PRODUCT DETAILS
app.get('/products/:productId', async(req, res) => {
    const { productId } = req.params;
    const { api_key } = req.query;

    try {
        //THIS LINE IS GOING TO REQUEST INFORMATION FROM A SPECIFIC PRODUCT
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/dp/${productId}`);

        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    };
});

//GET PRODUCT REVIEWS
app.get('/products/:productId/reviews', async(req, res) => {
    const { productId } = req.params;
    const { api_key } = req.query;

    try {
        //THIS LINE IS GOING TO REQUEST INFORMATION FROM A SPECIFIC PRODUCT
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/product-reviews/${productId}`);

        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    };
});

//GET PRODUCT OFFERS
app.get('/products/:productId/offers', async(req, res) => {
    const { productId } = req.params;
    const { api_key } = req.query;

    try {
        //THIS LINE IS GOING TO REQUEST INFORMATION FROM A SPECIFIC PRODUCT
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/gp/offer-listing/${productId}`);

        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    };
});

//GET SEARCHED RESULTS
app.get('/search/:searchQuery', async(req, res) => {
    const { searchQuery } = req.params;
    const { api_key } = req.query;

    try {
        //THIS LINE IS GOING TO REQUEST INFORMATION FROM A SPECIFIC PRODUCT
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/s?k=${searchQuery}`);

        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    };
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));