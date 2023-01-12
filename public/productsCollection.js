const loadedImagesHash = []
const loadedImages = []
let productImageSize = 200
if(screen.width > 768)productImageSize = 500
let productImageAlternate = 300
if(screen.width > 768)productImageAlternate = 600
let currentProduct
let collected = 0
let collectedBacklog = []


if(localStorage.getItem('lastServerUpdate') != undefined){
    console.log('lastServerUpdate is in local storage')
    if(localStorage.getItem('lastServerUpdate') != lastServerUpdate){
        localStorage.clear();
        localStorage.setItem('lastServerUpdate', lastServerUpdate);
        console.log('lastServerUpdate cleared and updated')
    }
}else{
    console.log('lastServerUpdate saved to local storage')
    localStorage.setItem('lastServerUpdate', lastServerUpdate);
}

function loadedImage(e){
    e.classList.add('active')
}

// ===== Fetching the data
for(let i = 0; i < 4; i++){
    fetchItemByPriority(i)
}

function fetchItemByPriority(i){
    const options = {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({index: i})
    }
    fetch("/getProducts", options)
    .then(response => response.json())
    .then((data) => {
        if(document.readyState == "complete"){
            loadDataIntoItem(data.product.name, data.product.price, data.product.imageBlurHash, data.product.priority)
        }else{
            window.addEventListener("load", () => {
                loadDataIntoItem(data.product.name, data.product.price, data.product.imageBlurHash, data.product.priority)
            })
        }
    })
}

// ===== Loading the data into grid items
async function loadDataIntoItem(dataName, dataPrice, imageBlurHash, priority){
    // Animate on scroll
    const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting){
            entry.target.classList.add('show')
        }else{
            entry.target.classList.remove('show')
        }
        })
    })
    // Creating item from template
    const template = document.querySelector("#grid__item--template")
    const the_content = template.content.cloneNode(true)
    let str = dataName.replace(/\s/g, '-')
    let decodeHash = await blurhash.decodePromise(imageBlurHash,16,16)
    const imgObject = await blurhash.getImageDataAsImage(decodeHash,16,16,(event, imgObject) => {return});
    // Appending fetched data
    the_content.querySelector(".grid__item--name").innerText = dataName
    the_content.querySelector(".grid__item--price").innerText = dataPrice
    the_content.querySelector(".grid__item--price").dataset.price = dataPrice.slice(1)
    the_content.querySelector('.item__image--wrapper').id = `image-${str}`
    imgObject.onload = () => {
        loadedImagesHash.push({id : [dataName], img : imgObject})
        if(loadedImagesHash.length != productsTotal && loadedImagesHash.length >= 4){
            if((productsTotal - loadedImagesHash.length) > 4){
                for(let i = loadedImagesHash.length; i < loadedImagesHash.length+4; i++){
                    fetchItemByPriority(i)
                }
            }else{
                for(let i = loadedImagesHash.length; i < loadedImagesHash.length+(productsTotal - loadedImagesHash.length); i++){
                    fetchItemByPriority(i)
                }
            }
        } 
        let tempImg = new Image()
        tempImg.src = imgObject.src
        tempImg.onload = () => {
            the_content.querySelector('.item__image--wrapper').style.backgroundImage = 'url('+ tempImg.src +')'
            function filterBacklog(id, observer){
                let findBackloggedProduct = collectedBacklog.find((item) => item.id == id)
                if(findBackloggedProduct != undefined){
                    collected++
                    appendClone(findBackloggedProduct.content, collected,findBackloggedProduct.str, observer, findBackloggedProduct.dataName)
                    filterBacklog(collected+1, observer)
                }
            }
            if(priority == collected+1){
                collected++
                appendClone(the_content, collected, str, observer, dataName)
                filterBacklog(collected+1, observer)
            }else{
                collectedBacklog.push({content: the_content, id : priority, str: str, dataName: dataName})
            }
        }
    }
    
}

function appendClone(item, priority, str, observer, dataName){
    document.querySelector(".section__products--grid").appendChild(item)
    if(collected == productsTotal)document.querySelector('.section__products--loader').remove()
    if(collected == productsTotal && productsTotal % 2 != 0){
        document.querySelector('.section__products--grid').lastElementChild.classList.add('grid__item--odd')
        document.querySelector('.section__products--grid').lastElementChild.style.scale = 1
    }else{
        observer.observe(document.querySelector('.section__products--grid').lastElementChild)
    }
    let tempImg2 = new Image()
    tempImg2.src = `/images/products/${str}/${str}--${productImageSize}.webp`
    tempImg2.onload = () => {
        let tempImg3 = new Image()
        tempImg3.src = `/images/products/${str}/${str}--${productImageSize}.webp`

        // document.querySelector(`#${str}`).src = `/images/products/${str}/${str}--200.webp`
        tempImg3.onload = () => {
            // console.log(document.querySelector('#hoe'))
            document.querySelector(`#image-${str}`).appendChild(tempImg3)
            loadedImages.push({id : [dataName], img : tempImg2})
            if(currentProduct == dataName){
                document.querySelector('.slider__wrapper--image').appendChild(tempImg2)
                document.querySelector('.slider__wrapper--image img').classList.add('imageFadeIn')
            }
        }
    }
}