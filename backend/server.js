import express from 'express';
import cors from 'cors';
import 'dotenv/config' 
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoutes.js';
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import adminRouter from './routes/adminRoute.js';

const app = express();
const PORT = process.env.PORT || 4000;
await connectDB();
connectCloudinary();

app.use(express.json());
app.use(cors());
app.use('/images', express.static('uploads'));

app.use('/api/user',userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)
app.use('/api/admin', adminRouter)

app.get('/', (req, res) => {
    res.send('API Working');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
