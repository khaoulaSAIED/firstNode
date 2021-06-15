const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/myDB',//nom de mon Database
{useNewUrlParser: true,
useUnifiedTopology: true,
useFindAndModify: false,// pour se débarrasser des warnings ds le console
//useCreateIndex: true
}).then(
    result => { /** ready to use. The `mongoose.connect()` promise resolves to mongoose instance. */
   console.log('connected to database');
}).catch(
   err => { /** handle initial connection error */
 console.log('error'); } 
  );