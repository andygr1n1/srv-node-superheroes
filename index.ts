import 'dotenv/config'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import morgan from 'morgan'
import path from 'path'
console.log(process.env)
const app = express()

// enable files upload
app.use(
    fileUpload({
        createParentPath: true,
    })
)

//add other middleware
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'uploads')))

const PORT = process.env.PORT

app.get('/', (req, res) => res.send('⚡️ Express + TypeScript Server started ⚡️'))

app.post('/api/upload-hero-image', async (req, res, _next) => {
    try {
        if (!req.files) {
            res.send({
                status: 406,
                message: 'No file uploaded',
            })
        } else {
            const thumbnail = req.files.thumbnail
            if (!Array.isArray(thumbnail)) {
                //Use the mv() method to place the file in upload directory (i.e. "uploads")
                thumbnail.mv('./uploads/' + thumbnail.name)

                //send response
                res.send({
                    status: 200,
                    message: 'File is uploaded',
                    data: {
                        name: thumbnail.name,
                        mimetype: thumbnail.mimetype,
                        size: thumbnail.size,
                        data: thumbnail.data,
                    },
                })
            }
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`)
})
