import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import { v2 as cloudinary } from 'cloudinary';
import connectDB from './db';

//import route
import myUserRoute from './routes/user';
import myRestaurantRoute from './routes/myRestaurantRoute';
import restaurantRoute from './routes/restaurantRoute';
import orderRoute from './routes/OrderRoute';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
const PORT = process.env.PORT || 8000;
app.use(cors());

app.use(express.json());

app.get('/health', async (req: Request, res: Response) => {
  res.send({ message: 'health OK!' });
});

app.use('/api/my/user', myUserRoute);
app.use('/api/my/restaurant', myRestaurantRoute);
app.use('/api/restaurant', restaurantRoute);
app.use('/api/order', orderRoute);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`⚙️ Server is running at port : ${PORT}`);
    });
  })
  .catch((err) => {
    console.log('MONGO db connection failed !!! ', err);
  });
