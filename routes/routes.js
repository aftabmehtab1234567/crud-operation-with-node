const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const multer = require('multer');
const fs = require('fs'); 
<<<<<<< HEAD
=======
const requireAuth = require('../Middleware/Auth'); // Correct the path as needed

/// Apply requireAuth middleware to routes that require authentication

>>>>>>> 9ccf282 (hi)

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
<<<<<<< HEAD
router.post('/add', upload, async (req, res) => {
=======
router.post('/add',requireAuth, upload, async (req, res) => {
>>>>>>> 9ccf282 (hi)
  try {
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      // If a user with the same email already exists, send an error message
      req.session.message = {
        type: 'danger',
        message: 'User already exists with this email',
      };
      res.redirect('/'); // Redirect to the appropriate view or page
    } else {
      // If the email is unique, create and save the new user
      const user = new User({
        name: req.body.firstname,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        image: req.file.filename,
      });

      await user.save();

      req.session.message = {
        type: 'success',
        message: 'User added successfully',
      };
      res.redirect('/'); // Redirect to the appropriate view or page
    }
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


<<<<<<< HEAD
router.get('/add', (req, res) => {
=======
router.get('/add',requireAuth, (req, res) => {
>>>>>>> 9ccf282 (hi)
  res.render('adduser', { title: 'Add user' });
});
//edit profile
// Edit profile route
// Edit profile route
<<<<<<< HEAD
router.get('/edit/:id', async (req, res) => {
=======
router.get('/edit/:id',requireAuth, async (req, res) => {
>>>>>>> 9ccf282 (hi)
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
<<<<<<< HEAD
router.post('/update/:id', upload, async (req, res) => {
=======
router.post('/update/:id',requireAuth, upload, async (req, res) => {
>>>>>>> 9ccf282 (hi)
  try {
    const id = req.params.id;
    let new_image = req.body.old_image; // Initialize with the old image
    if (req.file) {
      new_image = req.file.filename; // Update with the new image filename
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
<<<<<<< HEAD
router.get('/delete/:id', async (req, res) => {
=======
router.get('/delete/:id',requireAuth, async (req, res) => {
>>>>>>> 9ccf282 (hi)
  try {
    const id = req.params.id;

    // Use Mongoose to find the document by ID and remove it
    const deletedDocument = await User.findOneAndDelete({ _id: id });

    if (!deletedDocument) {
      return res.status(404).json({ message: 'Document not found' });
    }

    // Respond with a success message
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const check = await User.findOne({ email: req.body.email });
<<<<<<< HEAD
    
    if (check && check.password === req.body.password) {
      // If email and password match, render the desired page (e.g., home)
      req.session.user = check;
      res.redirect('/'); // Replace 'home' with the appropriate view name
    } else {
      // If email or password is incorrect, send an error message
=======

    if (check && check.password === req.body.password) {
      // If email and password match, set a session variable to indicate authentication
      req.session.isAuthenticated = true;
      req.session.userId = check._id; // Use _id from the check object

      // Check if the session is active (req.session.isAuthenticated is truthy)
      if (req.session.isAuthenticated) {
        console.log('session active');
        res.redirect('/'); // Redirect to the desired page after successful login
      } else {
        // Handle the case where req.session.isAuthenticated is not truthy (unlikely if check is defined)
        console.log('session not active');
        res.redirect('/login'); // Redirect to the login page
      }
    } else {
      // If email or password is incorrect, send an error message
      req.session.message = {
        type: 'danger',
        message: 'Incorrect email or password',
      };
>>>>>>> 9ccf282 (hi)
      res.redirect('/login');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
<<<<<<< HEAD
router.get('/logout', (req, res) => {
  // Clear any existing session timeout
  if (req.session.timeout) {
    clearTimeout(req.session.timeout);
  }

=======


// Other protected routes can be defined similarly

// Logout Route (Available to all users, including non-authenticated)
router.get('/logout', (req, res) => {
>>>>>>> 9ccf282 (hi)
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
    } else {
<<<<<<< HEAD
      res.redirect('/login');
    }
  });
});
// Route to check if a session is active (example)
=======
      res.redirect('/'); // Redirect to the login page after logout
    }
  });
});

>>>>>>> 9ccf282 (hi)


module.exports = router;
