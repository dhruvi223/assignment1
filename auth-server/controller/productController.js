const db = require('../models/model.js');
//const db = require('../models/model')

const Product = db.products;


//add product
const addProduct = async (req,res) => {
      let info = {
        title: req.body.title,
        imageUrl: req.body.image,
        price: parseInt(req.body.Price),
        description: req.body.description,
        category: req.body.category
      }
      console.log(info)

      const product = await Product.create(info);
      res.status(200).json({message: 'success'})
}

const getAllProduct = async(req, res) => {
  const product = await Product.findAll();
  res.status(200).send(product)
}

const getOneProduct = async (req,res) => {
  let id = req.params.id
  const product = await Product.findOne({where:{id:id}});
  res.status(200).send(product);
}

const updateProduct = async(req,res) => {
  let id = req.params.id
  const product = await Product.update(req.body, {where:{id:id}})
  res.status(200).send(product);
}

const deleteProduct = async(req,res) => {
  let id = req.params.id
  await Product.destroy({where :{id:id}})
  res.status(200).send('Product is deleted')
}


module.exports = {addProduct, getAllProduct, getOneProduct, updateProduct, deleteProduct};