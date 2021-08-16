const User= require('../models/userSchema')
const jwt= require('jsonwebtoken')

exports.getUsers=(req, res, next)=>{
    jwt.verify(req.token, process.env.JWT_KEY,function(err,data){
      if(err)
      res.status(401).json({
        message:"forbidden"
      })
      else{
   const users = User.find();// si on veut afficher tous les users
     res.json(users);
   };
  });
  };
   

exports.ensuretoken = (req, res, next) =>{
    const tokHeader = req.headers["authorization"];
    if (typeof tokHeader!="undefined"){
      const tokTab =  tokHeader.split(" ");
      const tokToken = tokTab [1];
      req.token = tokToken;
      next();
    }else{
      res.sendStatus(403);
    }
  }