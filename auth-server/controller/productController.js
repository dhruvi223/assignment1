const db = require("../models/model.js");
const { Op } = require("sequelize");
const Product = db.products;


// get all liked products by product id
const getProductsByPids = async (req, res) => {
  console.log(req.query);
  
  const pidsArray = req.query.pidsArray; // Assuming pidsArray is sent in the request body
  

  try {
    // Fetch products with matching pids
    const products = await Product.findAll({
      where: {
        id: { [Op.in]: pidsArray },
      },
    });

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//add product to product table
const addProduct = async (req, res) => {
  let info = {
    title: req.body.title,
    imageUrl: req.body.image,
    price: parseInt(req.body.Price),
    description: req.body.description,
    category: req.body.category,
  };
  console.log(info.imageUrl);

  const product = await Product.create(info);
  console.log(product.id);
  res.status(200).json({ id: product.id });
};

// get all products
const getAllProduct = async (req, res) => {
  const product = await Product.findAll();
  res.status(200).send(product);
};

// get product by title for search feature
const getOneProduct = async (req, res) => {
  const product = await Product.findOne({ where: { title: req.query.title } });
  res.status(200).send(product);
};

// update product 
const updateProduct = async (req, res) => {
   const product = await Product.update(req.body, {
    where: { title: req.body.title },
  });
  //res.status(200).send(product);
  const p = await Product.findOne({ where: { title: req.body.title } });
  console.log(p);
  res.status(200).json({ id: p.id });
};

//delete product
const deleteProduct = async (req, res) => {
  let id = req.params.id;
  await Product.destroy({ where: { title: req.body.title } });
  res.status(200).send("Product is deleted");
};

module.exports = {
  getProductsByPids,
  addProduct,
  getAllProduct,
  getOneProduct,
  updateProduct,
  deleteProduct,
};
