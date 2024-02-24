const multer = require('multer');
const path = require('path');
const db = require('./models/model.js');
//const db = require('../models/model')

const Product = db.users;
const user = db.products;

const express = require('express')
// import low from 'lowdb';
// import FileSync from 'lowdb/adapters/FileSync';
const bcrypt= require('bcrypt')
var cors = require('cors')
const jwt = require('jsonwebtoken')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync');
const app = express();

//middelware

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(express.static('public'));
//app.use(express.static('public/images'));
//routers
const routerp = require('./routes/prodectRouter.js')
app.use('/api/products', routerp)

const routeru = require('./routes/userRouter.js')
app.use('/api/users', routeru)


//var adapter = new FileSync('./database.json')
var adapter = new FileSync('./database.json')
//var db = low(adapter)
const crypto = require('crypto');
const PORT = 8000;
app.listen(PORT, () => console.log(`Server started at port:${PORT}`))

const secretKey = crypto.randomBytes(32).toString('hex');


//upload images

const storage = multer.diskStorage(
    {
        destination: (req, res, cb) => {
            cb(null,'public/images' )
        },
        filename: (req, file, cb) => {
            cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
        }
    }
)


const upload = multer(
    { storage: storage}
)



app.post('/upload', upload.single('image'),async (req,res) => {
   const image = req.file.filename;
   console.log(image)
   console.log(req.body.id)
  const product = await user.update({imageUrl: image}, {where:{id:req.body.id}})
})

app.post('/upupload', upload.single('image'),async (req,res) => {
    const image = req.file.filename;
    console.log(image)
    console.log(req.body.title)
   const product = await user.update({imageUrl: image}, {where:{title:req.body.title}})
 })











//rest apis for login and registration



app.get('/', async (req,res) => {
    const product = await user.findAll();
    return res.json(product)
})

// for login
app.post('/auth', async (req,res) => {
    // const {email, password} = req.body;
    // //console.log(email);
    // //const user1 = [(db.get('users').value())];
    // //console.log(user1)
    // //const user = user1.filter((user) => email === user.email)
    // const user = db
    // .get('users')
    // .value()s
    // .filter((user) => email === user.email)
    
    //console.log(user[0].password)
    //console.log(hashedPassword)

    let info = {
        email: req.body.email,
        password: req.body.password
      }
      email = info.email
  
    const user = [await Product.findOne({where:{email:info.email}})];
    //const user1 = user.filter((user) => info.email === user.email)
    //console.log(user)
    //console.log(user1.length)
    //console.log(user.length)
    // console.log(email);
    // console.log(password);
    // console.log(user[0].password)
  

    if(user[0] === null){
        return res.status(401).json({ message: 'Email is not registered' })

    }
    else{ 
       const hashedPassword = bcrypt.hashSync(info.password, 10);
       //console.log(info.password)
       //console.log(user.password)
       bcrypt.compare(info.password, user[0].password, function(err, result){
          //console.log(result)
        if(err){console.log('Error', err);
        return;}
        
          if(result){
            let LoginData = {
                email, signInTime: Date.now()
               // exp: Math.floor(Date.now() / 1000) + (3 * 24 * 60 * 60) 
            }
            const token = jwt.sign(LoginData, secretKey);
            res.status(200).json({message:'success',token})

          }
          else{
            return res.status(401).json({ message: 'Invalid password' })
          }
       })


    }


})

// for registration
app.post('/authreg', async (req,res) => {
    //const {email, password} = req.body;
    //const user1 = [(db.get('users').value())];
    //console.log(user1)
    //const user = user1.filter((user) => email === user.email)

    let info = {
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
      }
  
    const user = [await Product.findOne({where:{email:info.email}})];

    // const user = db
    // .get('users')
    // .value()
    // .filter((user) => email === user.email)
    email = info.email;
    console.log(user[0])
    if(user[0] === null){
        bcrypt.hash(info.password, 10, function(err, hash){
            if (err){
                console.log('error')
            }else{
               //console.log({email,password : hash});
               const saveUser = async () => {
               console.log(hash);
               //db.get('users').push({email, password : hash}).write();
               try{
               const user = await Product.create({email: req.body.email,
                password: hash,
                role: req.body.role})
               let LoginData = {
                email, signInTime : Date.now()
                //exp: Math.floor(Date.now() / 1000) + (3 * 24 * 60 * 60) 
            }
               const token = jwt.sign(LoginData, secretKey);
               res.status(200).json({message: "success", token})}
               catch (error){
               console.error("Error saving user", error);
               }
            };
            saveUser();
            }
            
        });
        //console.log(password)
        //const hashedPassword = bcrypt.hashSync(password, 10);
        //console.log(hashedPassword);

    }
    else{
        res.status(200).json({message:'This email already exist'})
    }
} )

app.post('/check-account', (req,res) => {
    const {email} = req.body;
    // const uemail1 = [(db.get('users').value())];
    // const uemail = uemail1.filter((uemail) => uemail.email === email)
    // //console.log(uemail1)
    // console.log(uemail);
    // console.log(uemail.length)

    const user1 = [(db.get('users').value())];
    const user = user1.filter((user) => email === user.email)
    console.log(user)
    console.log(user.length)

    if(user.length === 1){
        res.status(200).json({message: 'user already exist', status : 'User Exists', userExist : true})
    }
    else{
        res.status(200).json({message: "user doesn't exist", status : 'User does not Exist', userExist : false })
    }

})


app.post('/verify', (req,res) => {
    const tokenHeaderKey = 'jwt-token';
    const authToken = req.headers[tokenHeaderKey];
    //console.log(authToken)
    const verify = jwt.verify(authToken, secretKey);
    console.log(verify)
    //try{
    if(verify){
        res.status(200).json({status: 'Logged in', message: 'success'})
    }else{
        res.status(401).json({status: 'Invalid auth',message: 'error'})
    }
    //}catch(error){
    //    res.status(401).json({status: 'Invalid auth', message: 'error'})
    //}
})


//module.exports = db;

module.exports = { db, upload };
