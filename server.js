const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'fly')))

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, 'fly', 'fly.html'))
})

app.listen(port, () => {
    console.log(`Server running on ${port}`);
});