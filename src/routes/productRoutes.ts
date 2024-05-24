import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = Router();

// Get all products
router.get('/', async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Get a product by ID
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const product = await prisma.product.findUnique({ where: { id: Number(id) } });
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// Get products by name
router.get('/find/name/:name', async (req: Request, res: Response) => {
  const { name } = req.params;
  try {
    const products = await prisma.product.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Get products with price greater than specified amount
router.get('/find/price-greater-than/:price', async (req: Request, res: Response) => {
  const { price } = req.params;
  try {
    const products = await prisma.product.findMany({
      where: {
        price: {
          gt: parseFloat(price),
        },
      },
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

export default router;