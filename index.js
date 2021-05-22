const express = require('express');
const path = require('path')
const app = express();
const multer = require('multer');
const serveIndex = require('serve-index');
const { Z_PARTIAL_FLUSH } = require('zlib');


// Set the view engine to use ejs.
app.set('view engine', 'ejs');


// Set up the file upload directory
let upload_dir = path.join(__dirname, '/uploads');



// Add the directory listing page.
app.use(
    '/uploads/', express.static(upload_dir),
    serveIndex(upload_dir, {'icons': true}));

// Setup form upload of image.
const upload = multer({dest: path.join(__dirname, '/uploads')});
app.post('/upload', upload.single('file'), (req, res) => {});


app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});


app.get('/edit', function(req, res) {
    console.log(req.query);
    const file_name = req.query.filename;
    if(file_name === undefined){
        res.sendStatus(404);
    }
    res.render('edit', {imgpath: path.join('/uploads/', file_name)})
});


// The server is setup to run on port 3000.x
const port_number = 3000;
let server = app.listen(port_number, function() {
  console.log('Server can be accessed at localhost:' + port_number);
});
