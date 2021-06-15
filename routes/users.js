var express = require('express');
var router = express.Router();
const User = require ('../models/userSchema')

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
router.post('/addUser', async(req, res, next)=>{
  //ajout dynamique
  const user = new User (req.body);
 await user.save();//pour attendre jusqu à ce que l ajout se termine avant de passer à l instruction suivante
  //ajout statique
  //const user = new User ({
  //  name:"lamia",
  //  age:2
  //});

  //user.save();
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


module.exports = router;
