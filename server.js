import path from 'path'
import express from 'express'

const app = express();
const PORT = 3000;

app.use("/", express.static('src'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));