const express = require('express');
const router = express.Router();
const User = require('../models/user');
const multer = require('multer');
const fs = require('fs'); 
// Multer configuration (if needed)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './upload');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage }).single("image");

// Insert a user in routes
router.post('/add',upload, async (req, res) => {
  try {
    const user = new User({
      name: req.body.firstname,
      email: req.body.email,
      phone: req.body.phone,
      image: req.file.filename,
    });

    await user.save();

    req.session.message = {
      type: 'success',
      message: 'User added successfully',
    };
    

    res.redirect('/');
  } catch (err) {
    res.json({ message: err.message, type: 'danger' });
  }
});
//get all ecord
router.get('/', async (req, res) => {
  try {
    const users = await User.find().exec();

    // Log the retrieved users for debugging
    console.log(users);

    res.render('index', {
      title: 'Home Page',
      users: users,
    });
  } catch (err) {
    // Log the error for debugging
    console.error(err);
    res.json({ message: err.message });
  }
});


router.get('/add', (req, res) => {
  res.render('adduser', { title: 'Add user' });
});
//edit profile
// Edit profile route
// Edit profile route
router.get('/edit/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id).exec();

    if (!user) {
      res.redirect('/');
    } else {
      res.render("edit", {
        title: "Edit user",
        user: user,
      });
    }
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});
//update
router.post('/update/:id', upload, async (req, res) => {
  try {
    const id = req.params.id;
    let new_image = req.body.old_image; // Initialize with the old image

    if (req.fil) {
      new_image = req.fil.filename; // Update with the new image filename
      try {
        fs.unlinkSync('./upload/' + req.body.old_image); // Remove the old image file
      } catch (err) {
        console.error(err);
      }
    }

    // Update user data using findByIdAndUpdate
    const updatedUser = await User.findByIdAndUpdate(id, {
      name: req.body.firstname,
      email: req.body.email,
      phone: req.body.phone,
      image: new_image,
    }, { new: true });

    if (!updatedUser) {
      return res.redirect('/');
    }

    // Redirect or respond with a success message
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});
//delete
router.delete('/delete/:id', async (req, res) => {
  try {
    const id = req.params.id;
    
    // Use Mongoose to find the document by ID and remove it
    const deletedDocument = await user.findByIdAndRemove(id);

    if (!deletedDocument) {
      return res.status(404).json({ message: 'Document not found' });
    }

    // Respond with a success message or status
    res.status(200).json({ message: 'Document deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
module.exports = router;
