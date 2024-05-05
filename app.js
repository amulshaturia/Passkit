const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const userRouter = require("./routes/user");
const cors = require('cors')
const dotenv = require('dotenv')
const app = express();
const path = require('path')
app.use(express.json());
app.use(cors())
const PORT = process.env.PORT || 8000;

dotenv.config()
app.use(express.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));


app.use('/user', userRouter);
 
app.get("/ping", (req, res) => {
    res.send("pong");
})
app.use(express.static(path.resolve(path.resolve(), 'client', 'build')));
app.get("*", (req, res) => {
    res.sendFile(path.resolve(path.resolve(), 'client', 'build', 'index.html'), function (err) {
        if (err) {
            res.status(500).send(err)
        }
    });
})

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("connection successs .....!");
}).catch((err) => {
    console.log(err);
})

app.listen(PORT, () => {
    console.log("app is listening at port ", PORT);
}); 
