import express from 'express'
import cors from "cors";

const app = express ();

app.use(express.json());
app.use(cors(
    {
  origin: "http://127.0.0.1:5500",
  methods: ["GET", "POST", "PATCH", "DELETE"],
  credentials: true
}
));

import taskRouter from '../routes/task.route.js';

app.use("/api/v1/task", taskRouter);

export default app;