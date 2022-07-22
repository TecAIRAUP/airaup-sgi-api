import "dotenv/config";
import express from "express";


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTERS
const districts = require("./routers/districts");
const clubs = require("./routers/clubs");
const users = require("./routers/users");
app.use("/district", districts);
app.use("/user", users);
app.use("/club", clubs);


app.get("/", async (req, res, next) => {
    res.send("El SGI ANDA! :D");
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});