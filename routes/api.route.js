const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.get("/products", async (req, res, next) => {
  try {
    const products = await prisma.product.findMany({
      include: { category: true },
    });
    const categories = await prisma.category.findMany({
      include: { products: true },
    });
    res.send({ products, categories });
  } catch {
    next(error);
  }
});
router.get("/", async (req, res) => {
  res.send({ message: "it is home page" });
});

module.exports = router;
