const ProductService = require("../services/productService");
const createSuccess = require("../helpers/createSuccess");
const createError = require("../middlewares/handle_error");

const productController = {
  createProduct: async (req, res, next) => {
    try {
      const filename = req.file;
      const IMAGE_PATH = filename.path;
      const CLOUDY_IMAGE_ID = filename.filename;
      const { NAME, PRICE, STOCK, CD, PRODUCT_ATTRIBUTE, CATEGORY_ID } =
        req.body;
      const LIST_ATTRIBUTES = JSON.parse(PRODUCT_ATTRIBUTE);
      const { status, message } = await ProductService.createProduct(
        {
          NAME,
          PRICE,
          STOCK,
          CD,
          IMAGE_PATH,
          CATEGORY_ID,
          CLOUDY_IMAGE_ID,
          LIST_ATTRIBUTES,
        },
        req?.user?.userId
      );
      res.status(status).json(createSuccess(status, message));
    } catch (error) {
      next(error);
    }
  },
  getProductId: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { status, message, elements } = await ProductService.getProductId(
        id
      );
      res.status(status).json(createSuccess(status, message, elements));
    } catch (error) {
      next(error);
    }
  },
  getAllProduct: async (req, res, next) => {
    try {
      const { status, message, elements } =
        await ProductService.getAllProduct();
      res.status(status).json(createSuccess(status, message, elements));
    } catch (error) {
      next(error);
    }
  },
  updateProduct: async (req, res, next) => {
    try {
      const { id } = req.params;
      const check = await ProductService.getByIdProduct(id);
      if (!check) {
        throw createError.badRequest("Id not found");
      }
      const filename = req.file;
      const IMAGE_PATH = filename.path;
      const CLOUDY_IMAGE_ID = filename.filename;
      const { NAME, PRICE, STOCK, CD, PRODUCT_ATTRIBUTE, CATEGORY_ID } =
        req.body;
      const LIST_ATTRIBUTES = JSON.parse(PRODUCT_ATTRIBUTE);
      const { status, message } = await ProductService.updateProduct(
        {
          NAME,
          PRICE,
          STOCK,
          CD,
          IMAGE_PATH,
          CLOUDY_IMAGE_ID,
          CATEGORY_ID,
          LIST_ATTRIBUTES,
        },
        id,
        req?.user?.userId
      );
      res.status(status).json(createSuccess(status, message));
    } catch (error) {
      next(error);
    }
  },
  deleteProduct: async (req, res, next) => {
    try {
      const { id } = req.params;
      const check = await ProductService.getByIdProduct(id);
      if (!check) {
        throw createError.badRequest("Id not found");
      }
      const { status, message } = await ProductService.deleteProduct(
        id,
        req?.user?.userId
      );
      res.status(status).json(createSuccess(status, message));
    } catch (error) {
      next(error);
    }
  },
};
module.exports = productController;
