let express = require('express');
let router = express.Router();
let youtubeTools = require('../tools/youtube')
let fs = require('fs');
const youtube = require('../tools/youtube');

/* GET home page. */
router.get('/', function(req, res, next) {

  youtubeTools.isLiveNow( function(data) {
    if (data.items.length > 0) {
    
      return res.render('index', {
        title: 'Vida Nueva',
        description: 'Estamos en Vivo ahora!',
        liveNow: true
      });

    } else {
    
      res.render('index', { 
        title: 'Vida Nueva',
        description: 'Una iglesia enfocade en Amor, Aceptacion, y Perdon',
      });
    }

  })
});

router.get('/mensajes', function(req, res, next) {

  youtubeTools.isLiveNow( function(data) {
    if (data.items.length > 0) {
      res.render('mensajes', {
        title: 'Mensajes',
        description: 'En Vivo ahora!',
        livestream: `https://www.youtube.com/embed/${data.items[0].id.videoId}?autoplay=1`
      });

    } else {
      youtubeTools.getVideosList( function(videos) {
        res.render('mensajes', {
          title: 'Mensajes', 
          description: 'Escucha nuestros mensajes recientes',
          videos: videos
        });
      });
    }

  });
});

router.get('/conectate', function(req, res, next) {
  fs.readFile('data/conectate_data.json', (err, data) => {
    if (err) throw err;
    let leader_data = JSON.parse(data);
    res.render('conectate', {
      title: 'Conectate', 
      description: 'Conectate con nuestra iglesia',
      leaders: leader_data
    });
  });
 
});

router.get('/creemos', function(req, res, next) {
  res.render('creemos', {
    title: 'Creemos', 
    description: 'Conoce sobre lo que cree la iglesia cuadrangular.'
  });
});

router.get('/donar', function(req, res, next) {
  res.render('donar', {
    title: 'Donar', 
    description: 'Dona a tu Iglesia Vida Nueva'
  });
});

router.get('/registrar', function(req, res, next) {
  res.redirect('https://tuvidanuevasl.churchcenter.com/registrations')
});

router.get('/beca', function(req, res, next) {
  res.render('beca', {
    title: 'Vida Nueva - Beca',
    description: 'Aplica hoy!'
  })
})

router.get('/test', function(req, res, next) {
  res.render('test', {
    title: 'Test'
  });
});

router.get('/robots.txt', function (req, res, next) {
  res.type('text/plain')
  res.send("Crawl-delay: 120");
});



module.exports = router;
