let express = require('express');
let router = express.Router();
let youtubeTools = require('../tools/youtube')
let fs = require('fs');
const youtube = require('../tools/youtube');
const planningCenterApi = require('../tools/events');

/* GET home page. */
router.get('/', function (req, res, next) {


  res.render('index', {
    title: 'Vida Nueva',
    description: 'Una iglesia enfocade en Amor, Aceptacion, y Perdon. Nosotros creemos en el desarrollo de la madurez espiritual y familiar, la educación, y el desarrollo del carácter cristiano por medio de la Fe.',
  });

  // youtubeTools.isLiveNow(function (data) {
  //   if (data.items.length > 0) {

  //     return res.render('index', {
  //       title: 'Vida Nueva',
  //       description: 'Estamos en Vivo ahora! Unete con nosotros para escuchar la palabra de Dios con nuestro Pastor Mario Zambrano! Estamos en vivo todos los Domingos a las 3pm!',
  //       liveNow: true
  //     });

  //   } else {

  //     res.render('index', {
  //       title: 'Vida Nueva',
  //       description: 'Una iglesia enfocade en Amor, Aceptacion, y Perdon. Nosotros creemos en el desarrollo de la madurez espiritual y familiar, la educación, y el desarrollo del carácter cristiano por medio de la Fe.',
  //     });
  //   }

  // });

});

router.get('/mensajes', function (req, res, next) {

  youtubeTools.isLiveNow(function (data) {

    if (data.items && data.items.length > 0) {
      res.render('mensajes', {
        title: 'Mensajes',
        description: 'Estamos en Vivo ahora! Unete con nosotros para escuchar la palabra de Dios con nuestro Pastor Mario Zambrano! Estamos en vivo todos los Domingos a las 3pm!',
        livestream: `https://www.youtube.com/embed/${data.items[0].id.videoId}?autoplay=1`
      });

    } else if (data.items) {
      youtubeTools.getVideosList(function (videos) {
        res.render('mensajes', {
          title: 'Mensajes',
          description: 'Escucha nuestros mensajes recientes de la Iglesia Cuadrangular Vida Nueva en San Leandro, CA. Una iglesia enfocada en Amor, Aceptacion, y Perdon.',
          videos: videos
        });
      });
    } else {
      res.render('mensajes', {
        title: 'Mensajes',
        description: 'Escucha nuestros mensajes recientes de la Iglesia Cuadrangular Vida Nueva en San Leandro, CA. Una iglesia enfocada en Amor, Aceptacion, y Perdon.',
      });
    }

  });
});

router.get('/conectate', function (req, res, next) {
  fs.readFile('data/conectate_data.json', (err, data) => {
    if (err) throw err;
    let leader_data = JSON.parse(data);
    res.render('conectate', {
      title: 'Conectate',
      description: 'Conectate con nuestra iglesia. Nuestra familia te la bienvenida para todos los hombres, mujeres, jovenes, y niños. Tu familia te esta esperando!',
      leaders: leader_data
    });
  });
});

router.get('/eventos', function (req, res, next) {
    planningCenterApi.fetchEventsFromAPI((eventsData) => {
        if (eventsData && eventsData.data) {
            res.render('eventos', {
                title: 'Eventos',
                description: 'Mantente acutalizado con nuestros eventos de crecimiento y aprendizaje!',
                events: eventsData.data
            });
        } else {
            console.error('Failed to fetch events from planning center:', eventsData ? eventsData : 'unkown error')
            res.render('eventos', {
                title: 'Eventos',
                description: 'Mantente acutalizado con nuestros eventos de crecimiento y aprendizaje!',
                events: []
            });
        }
    })
});

router.get('/creemos', function (req, res, next) {
  res.render('creemos', {
    title: 'Creemos',
    description: 'Esta es una denominación eminentemente pentecostal en su doctrina y forma de adoración. La Iglesia Cuadrangular se llama así porque la doctrina de la iglesia reconoce cuatro aspectos principales de Jesucristo.'
  });
});

router.get('/donar', function (req, res, next) {
  res.render('donar', {
    title: 'Donar',
    description: 'Dona a tu Iglesia Vida Nueva.'
  });
});


router.get('/beca', function (req, res, next) {
  res.render('beca', {
    title: 'Vida Nueva Impulso Academico Scholarship',
    description: 'Vida Nueva Impulso Académico Scholarship. Esta beca proporcionará apoyo financiero a cada candidato que es elegido basado en su estatus educativo, membresía de la Iglesia Vida Nueva, y al compromiso al estudio o carrera.'
  })
})

router.get('/registrar', function (req, res, next) {
  res.redirect('https://tuvidanuevasl.churchcenter.com/registrations')
});

router.get('/yt', function (req, res, next) {
  res.redirect('https://www.youtube.com/c/VidaNuevaSanLeandro')
});


router.get('/robots.txt', function (req, res, next) {
  res.type('text/plain')
  res.send("Crawl-delay: 120");
});


module.exports = router;
