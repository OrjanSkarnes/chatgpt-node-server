// Import chatgptApi
import { ChatGPTAPI, getOpenAIAuth, ChatGPTAPIBrowser } from 'chatgpt';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
const port = 3000;

// Initialize browser API
const api = new ChatGPTAPIBrowser({
    email: process.env.OPENAI_EMAIL || 'email',
    password: process.env.OPENAI_PASSWORD || 'password',
})
await api.initSession();

// const MongoClient = require('mongodb').MongoClient;
// const uri = process.env.DATABASE_URL;
// const client = new MongoClient(uri, { useNewUrlParser: true });

// app.post('/conversations', async(req, res) => {
//     const conversations = req.body;
//     console.log('trying to post conversation to mongodb')
//     console.log(req.body)
//     client.connect((err: any) => {
//         // Connect to the MongoDB server
//         console.log('Connected to MongoDB server');
//         const db = client.db("conversations");

//         db.collection("coversations").insertOne(conversations, (err: any, result: any) => {
//             if (err) {
//                 // Handle error
//                 return res.send({ error: "An error occurred" });
//             }
//             res.send(result.ops[0]);
//         });
//         client.close();
//     });
// })


app.get('/chat/:message', async (req, res) => {
    try {
        const response = await api.sendMessage(req.params.message, {
            timeoutMs: 2 * 60 * 1000
        })
        res.send({ answer: response.response });
    } catch (error: any) {
        res.send({ error: error.toString() });
        console.log('error', error)
    }
});

// Reset the thread
app.get('/reset', async (req, res) => {
    console.log('trying to reset thread')
    try {
        await api.resetThread();
        res.send({ message: 'Thread reset' });
    } catch (error: any) {
        res.send({ error: error.toString() });
    }
});

app.listen(port, () => {
    console.log(`ChatGPT playground is listening at http://localhost:${port}`);
});