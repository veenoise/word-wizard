const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');
const qs = require('qs');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const app = express();
// const port = 4444;

// Do not commit the API KEY!!!
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.use(cors());
app.use(bodyParser.json());

app.set('query parser', function (str) {
    return qs.parse(str, { /* custom options */ })
})

app.get('/api/get/prompt', async (req, res) => {
    let clientData = req.query;
    console.log(clientData);

    // Filter query
    if (!("prompt" in clientData) || !("word" in clientData)) {
        res.status(400).json({"error": "Invalid JSON"});
        return;
    }

    // Filter input server-side
    if (clientData.prompt.replaceAll(' ', '').toLowerCase().includes(clientData.word) || clientData.prompt.replaceAll(' ', '').match(/[^A-Za-z ]+/gmi)) {
        res.status(400).json({"error": "Warning: Use space, uppercase, or lowercase characters only."});
        return;
    } else if (clientData.prompt.split(/\s+/).length > 4) {
        res.status(400).json({"error": "Warning: Prompt using only 4 words."});
        return;
    } else if (clientData.prompt.length > 25) {
        res.status(400).json({"error" : "Warning: Prompt using only 25 characters."});
        return;
    }

    // Call for Generative AI API
    try {
        const result = await model.generateContent(`Please generate output using 3 sentences only. This is the prompt: ${clientData.prompt}`);
        console.log("Generated result: ", result.response.text());
        res.status(200).json({"result": result.response.text()});    
    } catch (error) {
        console.log(error);
        res.status(500).json({"error": "Generative AI issue"});
    }    
})

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// })

module.exports.handler = serverless(app);