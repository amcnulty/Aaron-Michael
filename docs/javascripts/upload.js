window.onload = function () {

    var uploadForm = document.getElementById('myForm');
    var fileUploadInput = document.getElementById('fileUploadInput');
    var successMessage = document.getElementById('successMessage');
    var errorMessage = document.getElementById('errorMessage');
    var errorDescription = document.getElementById('errorDescription');

    uploadForm.onsubmit = event => {
        event.preventDefault();
        const formData = new FormData();
        formData.append(fileUploadInput.name, event.target[0].files[0], 'aaron_mcnulty_resume.pdf');
        fetch('/resume', {
            method: 'POST',
            body: formData
        }).then(res => {
            if (res.ok) {
                successMessage.style.display = 'block';
                return res;
            }
            else {
                return res.text();
            }
        })
        .then(res => {
            if (!res.ok) {
                console.log('err :>> ', res);
                errorDescription.innerHTML = 'Server Error: ' + res;
                errorMessage.style.display = 'block';
            }
        }).catch(err => {
            console.log('err :>> ', err);
            errorDescription.innerHTML = err;
            errorMessage.style.display = 'block';
        });
    }

}
