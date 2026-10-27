import express from "express"
import notesRoutes from "./routes/notesRoutes.js"
import connectDB from "./config/db.js"
import dotenv from "dotenv"
import cors from "cors";
dotenv.config()
const app = express()

//middleware
app.use(express.json())
// Middleware to allowcross origin requests
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use((req, res, next)=>{
    console.log(`Request method: ${req.method}, url: ${req.url}`)
    next()
})
const PORT = process.env.PORT || 5000
// Connect to MongoDB and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
  });
});
app.use("/api/notes", notesRoutes)


