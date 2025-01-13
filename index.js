var express = require('express');
var cors = require('cors');
require('dotenv').config();
const multer = require('multer');
const path = require('path')

const storage = multer.memoryStorage();
const upload = multer({ storage: storage});

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), (req,res) => {
  if(!req.file){
    return res.status(400).send('No file uploaded');
  }

  const fileMetadata = {
    name: req.file.originalname,
    size: req.file.size,
    type: req.file.mimetype
  }

  res.json(fileMetadata)
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
