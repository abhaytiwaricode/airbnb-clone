const express = require('express');
const router = express.Router();
const User = require('./models/User');
const Place = require('./models/Place');
const Booking = require('./models/Booking');
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const imageDownloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs');

const jwtSecret = 'your_secret_key_here';

function getUserDataFromToken(req) {
    return new Promise((resolve, reject) => {
        jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            resolve(userData);
        });
    });
}


// Validation middleware for register route
const validateRegister = [
    check('name').notEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('Invalid email'),
    check('password')
        .isLength({min: 6})
        .withMessage('Password must be at least 6 characters long'),
];

// Validation middleware for login route
const validateLogin = [
    check('email').isEmail().withMessage('Invalid email'),
    check('password').notEmpty().withMessage('Password is required'),
];

router.get('/test', (req, res) => {
    res.json('test okk!');
});

router.post('/register', validateRegister, async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    try {
        const {name, email, password} = req.body;
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({error: 'User already exists'});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({name, email, password: hashedPassword});
        await user.save();
        res.json(user);
    } catch (err) {
        res.status(500).json({error: 'Server error'});
        next(err);
    }
});

router.post('/login', validateLogin, async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if (!user) {
            return res.status(404).json({error: 'User not found'});
        }
        const passOk = await bcrypt.compare(password, user.password);
        if (!passOk) {
            return res.status(422).json({error: 'Incorrect password'});
        }
        const token = jwt.sign({email: user.email, id: user._id}, jwtSecret, {
            expiresIn: '1h',
            algorithm: 'HS256',
        });
        res
            .cookie('token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'None',
            })
            .json({message: 'Correct password', token});
    } catch (err) {
        next(err);
    }
});

router.get('/profile', async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({error: 'Unauthorized'});
        }
        const userData = jwt.verify(token, jwtSecret);
        const {name, email, _id} = await User.findById(userData.id);
        res.json({name, email, _id});
    } catch (err) {
        res.status(401).json({error: 'Unauthorized'});
    }
});

router.post('/logout', (req, res) => {
    res.clearCookie('token', {httpOnly: true, secure: true}).json(true);
});

router.post('/upload-by-link', async (req, res) => {
    const {link} = req.body;
    const newName = 'photo' + Date.now() + '.jpg';
    await imageDownloader.image({
        url: link,
        dest: __dirname + '/uploads/' + newName,
    });
    res.json(newName);
});

const photosMiddleware = multer({dest: 'uploads'});

router.post('/upload', photosMiddleware.array('photos', 100), (req, res) => {
    const uploadFiles = [];
    for (let i = 0; i < req.files.length; i++) {
        const {path, originalname} = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
        uploadFiles.push(newPath.replace('uploads', ''));
    }
    res.json(uploadFiles);
});

router.post('/places', async (req, res) => {
    try {
        const token = req.cookies.token;
        const {
            title,
            address,
            addedPhotos,
            description,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,
            price,
        } = req.body;
        const userData = jwt.verify(token, jwtSecret);
        const placeDoc = await Place.create({
            owner: userData.id,
            title,
            address,
            photos: addedPhotos,
            description,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,
            price,
        });
        res.json(placeDoc);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.get('/user-places', async (req, res) => {
    try {
        const token = req.cookies.token;
        const userData = jwt.verify(token, jwtSecret);
        const {id} = userData;
        const places = await Place.find({owner: id});
        res.json(places);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.get('/places/:id', async (req, res) => {
    const {id} = req.params;
    res.json(await Place.findById(id));
});

router.put('/places/:id', async (req, res) => {
    const {id} = req.params;
    const {token} = req.cookies;
    const {
        title,
        address,
        addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
    } = req.body;

    try {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const placeDoc = await Place.findById(id);
            if (userData.id === placeDoc.owner.toString()) {
                placeDoc.set({
                    title,
                    address,
                    photos: addedPhotos,
                    description,
                    perks,
                    extraInfo,
                    checkIn,
                    checkOut,
                    maxGuests,
                    price,
                });
                await placeDoc.save();
                res.json('ok');
            } else {
                res.status(403).json({message: 'Unauthorized'});
            }
        });
    } catch (error) {
        res.status(500).json({message: 'Server Error'});
    }
});

router.get('/places', async (req, res) => {
    res.json(await Place.find());
});

router.post('/bookings', async (req, res) => {
    const userData = await getUserDataFromToken(req);
    const {
        place, checkIn, checkOut, numberOfGuests, name, phone, price
    } = req.body;
    Booking.create({
        place, checkIn, checkOut, numberOfGuests, name, phone, price, user: userData.id
    }).then((doc) => {
        res.json(doc);
    }).catch((err) => {
        throw err;
    });
});

router.get('/bookings', async (req, res) => {
    const userData = await getUserDataFromToken(req);
    res.json(await Booking.find({user: userData.id}).populate('place'));
});


module.exports = router;
