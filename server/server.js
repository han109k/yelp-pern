const express = require("express");
const app = express();

const port = 3008;

app.listen(port, () => {
    console.log(`Server is listening #port ${port}`);
});