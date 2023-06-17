const express = require('express');
const axios = require('axios')
require('dotenv').config();
const bodyParser = require('body-parser');
const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.post('/api/proxy', async (req, res) => {
    try {
        const address = req.body.address;
        var geocodingAPIKey = `4b08bae187cfa6236d10f3dc7b4ec4c2`
        var geocodingEndpoint = `http://api.positionstack.com/v1/forward?access_key=${encodeURIComponent(geocodingAPIKey)}&query=${address}`;
        const apiResponse = await axios.get(geocodingEndpoint);
        if (apiResponse.data.data && apiResponse.data.data.length > 0) {
            const latitude = apiResponse.data.data[0].latitude;
            const longitude = apiResponse.data.data[0].longitude;
            res.json({ latitude, longitude });
        } else {
            console.log(JSON.stringify(apiResponse.data))
            res.status(500).json({ error: 'Failed to fetch data from API' });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to fetch data from API' });
    }
});
const port = process.env.PORT || 3000;;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});