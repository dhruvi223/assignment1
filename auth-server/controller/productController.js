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
      console.log(info.imageUrl)

      const product = await Product.create(info);
      console.log(product.id)
      res.status(200).json({ id: product.id });
}

const getAllProduct = async(req, res) => {
  const product = await Product.findAll();
  res.status(200).send(product)
}

const getOneProduct = async (req,res) => {
  console.log(req.body.title)
  //let id = req.params.id
  const product = await Product.findOne({where:{title:req.query.title}});
  res.status(200).send(product);
}

const updateProduct = async(req,res) => {
 // let id = req.params.id

  const product = await Product.update(req.body, {where:{title:req.body.title}})
  //res.status(200).send(product);
  const p = await Product.findOne({where:{title:req.body.title}});
  console.log(p)
  res.status(200).json({id: p.id});

}

const deleteProduct = async(req,res) => {
  let id = req.params.id
  await Product.destroy({where :{title:req.body.title}})
  res.status(200).send('Product is deleted')
}


module.exports = {addProduct, getAllProduct, getOneProduct, updateProduct, deleteProduct};