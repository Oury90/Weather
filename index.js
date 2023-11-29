import express from 'express';
import bodyParser from 'body-parser';
import ejs from 'ejs';
import axios from 'axios';
import Appkey from "./code.js";


const key = Appkey();
const app = express();
const port = 3000;
const appid = key;
// const url_endpoint = "https://api.openweathermap.org/data/2.5/weather?";
const lat = "47.322048";
const lon = "5.041480";
// const link_icon = " https://openweathermap.org/img/wn/10d@2x.png"


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", async(req, res)=>{
    const response = await axios.post(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appid}`);
    let icone_img = response.data.weather[0].icon;
    let url = `https://openweathermap.org/img/wn/${icone_img}@2x.png`;
    res.render("index.ejs", {
        data_temp: response.data.main.temp,
        description1: response.data.weather[0].main,
        description3: response.data.main.humidity,
        description2: response.data.weather[0].description,
        icon: url
    });
})


app.post("/", async(req, res) =>{
    // let response = await axios.post(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appid}`);
    // res.render("/");
})

app.listen(port, () =>{
    console.log(`This server is running on port ${port}`);
})