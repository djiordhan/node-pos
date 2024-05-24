import express from 'express';
import productRoutes from './routes/productRoutes';
import transactionRoutes from './routes/transactionRoutes';
import swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';
import YAML from 'yamljs';

const swaggerDocument = YAML.load('./swagger.yaml');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/products', productRoutes);
app.use('/transactions', transactionRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});