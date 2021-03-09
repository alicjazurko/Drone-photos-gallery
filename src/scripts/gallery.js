const popup = document.querySelector(".popup");
const popupImage = document.querySelector(".popup__image");

const images = document.querySelectorAll('img.image__pic');
let isClickedImage = false;

const imagePlusSize = document.createElement('img');
const X = document.createElement('p');
X.textContent = "X";

images.forEach(img => {
    img.addEventListener('click', (e)=> {

        if(isClickedImage == false) {
            isClickedImage = true;
            sourceImg = e.srcElement.src;
            imagePlusSize.src = sourceImg;
            popupImage.appendChild(imagePlusSize); 
            popupImage.appendChild(X);
        } 
        if(isClickedImage == true) {
            X.addEventListener('click', () => {
                console.log("hee")
                popupImage.removeChild(imagePlusSize);
                popupImage.removeChild(X);
                isClickedImage = false;
                console.log(isClickedImage)
            })
        }  
    })
})

X.addEventListener('mouseover', function() {
    X.textContent = "CLOSE X"
})

X.addEventListener('mouseout', function() {
    X.textContent = "X";
})




