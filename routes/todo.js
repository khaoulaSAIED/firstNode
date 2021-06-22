var express = require('express');
var router = express.Router();
const Todo = require ('../models/todoSchema')


/* GET */
router.get('/getTodos', async(req, res, next)=> {
  const todos = await Todo.find();// si on veut afficher tous les todos
  res.json(todos);
});

//get a specified todo by id 
router.get('/getTodoByID/:id', async(req, res, next)=> {
  const todo = await Todo.findById(req.params.id);// si on veut afficher tous les todos
  res.json(todo);
});

//get a specified todo by name
router.get('/getTodoByNAME', async(req, res, next)=> {
  const todo = await Todo.find({name: req.query.name});// si on veut afficher un todo spécifique statiquement
  res.json(todo);
});


//******API :ADD
router.post('/addTodo', async(req, res, next)=>{
  //ajout dynamique
  const todo = new Todo (req.body);
 await todo.save();//pour attendre jusqu à ce que l ajout se termine avant de passer à l instruction suivante
 
  res.json(todo);
  
}); 

//******DELETE */
router.delete('/deleteTodo/:id', async(req, res, next)=>{
  const todo = await Todo.findByIdAndDelete(req.params.id);
  res.json(todo);
});

//******Update */

router.put('/updateTodo/:id', async(req, res, next)=>{
   const todo = await Todo.findByIdAndUpdate(req.params.id,
   {
    name: req.query.name })//pour changer qqch saisie, query!!                        
     res.json(todo);
     
 });


module.exports = router;
