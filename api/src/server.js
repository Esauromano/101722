require('dotenv').config({path: ('apiConfig.env')});
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const port = process.env.SERVER_PORT;
//add new router
const commentsRoutes = require('./modules/comments/routes');
require('./config/database'); 

app.use(cors({
    origin: true,
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/html')); 

app.get('/api/', (req, res) => {
   res.send('wellcome to api API')
})
//add new route
app.use('/api/comments', commentsRoutes);
app.listen(port, console.log(`server started on port ${port}`));