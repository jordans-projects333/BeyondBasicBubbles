const delay = ms => new Promise(r => setTimeout(r, ms));

function headerLoaded(){
    document.querySelector('header').classList.remove('hidden')
}

let bannerLoadedCounter = 0
async function bannerLoaded(){
    if(bannerLoadedCounter == 2){
        document.querySelector('.main__banner').classList.remove('hidden')
        document.querySelectorAll('.bubble').forEach((bubble, index) => {
            bubble.id = `bubble${index + 1}`
        })
        document.querySelector('.bubble-container').id = 'bubble-container'
        document.querySelector('.logo-image-section1').id = 'logo-image-section1'
        document.querySelector('.logo-image2').id = 'logo-image2'
        document.querySelector('.section__gallery').classList.remove('hidden')
        document.querySelector('.gallery__wrapper--title').classList.remove('hidden')
        document.querySelector('.title__products').classList.remove('hidden')
        document.querySelector('.products').classList.remove('hidden')
    }else{
        bannerLoadedCounter++
    }
}
  
function imageFade(e){
    e.classList.add('imageLoaded')
}