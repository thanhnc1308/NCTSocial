const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const Log = require('./utils/Log');
const path = require('path');
// routes
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const mockRoute = require('./routes/mock');
const fileRoute = require('./routes/file');

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true
})
.then(() => {
    Log.info("Database connected!")
})
.catch(err => {
    Log.exception(err);
});

// middleware
app.use(express.json()); // body parser
app.use(helmet());
app.use(morgan('common'));
app.use(cors());
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// routes
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);
app.use('/api/mock', mockRoute);
app.use('/api/file', fileRoute);

app.get('/', (req, res) => {
    res.send('hello');
})

app.listen(8888, () => {
    Log.info("Database connected!")
})
