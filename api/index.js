const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routes = require('./routes');
const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => {
        console.error('MongoDB connection error:', err.message);
        process.exit(1); // Exit the process on connection error
    });

// Routes
app.use('/', routes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(err.message || 'Something broke!');
});

app.listen(port, () => {
    console.log(`App is listening on port : ${port}`);
});
