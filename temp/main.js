//initilizing elements
const modal = document.querySelector(".modal")
const btn = document.querySelector("#modal-btn")
const close = document.querySelector(".close")

//setup dropzone
Dropzone.options.uploadWidget = {
	acceptedFiles: ".png, .jpg, .bmp, .jpeg",
	paramName: "file",
	maxFilesize: 3,
	parllelUploads: 1,
	dictDefaultMessage: "Drag image OR click here to start uploading",
	init: () => {
		this.on("success", (file, resp) => {
			console.log(file)
			console.log(resp)
		})
		this.on("thumbnail", (file) => {
			if(file.width < 640 || file.height < 480) {
				file.rejectDimensions()
			} else {
				file.acceptDimensions()
			}
		})
	},
	accept: (file,done) => {
		file.acceptDimensions = done
		file.rejectDimensions = () => done('Invalid dimensions.')
	}
}

//handeling click events
btn.onclick = () => {
	modal.style.display = "block"
}

close.onclick = () => {
	modal.style.display = "none"
	Dropzone.remove
}

window.onclick = (e) => {
	if(e.target == modal) {
		modal.style.display = "none"
	}
}
