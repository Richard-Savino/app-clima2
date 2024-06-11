const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
}).then(() => console.log("Conectado a MongoDB"))
    .catch(err => console.error("Error De Conexion con MongoDB", err));

const weatherSchema = new mongoose.Schema({
    city: String,
    temperature: Number,
    description: String,
    humidity: Number,
    windSpeed: Number
});

const Weather = mongoose.model('Weather', weatherSchema);

app.use(express.json());

app.post('/api/weather', async (req, res) => {
    try {
    const { city, temperature, description, humidity, windSpeed } = req.body;
    const newWeather = new Weather({
        city,
        temperature,
        description,
        humidity,
        windSpeed
    });
    await newWeather.save();
    res.status(201).json(newWeather);
    } catch (error) {
    console.error("Error al guardar los datos del clima:", error);
    res.status(500).json({ error: "Error al guardar los datos del clima" });
    }
});

app.listen(PORT, () => {
    console.log(`El Servido Escucha En El Puerto: ${PORT}`);
});
