const Product = require('../models/product')


// Add Product GET and POST
exports.getAddProduct = (req, res, next) => {
  Product.fetchAll().
  then(() => {
    res.render('admin/edit-product', { 
      pageTitle: 'Add Product', 
      path: '/admin/add-product',
      editing: false
    });
  })
  .catch(err => console.log(err));   
};

exports.postAddProduct =  (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null, title, imageUrl, description, price);
  product
    .save() 
    .then(() => {
      res.redirect('/');
    })
    .catch(err => console.log(err));
};

// Edit Product GET and POST
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode){
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(([product]) => {
       res.render('admin/edit-product', { 
      pageTitle: 'Edit Product', 
      path: '/admin/edit-product',
      editing: editMode,
      product: product[0]
    });
  })
  .catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDes = req.body.description;
  Product.updateProduct(prodId, updatedTitle, updatedPrice, updatedImageUrl, updatedDes)
  .then(() => {
    res.redirect('/admin/products');
  })
  .catch(err => console.log(err));
};

// Admin Products GET
exports.getProducts = (req, res, next) => {
  Product.fetchAll()
  .then(([row, fieldData]) => {
    res.render('admin/products', {
      prods: row, 
      pageTitle: 'Admin Products', 
      path:'/admin/products', 
    });
  })
  .catch(err => console.log(err));
};

// Delete Product 
exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteById(prodId)
    .then(([product]) => {
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err)); 
};