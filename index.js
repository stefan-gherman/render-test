const express = require('express')
const app = express();
const port = 39342;

const { QuickDB } = require('quick.db');
const db = new QuickDB(); // using default driver

app.use(express.json());

app.route('/', )
    .get(async (req,res) => {
        const allData = await db.get("Data");
        res.status(200).json(allData);
    })
    .post (async (req,res) => {
        if (req.body.data) {
            try {
                const cityData = req.body.data;
                let cities = await db.get("Data.cities");
                cities.map((city) => city.toLowerCase());
                console.log(cities);
                !cities.includes(cityData) ? await db.push("Data.cities", cityData) : null
                res.status(201).json({"status": "created"});
            } catch (error) {
                console.log(error);
                res.status(400).json({"status": "fail"});
            }
        } else {
            res.status(500).json({"status": "fail"});
        }
    })

app.listen(port, async () => {
    const data = await db.get("Data.cities");
    data ? null : await db.set("Data" , {"cities": []});
    console.log(`App listening on port: ${port}`);
})