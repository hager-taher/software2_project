const Products = require("../models/product");

const getProducts = async (req, res) => {
 
    const products = await Products.find();
    res.status(200).json(products);
};

const getProductById = async (req, res) => {
  
    const product = await Products.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
 
};

const createProduct = async (req, res) => {
  
    const { title, description, category, price, image, discount, isTest } =
      req.body;

    if (!title || !description || !category || !price || !image) {
      return res.status(400).json({ message: "All fields required" });
    }

    const newProduct = new Products({
      title,
      description,
      category,
      price,
      image,
      discount,
      isTest,
    });

    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct); // ✅ مهم
  
};

const updateProduct = async (req, res) => {
  
    const { title, description, category, price, image, discount } = req.body;

    if (!title || !description || !category || !price || !image) {
      return res.status(400).json({ message: "All fields required" });
    }

    const productId = req.params.id;
    const product = await Products.updateOne(
      { _id: productId },
      {
        $set: {
          title,
          description,
          category,
          price,
          image,
          discount,
        },
      }
    );

    if (product.matchedCount === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product updated successfully" }); // ✅ مهم
 
};

const deleteProduct = async (req, res) => {
 
    const productId = req.params.id;
    const product = await Products.deleteOne({ _id: productId });

    if (product.deletedCount === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" }); // ✅ مهم
 
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
