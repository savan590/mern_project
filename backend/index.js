const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const departmentRoutes = require('./routes/departmentRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const dotenv = require('dotenv')
dotenv.config()

const app = express();
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

app.use('/auth', authRoutes);
app.use('/api', departmentRoutes);
app.use('/employee',employeeRoutes)

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    mongoose
        .connect(process.env.MONGODB_URL)
        .then(() => console.log("Database connected successfully"))
        .catch(error => console.error(error))
});