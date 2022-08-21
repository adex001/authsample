const express = require('express');
const router = require('./routes');

const app = express();
const PORT = 4000;

app.use(express.json());

app.use(router);

app.get('/', (req, res) => {
    return res.status(200).json({
        message: 'App is live'
    })
});

// app.use()

app.listen(PORT, () => {
    console.log(`App is running on PORT ${PORT}`)
});
