const path = require('path');
const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const cbr = require('cbr');
const fs = require('fs');
const folder = 'comics';
const app = express();
const junk = require('junk');
const multer = require('multer');
const upload = multer({dest: 'comics/'})
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/assets', express.static(__dirname + '/public'));
app.use('/extracted', express.static(__dirname + '/extracted'))


app.get('/', (req, res) => {
    var errors = [];
    var dir = 'extracted';
    fs.readdir(dir, function (error, comics) {
        if (error) {
            errors.push(error);
        } else {
            var folders = [];
            comics = comics.filter(junk.not);
            for (const item of comics) {
                console.log(item);
                if (item != ".DS_Store") {
                    folders.push(item);
                }
            }

            res.render('index', {
                comics: comics
            });
        }
    });
});


app.post('/upload', upload.single('comic'), (req, res) => {
    if(req.file){
        var errors = [];
        console.log(req.file.originalname);
        var dest = 'extracted'+path.sep+req.file.originalname.split('.')[0];
        cbr(folder + path.sep + req.file.filename, dest, function(error, out){
            console.log(out);
            if(error){
                errors.push(error);
            }
            res.redirect('/');
        });
    }
});

app.get('/:comic', (req, res) => {
    var errors = [];
    var dir = 'extracted' + path.sep + req.params.comic;
    fs.readdir(dir, function (error, comicItms) {
        if (error) {
            errors.push(error);
        } else {
            var imgs = [];
            for (var item of comicItms) {
                imgs.push('/' + dir + '/' + item);
            }
            res.render('comic', {
                files: imgs,
                comic: req.params.comic
            });
        }
    });
});

app.listen(8000, () => {
    console.log('Server is running at port 8000');
});