

import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import connectDB from './configs/mongodb.js'
import connectCloudinary from './configs/cloudinary.js'
import userRouter from './routes/userRoutes.js'
import educatorRouter from './routes/educatorRoutes.js'
import courseRouter from './routes/courseRoute.js'
import authRoutes from './routes/authRoutes.js'
import certificate from './routes/certificates.js'
import deleteCourse from './routes/deleteCourse.js'
import { stripeWebhooks, handleUserEvents } from './controllers/webhooks.js'

const app = express()

// Connect to services
await connectDB()
await connectCloudinary()

// Middleware
// app.use(cors({
//   origin: process.env.CORS_ORIGIN,
//   credentials: true,
// }))
//middle ware

const allowedOrigins = [
  'http://localhost:5173',
  'https://online-learning-yet.netlify.app',
  'https://online-learning-yet.vercel.app',
  'https://online-learning-rohit.netlify.app',
]

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
}))



app.use(cookieParser())
app.use(express.json())

// Routes
app.get('/', (req, res) => res.send('API Working'))
app.post('/user-events', handleUserEvents)
app.post('/stripe', express.raw({ type: 'application/json' }), stripeWebhooks)

app.use('/api/educator', educatorRouter)
app.use('/api/course', courseRouter)
app.use('/api/user', userRouter)
app.use('/api/auth', authRoutes)
app.use('/api/certificate', certificate)
app.use('/api/delete', deleteCourse);



const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})


