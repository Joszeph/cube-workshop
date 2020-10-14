const Cube = require('../models/cube')

const newCube = new Cube('Default Cube', 'This is default cube', 'http://google.com', 1)
console.log(newCube);

newCube.save()