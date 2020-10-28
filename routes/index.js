const {Router}= require('express')
const {getAllCubes, getCube, updateCube, getCubeWithAccessories} = require('../controllers/cubes')
const {attachedAccessories} = require('../controllers/accessories')
const Cube = require('../models/cube')
const Accessory = require('../models/accessory')

const router = Router()

//Rendering all cubes
router.get('/', async (req, res) => {
  const cubes = await  getAllCubes()
    res.render('index', {
      title: 'Cube Workshop',
      cubes
    })
});

//Route to about page
router.get('/about', (req, res) => {
  res.render('about', {
    title: 'About | Cube Workshop'
  })
});

//Error page
router.get('*', (req, res) => {
  res.render('404', {
    title: 'Error | Cube Workshop'
  })
})


module.exports = router