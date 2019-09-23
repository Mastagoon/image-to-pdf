const express = require('express')
const app = express()
const fs = require('fs')
const multer = require('multer')
const {TesseractWorker} = require('tesseract.js')
const worker = new TesseractWorker()

const storage = multer.diskStorage({
	destination: (req,file,cb) => {
		cb(null, "./uploads")
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname)
	}
})

const upload = multer({storage:storage}).single("picture")

app.set('view engine', 'ejs')
app.use(express.static("public"))


app.get('/', (req,res) => {
	res.render("index")
})

app.post("/upload", (req,res) => {
	upload(req,res,err => {
		fs.readFile(`./uploads/${req.file.originalname}`, (err, data) => {
			if(!err) {
				worker
				.recognize(data, "eng", {tessjs_create_pdf: "1"})
				.progress(progress => {
					console.log(progress)
				})
				.then(result => {
					res.redirect("/downloadPage")
				})
			} else {
				return console.log("this is your error", err)
			}
		})
	})
})

app.get("/downloadPage", (req, res) => {
	res.render("downloadPage", {converted:"true"})
})

app.post("/downloadpdf", (req,res) => {
	const file = `${__dirname}/tesseract.js-ocr-result.pdf`
	res.download(file,"untitled.pdf")
})

const port = 5000 || process.env.port
app.listen(port, () => {
	console.log(`sup, this is port ${port}`)
})
