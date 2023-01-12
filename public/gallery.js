document.querySelector('#form__review').addEventListener('submit', (e) => {
    e.preventDefault()
    const rating = document.querySelector('#form__review--rating').value
    const reviewContent = document.querySelector('#form__review--content').value
    const options = {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({rating, reviewContent})
      }
      fetch("/review", options)
    //   .then(response => response.json())
    //   .then((data) => {
})

const imgContainer = document.getElementById("imgContainer");
            const img = new Image();
            img.crossOrigin = "Anonymous";
            img.onload = () => {
                imgContainer.appendChild(img);

                const imgData = blurhash.getImageData(img);
                // console.log(imgData)

                blurhash
                    .encodePromise(imgData, img.width, img.height, 4, 4)
                    .then(hash => {
                        console.log(hash)
                        return blurhash.decodePromise(
                            hash,
                            img.width,
                            img.height
                        );
                    })
                    .then(blurhashImgData => {
                        // as image object with onload callback
                        const imgObject = blurhash.getImageDataAsImage(
                            blurhashImgData,
                            img.width,
                            img.height,
                            (event, imgObject) => {
                                document.body.appendChild(imgObject);
                            }
                        );
                    })
            };
            
            // img.src = "./images/products/4x-Bath-Bomb-Gift-Set/4x-Bath-Bomb-Gift-Set--500.webp";
            img.src = "./images/products/4x-Bath-Bomb-Gift-Set/galleryAlternative_8--600.webp";
            //400// 00M~-. // 00PiSf // 00Kn0x // 00L428 // 00I#_u // 00N];7 // 00NA9] //
            //600// 00N9Vh // 00Pr;8 // 00Kn0x // 00L428 // 00I#_u // 00N];7 // 00NA9] //
            //galleryImage1--600.webp
            // 200 00M%Zn
            // 600 00M?}M