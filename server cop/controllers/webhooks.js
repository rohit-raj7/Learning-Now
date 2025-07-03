 
import User from "../models/User.js";
import stripe from "stripe";
import { Purchase } from "../models/Purchase.js";
import Course from "../models/Course.js";


export const handleUserEvents = async (req, res) => {
  try {
    const { type, userData } = req.body;

    switch (type) {
      case "user.created": {
        const existing = await User.findOne({ email: userData.email });
        if (existing) return res.status(400).json({ success: false, message: "User already exists" });

        const user = new User({
          email: userData.email,
          name: userData.name,
          imageUrl: userData.imageUrl || "",
          resume: "",
          password: userData.password, // must be hashed from frontend or hash here
        });

        await user.save();
        return res.status(201).json({ success: true, message: "User created", user });
      }

      case "user.updated": {
        const updated = await User.findOneAndUpdate(
          { email: userData.email },
          {
            name: userData.name,
            imageUrl: userData.imageUrl,
          },
          { new: true }
        );
        return res.json({ success: true, message: "User updated", updated });
      }

      case "user.deleted": {
        await User.deleteOne({ email: userData.email });
        return res.json({ success: true, message: "User deleted" });
      }

      default:
        return res.status(400).json({ success: false, message: "Unknown event type" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Stripe Gateway Initialize
const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY)


// Stripe Webhooks to Manage Payments Action
export const stripeWebhooks = async (request, response) => {
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripeInstance.webhooks.constructEvent(request.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  }
  catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded': {

      const paymentIntent = event.data.object;
      const paymentIntentId = paymentIntent.id;

      // Getting Session Metadata
      const session = await stripeInstance.checkout.sessions.list({
        payment_intent: paymentIntentId,
      });

      const { purchaseId } = session.data[0].metadata;

      const purchaseData = await Purchase.findById(purchaseId)
      const userData = await User.findById(purchaseData.userId)
      const courseData = await Course.findById(purchaseData.courseId.toString())

      courseData.enrolledStudents.push(userData)
      await courseData.save()

      userData.enrolledCourses.push(courseData._id)
      await userData.save()

      purchaseData.status = 'completed'
      await purchaseData.save()

      break;
    }
    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object;
      const paymentIntentId = paymentIntent.id;

      // Getting Session Metadata
      const session = await stripeInstance.checkout.sessions.list({
        payment_intent: paymentIntentId,
      });

      const { purchaseId } = session.data[0].metadata;

      const purchaseData = await Purchase.findById(purchaseId)
      purchaseData.status = 'failed'
      await purchaseData.save()

      break;
    }
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a response to acknowledge receipt of the event
  response.json({ received: true });
}

 