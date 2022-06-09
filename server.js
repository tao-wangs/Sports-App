const express = require("express");
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'drp14', 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'drp14', 'build', 'index.html'));
})

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));


// create a GET route
app.get("/express_backend", (req, res) => {
  res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" });
});
