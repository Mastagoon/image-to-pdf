//initilizing elements
const modal = document.querySelector(".modal")
const btn = document.querySelector("#modal-btn")
const close = document.querySelector(".close")

//setup dropzone
/*Dropzone.options.uploadWidget = {
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
}*/
function readURL(input) {
	if (input.files && input.files[0]) {
	  var reader = new FileReader();
	  reader.onload = function(e) {
		$('.image-upload-wrap').hide();
		$('.file-upload-image').attr('src', e.target.result);
		$('.file-upload-content').show();
  
		$('.image-title').html(input.files[0].name);
	  };
  
	  reader.readAsDataURL(input.files[0]);
  
	} else {
	  removeUpload();
	}
  }
  
  function removeUpload() {
	$('.file-upload-input').replaceWith($('.file-upload-input').clone());
	$('.file-upload-content').hide();
	$('.image-upload-wrap').show();
  }
  $('.image-upload-wrap').bind('dragover', function () {
		  $('.image-upload-wrap').addClass('image-dropping');
	  });
	  $('.image-upload-wrap').bind('dragleave', function () {
		  $('.image-upload-wrap').removeClass('image-dropping');
  });

  function converting() {
	  document.querySelector(".remove-image").disabled = true
	  document.querySelector(".upload-btn").classList.add("disabled")
	  document.querySelector(".remove-image").classList.add("disabled")
	  document.querySelector(".loading-animation").style.display = "block"
  }
  
  function convertComplete() {
	  alert("ayyye")
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
