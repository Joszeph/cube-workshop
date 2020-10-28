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

//Route to create page
router.get('/create', (req, res) => {
  res.render('create', {
    title: 'Create Cube | Cube Workshop'
  })
});

//Creating post request to create a new cube
router.post('/create', (req, res) => {
  const {
    name,
    description,
    imageUrl,
    difficultyLevel
  } = req.body

  const cube = new Cube({name, description, imageUrl, difficulty:difficultyLevel})

  cube.save((err) => {
    if(err){
      console.error(err)
      res.redirect('/create')
    }else{
      res.redirect('/')
    }  
  })
})

//Route to details of the cube
router.get('/details/:id', async (req, res) => {
  const cube = await getCubeWithAccessories(req.params.id)

    res.render('details', {
      title: 'Details | Cube Workshop',
      ...cube
    })
})


//Route to create a new accessory
router.get('/create/accessory', (req,res)=>{
  res.render('createAccessory',{
    title:'Create accessory'
  })
})


//Creating post request to create a new a accessory
router.post('/create/accessory', async (req,res)=>{
  
  const{
    name,
    description,
    imageUrl
  }=req.body

  const accessory = new Accessory({name,description, imageUrl})

  await accessory.save((err) => {
    if(err){
      console.error(err)
    }else{
      res.redirect('/create/accessory')
    }  
  })

  res.render('createAccessory',{
    title:'Create accessory'
  })
})


//Route to deatiled cube and his accessoies
router.get('/attach/accessory/:id',  async (req, res, next) => {
  const { id: cubeId } = req.params
  try {
    const data = await attachedAccessories(cubeId)

    res.render('attachAccessory', {
      title: 'Attach accessory',
      ...data,
    });
  } catch (err) {
    next(err)
  }
})

router.post('/attach/accessory/:id', async (req, res, next) => {
  const { accessory: accessoryId } = req.body
  const { id: cubeId} = req.params
  try {
    await updateCube(cubeId, accessoryId)
    res.redirect(`/details/${cubeId}`)
  } catch (err) {
    next(err)
  }
})


//Error page
router.get('*', (req, res) => {
  res.render('404', {
    title: 'Error | Cube Workshop'
  })
})

module.exports = router