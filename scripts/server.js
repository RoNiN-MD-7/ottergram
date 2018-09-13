'use strict'
const http = require('http');
const fs = require('fs');

var myMapImg = new Map();
myMapImg.set('/img/otter1.jpg', './img/otter1.jpg');
myMapImg.set('/img/otter2.jpg', './img/otter2.jpg');
myMapImg.set('/img/otter3.jpg', './img/otter3.jpg');
myMapImg.set('/img/otter4.jpg', './img/otter4.jpg');
myMapImg.set('/img/otter5.jpg', './img/otter5.jpg');

var myMapFonts = new Map();
myMapFonts.set('/stylesheets/fonts/LAKESHOR-webfont.woff', './stylesheets/fonts/LAKESHOR-webfont.woff');
myMapFonts.set('/stylesheets/fonts/Airstream-webfont.woff', './stylesheets/fonts/Airstream-webfont.woff');
myMapFonts.set('/stylesheets/fonts/LAKESHOR-webfont.ttf', './stylesheets/fonts/LAKESHOR-webfont.ttf');
myMapFonts.set('/stylesheets/fonts/Airstream-webfont.ttf', './stylesheets/fonts/Airstream-webfont.ttf');

const server = http.createServer(function(request, response) {
  console.log(request.method, request.url);
  for (var [key, value] of myMapImg) {
    if (request.url == key) {
      const img = fs.readFileSync(value);
      response.end(img);
    }
  }

	for (var [key, value] of myMapFonts) {
    if (request.url == key) {
      const font = fs.readFileSync(value);
      response.end(font);
    }
  }

  if (request.url == '/stylesheets/styles.css') {
    const css = fs.readFileSync('./stylesheets/styles.css', 'utf-8');
    response.end(css);
  } else if (request.url == '/favicon.ico') {
    const ico = fs.readFileSync('./favicon.ico');
    response.end(ico);
  } else if (request.url == '/scripts/main.js') {
    const ico = fs.readFileSync('./scripts/main.js', 'utf-8');
    response.end(ico);
  } else {
    const html = fs.readFileSync('./index.html', 'utf-8');
    response.end(html);
  }
});

console.log('port = ', process.env.PORT);

server.listen(process.env.PORT || 3000);
console.log("Server started!");
