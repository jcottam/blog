const express = require('express')
const app = express()

// MULTER
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function(req, file, cb) {
    console.log(file)
    cb(null, file.originalname)
  }
})

// POST ROUTE
app.post('/upload', (req, res, next) => {
  const upload = multer({ storage }).single('name-of-input-key')
  upload(req, res, function(err) {
    if (err) {
      return res.send(err)
    }

    console.log('file uploaded to server')
    console.log(req.file)

    // SEND FILE TO CLOUDINARY
    const cloudinary = require('cloudinary').v2
    cloudinary.config({
      cloud_name: 'sharethroughgallery',
      api_key: '685687633298392',
      api_secret: 'I2fP2qLCWIDdEs2dixZrWHay2Uo'
    })

    const path = req.file.path
    const uniqueFilename = new Date().toISOString()

    cloudinary.uploader.upload(
      path,
      { public_id: `blog/${uniqueFilename}`, tags: `blog` }, // directory and tags are optional
      function(err, image) {
        if (err) return res.send(err)
        console.log('file uploaded to Cloudinary')

        var fs = require('fs')
        fs.unlinkSync(path)

        res.json(image)
      }
    )
  })
})

app.listen(3000)
