var express = require('express');
var router = express.Router();
const User = require ('../models/userSchema');
const Todo = require ('../models/todoSchema');
const nodemailer = require("nodemailer");
const { getMaxListeners } = require('../models/userSchema');
const jwt= require('jsonwebtoken');
//Envoi d image
var multer  = require('multer')
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');//le chemin du fichier où on va stocker la photo: uploads
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
  }
});
const upload = multer({
  storage: storage,
});
///////////////////////////Fin Envoi d image Voir API

//Pour crypter
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

//////////FIn crypter
//process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

///definir les routes sous users

/* GET users listing. */
router.get('/getUsers', async(req, res, next)=> {
  const users = await User.find();// si on veut afficher tous les users
  res.json(users);
});

//get a specified user by id 
router.get('/getUserByID/:id', async(req, res, next)=> {
  const user = await User.findById(req.params.id);// si on veut afficher tous les users
  res.json(user);
});

//get a specified user by name
router.get('/getUserByNAME', async(req, res, next)=> {
  const user = await User.find({name: req.query.name});// si on veut afficher un user spécifique statiquement
  res.json(user);
});


//******ADD
router.post('/Register', async(req, res, next)=>{
  //ajout dynamique
  const user = new User (req.body);
  console.log(user.email);
  if (user.email == ""){res.json("Email Required!");}
  else
  {
  const sed = await User.find({email: user.email});
  console.log(sed);
  if(sed.length > 0) {res.json("Email already used!");}
  else if(user.password== "") {res.json("password required!");}
  else{
  //cryptage du password
  const hash = await bcrypt.hash(user.password, saltRounds);
  user.password = hash;

  //FIN cryptage du password
 await user.save();//pour attendre jusqu à ce que l ajout se termine avant de passer à l instruction suivante
}
}
 //ajout statique
  //const user = new User ({
  //  name:"lamia",
  //  age:2
  //});

  //user.save();
  res.json(user);

});
////////////////API LOGIN
router.get('/Login', async(req, res, next)=> {
  const user = await User.findOne({email: req.query.email});//find matemchich 5ater tarja3 array
  console.log (user);
  //console.log (user.password);
 
  if(user)
  {const compare = await bcrypt.compare(req.query.password, user.password);
    console.log(compare);
     if (compare == true)
    //if (user.password == req.query.password)
    {res.json("you are logged in!");}
    else { res.json("Incorrect password!");}
  }
  else { res.json("Incorrect email!");}
  
});
//******ADD-TODO-TO-USER
router.post('/affectTodoToUser/:userId/:todoId', async(req, res, next)=>{
  const todo = await Todo.findById(req.params.todoId);//Vérifier si TODO exist avant d affecter au user
  const user = await User.findById(req.params.userId);
  console.log(todo);
  if (!todo){ 
    console.log("Id introuvable");
     res.json(`No todo with that id of ${req.params.todoId}`);
   // res.json(err);
  }
  
  else if(!user)
   {console.log("User introuvable");
    res.json(`No user with that id of ${req.params.userId}`);
   }
    else{
const user = await User.findByIdAndUpdate(req.params.userId, {$push :{todo: req.params.todoId}});//$push et pull=utile uniquement pour un tableau
 res.json(user);
  }
});
/*
//******ADD-TODO-TO-USER
router.post('/affectTodoToUser/:userId/:todoId', async(req, res, next)=>{
 // const todo = await Todo.findById(req.params.todoId);//Vérifier si TODO exist avant d affecter au user
  //console.log(todo);
  
const user = await User.findByIdAndUpdate(req.params.userId, {$push :{todo: req.params.todoId}});
 res.json(user)
  
});*/
//******Delete-TODO-From-USER
router.post('/deleteTodoFromUser/:userId/:todoId', async(req, res, next)=>{
  const user = await User.findByIdAndUpdate(req.params.userId, {$pull :{todo: req.params.todoId}});
  //on lui donne deux id, le premier celui du user qu on cherche, le deuxieme celui du todo qu on veut suupprimer
  res.json(user);
  });

//******DELETE */
router.delete('/deleteUser/:id', async(req, res, next)=>{
  const user = await User.findByIdAndDelete(req.params.id);
  res.json(user);
});

//******Update */



/*router.put('/updateUser/:id', async(req, res, next)=>{
  const user = await User.findByIdAndUpdate(req.params.id);
  res.json(user);
});*/

// Find a document whose 
// user_id=5eb985d440bd2155e4d788e2 and update it
// Updating name field of this user_id to name='Gourav'
/*

router.route("/update").post(function(req, res) {
  kennels.findByIdAndUpdate(
    { _id: "5db6b26730f133b65dbbe459" },
    { breed: "Great Dane" },
    function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});*/


//*****PUT avec id statique */
/*router.put('/updateUser/:id', async(req, res, next)=>{
 var user_id = '60c474b81d5eb85740732afd';
 //const user = await User.findByIdAndUpdate(user_id,{age: req.body.age})

  const user = await User.findByIdAndUpdate(user_id, {age: req.body.age})
  
                            
    res.json(user);
    
});*/

/************UPDATE NEwwww */
router.put('/updateUser/:id', async(req, res, next)=>{
   const user = await User.findByIdAndUpdate(req.params.id,
   { age: req.query.age,
    name: req.query.name })//pour changer qqch saisie, query!!
   //const user = await User.findByIdAndUpdate(req.params.id, {name: req.query.name}) pour modifier le nom
                             
     res.json(user);
     
 });

//API:Envoyer un email
// router.put('/SendEmailToUser/:idSender/:idReceiver', async(req, res, next)=>{
  router.put('/SendEmailToUser', async(req, res, next)=>{


// async..await is not allowed in global scope, must use a wrapper
//async function main() {
  // Generate test SMTP service account from ethereal.email
 
  // Only needed if you don't have a real mail account for testing
  //let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
     user: "khaoula.saied@gmail.com",//sender
     pass: "halima2020@",//mot d passe du sender
    },
  });

  // send mail with defined transport object
  let info= await transporter.sendMail({
    from: 'khaoula.saied@gmail.com', // sender address
    to: "khaoula.saied@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });
  res.json("Mail Sent!");

});

//Api ajout d image to a user
 router.post('/AffectPhotoToUser/:userId', upload.single('photo'), async(req, res, next)=> {
  // req.file is the `photo` file
  //upload.single('photo'), photo c  key du file ds postman 
 await User.findByIdAndUpdate(req.params.userId, {photo: req.file.path});
  console.log(req.file);
  res.json("Photo added!");
})

//API envoyer un fichier de type image from one user to another

router.post('/SendEmailToUserWithFile/:idSender/:idReceiver', async(req, res, next)=>{
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
       user: "khaoula.saied@gmail.com",//sender
       pass: "halima2020@",//mot d passe du sender
      },
    });
    const sender = await User.findById(req.params.idSender);
    const receiver = await User.findById(req.params.idReceiver);
    // send mail with defined transport object
    await transporter.sendMail({
      from: `${sender.email}` , // sender address//req.query.IdSender
      to: `${receiver.email}`, // list of receivers//req.query.IdReceiver
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: `<b>Hello world?</b><a href='localhost:3000/${sender.photo}'>click here</a>`, // html body
      //file: req.query.photo
      //or
      // attachments: [{
      // filename: 'airplane.png',//req.query.photo
      // path: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png'}]
    });
    res.json("Photo Sent in Mail!");
  
  });
 
//   //check if password is correct à voir
//   router.get('/checkPassword/:id', async(req, res, next)=>{
//   // Load hash from your password DB.
// bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
//   // result == true
// });
// bcrypt.compare(someOtherPlaintextPassword, hash, function(err, result) {
//   // result == false
// });
// });
module.exports = router;
