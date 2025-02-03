import express from "express";
import books from "./books.js";

const app = express();
const PORT = 5000;

app.use("/books", books);
app.listen(PORT, () => console.log(`Server run: http://localhost:${PORT}`));
