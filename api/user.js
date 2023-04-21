import express from 'express';
import joi from 'joi';
const router = express.Router();

let users = [];
let id=0;

router.use(express.json());

const userSchema = joi.object({
    name: joi.string().min(4).required(),
    email: joi.string().email().required(),
    password: joi.string().min(8).required()
  });

router.post('/', (req,res) => {
    console.log(req.body);
    const user = req.body;
    const { error, value } = userSchema.validate(user);
    if (error) {
      res.status(400).send(error.details[0].message);
    } else {
      id += 1;
      user['id'] = id;
      users.push(user);
      res.send('User created successfully');
    }
});

router.get('/', (req, res) => {
  const list = users.map(user => {
    return {id: user.id, name: user.name, email: user.email};
})
    res.send(list);
});

router.get('/:id', (req,res) => {
  const obj = users.find(obj => obj.id === parseInt(req.params.id))
  if (obj) {
    // If the user exists, return only the name and email fields
    const { name, email } = obj;
    res.json({ name, email });
  } else {
    // If the user doesn't exist, return a 404 status code and an error message
    res.status(404).json({ error: 'User not found' });
  }
});

router.put('/:id', (req, res) => {
 try {
  console.log(req.body);
  const obj = users.find(obj => obj.id === parseInt(req.params.id))
  const userData = req.body;

  if (!obj) {
    return res.status(404).send('User not found');
  }

  obj.name = userData.name;
  obj.email = userData.email;
 } catch (error) {
  console.error(err);
    res.status(500).send('Internal Server Error');
 }
});

router.delete('/:id', (req,res) => {
  const obj = users.find(obj => obj.id === parseInt(req.params.id))

  if(obj){
    users.splice(obj);
    res.send("user deleted successfully");
  }
});

export default router;