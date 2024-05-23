import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { parseISO } from 'date-fns';

const prisma = new PrismaClient();
const router = Router();

// Get all transactions
router.get('/', async (req: Request, res: Response) => {
  try {
    const transactions = await prisma.transaction.findMany({
      include: {
        carts: true
      }
    });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

// Get a transaction by ID
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const transaction = await prisma.transaction.findUnique({
      where: { id: Number(id) },
      include: {
        carts: true
      }
    });
    if (transaction) {
      res.json(transaction);
    } else {
      res.status(404).json({ error: 'Transaction not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transaction' });
  }
});

// Create a new transaction
router.post('/', async (req: Request, res: Response) => {
  const { total, payment, change, transactionDate, carts } = req.body;
  try {
    const newTransaction = await prisma.transaction.create({
      data: {
        total,
        payment,
        change,
        transactionDate: parseISO(transactionDate),
        carts: {
          create: carts.map((cart: any) => ({
            productName: cart.productName,
            quantity: cart.quantity,
            price: cart.price
          }))
        }
      }
    });
    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create transaction' });
  }
});

// Get transactions by date range
router.get('/find/date-between', async (req: Request, res: Response) => {
  const { startDate, endDate } = req.query;
  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        transactionDate: {
          gte: parseISO(startDate as string),
          lte: parseISO(endDate as string)
        }
      },
      include: {
        carts: true
      }
    });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

// Get transactions with total greater than specified amount
router.get('/find/total-greater-than/:total', async (req: Request, res: Response) => {
  const { total } = req.params;
  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        total: {
          gt: parseFloat(total)
        }
      },
      include: {
        carts: true
      }
    });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

export default router;
