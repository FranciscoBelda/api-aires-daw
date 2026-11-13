const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v2/airespepito', require('./routes/aire.route'));
app.use('/', (req, res) => res.status(404).json({
    message: 'Endpoint not found. API is in',
    URL: 'http://localhost:3000/api/v2/airespepito',
}));

app.listen(app.get('port'), () => {
    console.log(`Listening on port ${app.get('port')}`);
})


