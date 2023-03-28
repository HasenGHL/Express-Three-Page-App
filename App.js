const express = require('express');
const app = express();
const path = require('path');
const port = 4000;

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));

const workingHoursMiddleware = (req, res, next) => {
    const date = new Date();
    const dayOfWeek = date.getDay();
    const hour = date.getHours();
  
    if (dayOfWeek > 0 && dayOfWeek < 6 && hour >= 9 && hour < 17) {
      next();
    } else {
      res.sendFile(__dirname + '/views/OutofService.html');
    }
  };
  
  app.use(workingHoursMiddleware);

  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/home.html');
  });
   
  app.get('/services', (req, res) => {
    res.sendFile(__dirname + '/views/services.html');
  });
  
  app.get('/contact', (req, res) => {
    res.sendFile(__dirname + '/views/contact.html');
  });

  app.listen(port, function(){
    console.log('The server is running, ' +
        ' please, open your browser at http://localhost:%s', 
        port);
  });