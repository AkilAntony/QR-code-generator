import express from 'express'
import cors from 'cors'
import qr from 'qr-image'
import fs from 'fs'
import {dirname} from 'path'
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url)); 

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
// const url = 'https://drive.google.com/file/d/1m1nzd7couSk3MMwoaSL5r-HIJ5iElBKr/view?usp=sharing';
// var qrImage = qr.image(url);
// qrImage.pipe(fs.createWriteStream('qr_img.png'));

app.post('/url',async(req,res)=>{
    try{
        const url= req.body.url;
        console.log(url);
        if(url){
            var qrImage =  qr.image(url);
            qrImage.pipe(fs.createWriteStream('qr_img.png'))
        }
        res.sendStatus(200)
         res.sendFile(__dirname+ '/qr_img.png')
    }catch (error) {
        console.error('An error occurred:', error);
    }
})

 
app.get('/qrcode',(req,res)=>{
    res.sendFile(__dirname+ '/qr_img.png')
})

app.listen(port, ()=>console.log(`app running at port ${port}`));