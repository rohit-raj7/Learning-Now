import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import cookieParser from "cookie-parser";
import connectDB from './configs/mongodb.js'
import connectCloudinary from './configs/cloudinary.js'
import userRouter from './routes/userRoutes.js' 
import {stripeWebhooks } from './controllers/webhooks.js'
import {handleUserEvents} from './controllers/webhooks.js'
import educatorRouter from './routes/educatorRoutes.js'
import courseRouter from './routes/courseRoute.js'
import authRoutes from './routes/authRoutes.js';


// Initialize Express
const app = express()

// Connect to database
await connectDB()
await connectCloudinary()

// Middlewares
// app.use(cors()) 
app.use(cors({
  origin: 'http://localhost:5173', // frontend origin
  credentials: true,
}));


app.use(cookieParser())

// Routes
app.get('/', (req, res) => res.send("API Working"))
app.post('/user-events', express.json() , handleUserEvents)
app.post('/stripe', express.raw({ type: 'application/json' }), stripeWebhooks)
app.use('/api/educator', express.json(), educatorRouter)
app.use('/api/course', express.json(), courseRouter)
app.use('/api/user', express.json(), userRouter)
app.use('/api/auth', express.json(), authRoutes);


// Port
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})