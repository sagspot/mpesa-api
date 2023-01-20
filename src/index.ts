import chalk from 'chalk';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import CallbackRoutes from './api/routes/callbacks';
import DisburseRoutes from './api/routes/disburse';
import PaymentRoutes from './api/routes/payments';
import RegisterRoutes from './api/routes/register';
import { catchErr, errorHandler } from './middleware/error';
import { __env } from './utils/helpers';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());
app.disable('x-powered-by');

app.use('/api/disbursements', DisburseRoutes);
app.use('/api/register', RegisterRoutes);
app.use('/api/payments', PaymentRoutes);
app.use('/api/callbacks', CallbackRoutes);

// Error handling
app.use(catchErr);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

(() => {
  try {
    app.listen(PORT, () =>
      console.log(
        `[${chalk.bold.blue(
          __env
        )} 🚀]: Server listening on http://localhost:${PORT}`
      )
    );
  } catch (error) {
    console.error(`[${chalk.red('error')} 💥]:  ${error}`);
    process.exit(1);
  }
})();
