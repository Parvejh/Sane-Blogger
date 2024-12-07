let imageLabel = document.getElementById('inputImageLabel');
let fileInput = document.getElementById('inputImage');

fileInput.addEventListener('change',(event)=>{
    const file = event.target.files[0];

    if (file) {
        // Ensure the file is an image
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();

            // Set preview image when the file is loaded
            reader.onload = function (e) {
                imageLabel.style.backgroundImage = `url('${e.target.result}')`;
                imageLabel.style.backgroundSize = "cover";
                imageLabel.style.backgroundPosition = "center";
                imageLabel.textContent =" ";
                // imageLabel.style.cssText = "background-position:center;background-size:100% 100%;";
                                            
            };

            reader.readAsDataURL(file); // Convert file to base64 string
        } else {
            alert('Please upload a valid image file.');
        }
    } 
    // else {
    //     preview.src = ''; // Clear preview if no file is selected
    // }
})
