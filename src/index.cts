// Import chatgptApi
import { ChatGPTAPI, getOpenAIAuth, ChatGPTAPIBrowser } from 'chatgpt';
import express from 'express';
import cors from 'cors';

const { MongoClient } = require('mongodb');

const bodyParser = require('body-parser')
const app = express();

app.use(cors(), bodyParser.json());
const port = 3000;

// Initialize browser API
const api = new ChatGPTAPIBrowser({
    email: process.env.OPENAI_EMAIL || 'email',
    password: process.env.OPENAI_PASSWORD || 'password',
})
await api.initSession();

console.log(process.env.DATABASE_URL)
// Initialize mongodb
const client = new MongoClient(process.env.DATABASE_URL || '');

// Get conversations
app.post('/conversations', async (req, res) => {
    const conversations = req.body;
    console.log(req.body)
    try {
        await client.connect();

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
})

// app.post('/conversations', async (req, res) => {
//     const conversations = req.body;
//     console.log(req.body)
//     try {
//         await client.connect();

//     } catch (e) {
//         console.error(e);
//     } finally {
//         await client.close();
//     }
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