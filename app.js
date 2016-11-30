const express = require('express');
const app = express();
const multer  = require('multer');
const fs = require('fs');

let decompose = require('./decompose');
let parseSvg = require('./parse-svg');

app.get('/', function(req, res){
  res.sendFile(`${__dirname}/public/index.html`)
});

app.use(express.static('public'));

app.listen(3000, () => (console.log('App listening on port 3000')));

/*
Upload file
*/
let storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, `${__dirname}/public/uploads/`),
  filename: (req, file, cb) => cb(null, file.originalname)
});

let upload = multer({ storage: storage}).single('svg');

app.post('/', (req, res) => {
  upload(req, res, (err) => {
    if(err) return res.end("Error uploading file");
    if(req.file == undefined || req.file.mimetype !== 'image/svg+xml') return res.end("Select only SVG file");

      parseSvg(req.file.filename);
      res.end(`File ${req.file.filename} is succsecfully uploaded.`);
  });
});

/*
 Sent decomposed files to client
 */
app.get('/public/decomposed/:name', (req, res) => {
 let name = req.params.name;
 res.sendFile(`${__dirname}/public/decomposed/${name}`, (err) => {
   if (err) {
    console.log(`Error:${err}`);
    res.status(err.status).end();
   }
   else console.log(`Sent:${name}`);
 });
});

