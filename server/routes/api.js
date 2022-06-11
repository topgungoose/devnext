const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();


router.post('/signup', userController.createUser, (req, res) => {
  res.status(200).send('Sign up succeed!');
});

router.post('/login', userController.verifyUser, (req, res) => {
  res.setHeader("Content-Type","application/json");
  //if it is verified
  if(res.locals.found)
  {
    res.status(200).send(JSON.stringify({success: true,message: 'Log in succeed!'}));
  }
  else 
  {
    //res.status(404).send('Log in failed!');
    res.status(404).send(JSON.stringify({success: false,message: 'Log in failed!'}));
  }
});

// router.get('/',
//   starWarsController.getCharacters,
//   (req, res) => res.status(200).json(res.locals.people)
// );

// router.post('/character',
//   starWarsController.addCharacter,
//   (req, res) => res.status(200).json(res.locals.oneCharacter)
// );

module.exports = router;
