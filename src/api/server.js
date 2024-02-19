import express from 'express'
import app from './app.js'
import routes from './routes/Routes.js'
import cors from 'cors'

const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
