const Product = require('../../models/Product');

// Get all products (API endpoint)
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({ isActive: true })
            .sort({ createdAt: -1 });
        
        res.json({
            success: true,
            products: products
        });
    } catch (error) {
        console.error('Get products error:', error);
        res.status(500).json({
            success: false,
            message: 'Unable to fetch products'
        });
    }
};

// Get products by category (API endpoint)
const getProductsByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const products = await Product.find({ 
            category: category, 
            isActive: true 
        }).sort({ createdAt: -1 });
        
        res.json({
            success: true,
            products: products
        });
    } catch (error) {
        console.error('Get products by category error:', error);
        res.status(500).json({
            success: false,
            message: 'Unable to fetch products'
        });
    }
};

// Add new product (API endpoint)
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, image } = req.body;
        
        // Validation
        if (!name || !description || !price || !category || !image) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        if (!['cricket', 'football'].includes(category)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid category'
            });
        }

        const product = new Product({
            name: name.trim(),
            description: description.trim(),
            price: parseFloat(price),
            category,
            image: image.trim(),
            createdBy: req.session.user._id
        });

        await product.save();

        res.json({
            success: true,
            message: 'Product added successfully',
            product: product
        });
    } catch (error) {
        console.error('Add product error:', error);
        res.status(500).json({
            success: false,
            message: 'Unable to add product'
        });
    }
};

// Delete product (API endpoint)
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        
        const product = await Product.findByIdAndUpdate(
            id,
            { isActive: false },
            { new: true }
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.json({
            success: true,
            message: 'Product deleted successfully'
        });
    } catch (error) {
        console.error('Delete product error:', error);
        res.status(500).json({
            success: false,
            message: 'Unable to delete product'
        });
    }
};

// Admin-only route handlers
const getProductsPage = (req, res) => {
    res.render('admin-products', { 
        title: 'Manage Products',
        user: req.session.user 
    });
};

const getAddProductPage = (req, res) => {
    res.render('admin-add-product', { 
        title: 'Add Product',
        user: req.session.user 
    });
};

const postAddProduct = async (req, res) => {
    try {
        await addProduct(req, res);
    } catch (error) {
        res.redirect('/admin/products?error=Unable to add product');
    }
};

const getEditProductPage = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.redirect('/admin/products?error=Product not found');
        }
        
        res.render('admin-edit-product', { 
            title: 'Edit Product',
            user: req.session.user,
            product 
        });
    } catch (error) {
        res.redirect('/admin/products?error=Unable to load product');
    }
};

const postEditProduct = async (req, res) => {
    try {
        const { name, description, price, category, image } = req.body;
        
        await Product.findByIdAndUpdate(req.params.id, {
            name: name.trim(),
            description: description.trim(),
            price: parseFloat(price),
            category,
            image: image.trim()
        });

        res.redirect('/admin/products?success=Product updated successfully');
    } catch (error) {
        res.redirect('/admin/products?error=Unable to update product');
    }
};

module.exports = {
    getAllProducts,
    getProductsByCategory,
    addProduct,
    deleteProduct,
    getProductsPage,
    getAddProductPage,
    postAddProduct,
    getEditProductPage,
    postEditProduct
};
