const express = require('express');
require('dotenv').config();
const app = express();
app.use(express.static('public'));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
const port = process.env.PORT || 3000;;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});