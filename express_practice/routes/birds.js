var express = require('express');

// create an instance of express router module.
var router = express.Router();

// add some middleware for this route.
router.use((req, res, next) => {
  console.log(`log time: ${new Date()}`);
  next();
});


router.get('/', (req, res) => {
  res.end('Birds root page');
});

// ideal way if the same path is shared between different HTTP methods.
router.route('/:id(\\d+)')
  .get((req, res) => {
    res.end(`Bird ID is ${req.params.id}`);
  });

// Normal way to use a path with only one method.
router.get('/:name', (req, res) => {
  res.end(`Bird name is ${req.params.name}`);
});



// order matters !!

// add some middleware for this route.
// router.use((req, res, next) => {
//   console.log(`log time: ${new Date()}`);
//   next();
// });

module.exports = router;
