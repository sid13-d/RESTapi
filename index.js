import express from 'express';
import user from './api/user.js';

var app = express();

 app.use('/api/user', user);

app.listen(3000, () => {
    console.log("app listening on port 3000");
});