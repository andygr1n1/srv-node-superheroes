import express from 'express'

const app = express()

const PORT = 8834

app.get('/', (req, res) => res.send('⚡️ Express + TypeScript Server started ⚡️'))

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`)
})
