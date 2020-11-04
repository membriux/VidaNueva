let express = require('express');
let router = express.Router();

/* GET Kids page. */
router.get('/kids', function(req, res, next) {
  res.render('familia/kids', { 
    title: 'Vida Kids',
    description: 'Niños de Vida Nueva.',
  });
});

/* GET Jovenes page. */
router.get('/jovenes', function(req, res, next) {
  res.render('familia/jovenes', { 
    title: 'Jovenes',
    description: 'Jovenes de Vida Nueva.',
  });
});


/* GET Matrimonios page. */
router.get('/matrimonios', function(req, res, next) {
  res.render('familia/matrimonios', { 
    title: 'Matrimonios',
    description: 'Aprende lo que dice la Biblia sobre el matrimonio.',
  });
});

/* GET Varones page. */
router.get('/varones', function(req, res, next) {
  res.render('familia/varones', { 
    title: 'Varones',
    description: 'Varones de Vida Nueva',
  });
});

/* GET Mujeres page. */
router.get('/mujeres', function(req, res, next) {
  res.render('familia/mujeres', { 
    title: 'Mujeres',
    description: 'Mujeres de Vida Nueva',
  });
});

module.exports = router;
