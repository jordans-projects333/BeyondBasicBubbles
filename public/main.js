

// let galleryLoaded

// const delay = ms => new Promise(r => setTimeout(r, ms));

// const headerImages = ["/images/main/headerLogo.webp", "/images/main/logo.webp", "/images/main/logoText.webp", "/images/main/background.webp"]
// let headerImageCounter = 0
// for (imageSrc in headerImages){
//   let img = new Image()
//   img.onload = async function() {
//     if(this.dataset.url == "/images/main/headerLogo.webp"){
//       document.querySelector('header').style.opacity = 1
//       document.querySelector('.header__logo').src = "/images/main/headerLogo.webp"
//     }
//     if(headerImageCounter == 3){
//       document.querySelector('.logo-image2').src = "/images/main/logo.webp"
//       document.querySelector('.logo-image1').src = "/images/main/logoText.webp"
//       document.querySelector('.main__banner').style.background = `url(./images/main/background.webp)`
//       await delay(200)
//       document.querySelector('.main__banner').classList.add('active')
//       if(galleryLoaded == true)document.querySelector('.section__gallery').classList.add('active')
//     }else{
//       headerImageCounter++
//     }
//   }
//   img.src = headerImages[imageSrc]
//   img.dataset.url = headerImages[imageSrc]
// }

function galleryLoad(){
  document.querySelectorAll('.gallery__item--image').forEach(async (item, index) => {
      let imageBlurHash = item.dataset.blur
      let decodeHash = await blurhash.decodePromise(imageBlurHash, 16, 16)
      const imgObject = await blurhash.getImageDataAsImage(
          decodeHash,
          16,
          16,
          (event, imgObject) => {
          return
          }
      )
      item.style.backgroundImage = 'url('+imgObject.src+')'
  })
}
galleryLoad()

// ===== Mobile navigation menu dropdown
function menuToggle(){
  document.querySelector('.header__content--button').classList.toggle('active')
  document.querySelector('.nav__socials').classList.toggle('active')
  document.querySelector('.nav__content--wrapper').classList.toggle('active')
  document.querySelector('nav').classList.toggle('active')
  if(document.querySelector('.section__profile--forms.active') == null)document.querySelector('.header__content--user').classList.toggle('active')
  document.querySelector('.header__content--cart').classList.toggle('active')
  document.querySelector('.tranparent__overlay').classList.toggle('active')
}
document.querySelector('.header__content--button').addEventListener('click', (e) => {
    menuToggle()
});

// document.querySelectorAll('.navbar-list-container a').forEach(n => n.
//     addEventListener('click', () => {
//         document.querySelector('.mobile-nav-bar-container').classList.remove('active');
//         document.querySelector('.navbar').classList.remove('active');    
// }));
// ===== Newsletter
document.querySelector('#footer__newsLetter--form').addEventListener('submit', (e) => {
  e.preventDefault()
  console.log(document.querySelector('.newsLetter__form--email').value)
  let newsletterEmail = document.querySelector('.newsLetter__form--email').value
  const options = {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({newsletterEmail})
  };
  fetch("/newsletter", options)
  .then(response => response.json())
  .then((data) => {
    
  })
})

function goToNewsletter(){
  document.querySelector("#footer__newsLetter--form").scrollIntoView()
}

// ===== Click on user
function profile(){
  if(document.querySelector('nav.active') == null)document.querySelector('.header__content--user').classList.toggle('active')
  document.querySelector('.section__profile--forms').classList.toggle('active')
}
document.querySelector('.header__content--user').addEventListener('click', () => {
  profile()
})

// ===== Close user
document.querySelector('.profile__forms--close').addEventListener('click', () => {
  document.querySelector('.section__profile--forms').classList.toggle('active')
  if(document.querySelector('nav.active') == null)document.querySelector('.header__content--user').classList.toggle('active')
})

// ===== Click on product
function getProduct(e){
  // Transition
  document.querySelector(".section__productPage").classList.add("active")
  document.querySelector(".main__content--shiftLeft").classList.add("active")
  document.querySelector("header").classList.add("solid")
  // Shift already loaded data onto product page
  let productImages
  let titleData = e.querySelector(".grid__item--name").innerText
  currentProduct = titleData
  let findImageSrc = loadedImages.find( item => item.id == titleData)
  if(findImageSrc != undefined){
    document.querySelector('.slider__wrapper--image').appendChild(findImageSrc.img)
    document.querySelector('.slider__wrapper--image img').classList.add('activeProductImage')
  }else{
    let findImageSrcHash = loadedImagesHash.find( item => item.id == titleData).img
    document.querySelector('.slider__wrapper--image').style.backgroundImage = 'url('+findImageSrcHash.src+')'
  }
  ////////////////////////////////////////////////////////////
  document.querySelector(".product-title").innerText = titleData
  document.querySelector(".product-price").innerText = e.querySelector(".grid__item--price").innerText

  // Fetch additional data from server
  const options = {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({titleData})
  }
  fetch("/getProducts/addInfo", options)
  .then(response => response.json())
  .then(async (data) => {
    if(document.querySelector('.section__productPage.active') != null && currentProduct == data.name){
      document.querySelector(".product-description").innerText = data.getInfo.description
    }
    // Get alternate images
    let str = titleData
    str = str.replace(/\s/g, '-')
    const imageCurrentBar = document.querySelector('.photo-bar')
    const imageWrapper = document.querySelector('.slider__wrapper--image')
    console.log(imageWrapper)
    // for(let i = 0; i < 4; i++){
    for(let i = 0; i < data.getInfo.alternateImages.length; i++){
      let clone = imageWrapper.cloneNode(true)
      let decodeHash = await blurhash.decodePromise(data.getInfo.alternateImages[i],16,16)
      const imgObject = await blurhash.getImageDataAsImage(decodeHash, 16, 16, (event, imgObject) => {return})
      clone.style.backgroundImage = 'url('+imgObject.src+')'
      if(clone.querySelector('img') != undefined)clone.querySelector('img').remove()
      clone.id = `galleryImage${i+1}`
      let galleryPreload = new Image()
      galleryPreload.src = `/images/products/${str}/galleryAlternative_${i + 1}--${productImageAlternate}.webp`
      galleryPreload.onload = () => {
        document.querySelector(`#galleryImage${i+1}`).appendChild(galleryPreload)
      }
      // clone.querySelector('img').src = `/images/products/${str}/galleryAlternative_${i + 1}--300.webp`
      // clone.querySelector('img').src = ''
      document.querySelector('.productPage__slider').appendChild(clone)
      // makeintoSlide(".productPage__slider", ".slider__wrapper--image", productImages)
      // slide.addEventListener('touchstart', touchStart(index))
      // slide.addEventListener('touchend', touchEnd)
      // slide.addEventListener('touchmove', touchMove)
      let cloneBar = document.querySelector('.photo-bar-wrapper template').content.cloneNode(true)
      if(i == 0){
        let cloneBarFirst = document.querySelector('.photo-bar-wrapper template').content.cloneNode(true)
        cloneBarFirst.querySelector('.photo-bar').classList.add('photo-bar-active')
        document.querySelector('.photo-bar-wrapper').appendChild(cloneBarFirst)
      }
      document.querySelector('.photo-bar-wrapper').appendChild(cloneBar)
    }
    makeintoSlide(".productPage__slider", ".slider__wrapper--image", productImages)
    })
  
  // Get Reviews
}
// ===== More info page
function getInfoPage(item, number){
  if(number != undefined){
    // element.scrollTop = element.scrollHeight;
    document.querySelector('.section__info').scrollTop = document.querySelector('.section__info').scrollHeight
  }
  document.querySelector('.section__info').classList.add('active')
  // document.querySelector('.filter').classList.add('hide')
  document.querySelector('.info__wrapper--close').classList.add('active')
  if(document.querySelector('header.solid') == null)document.querySelector('header').classList.add('solid')
  if(item != undefined){
    // document.querySelector(item).scrollIntoView;
    let topPos = document.querySelector(item).offsetTop;
    document.querySelector('.section__info').scrollTop = topPos-35;
  }
}

function closeInfoPage(){
  document.querySelector('.section__info').classList.remove('active')
  // document.querySelector('.filter').classList.remove('hide')
  document.querySelector('.info__wrapper--close').classList.remove('active')
  if(document.querySelector('header.solid') != null)document.querySelector('header').classList.remove('solid')
}

// Click on return home
function backHome(){
  document.querySelector(".section__productPage").classList.remove("active")
  let firstImage = document.querySelector('.slider__wrapper--image')
  document.querySelector('.productPage__slider').innerHTML = ''
  document.querySelector('.productPage__slider').appendChild(firstImage)
  document.querySelector('.productPage__slider').style.transform = 'translateX(0px)'
  // document.querySelector('.product-image').classList.remove('imageLoaded')

  document.querySelectorAll('.photo-bar').forEach((e) => {e.remove()})

  document.querySelector(".main__content--shiftLeft").classList.remove("active")
  document.querySelector("header").classList.remove("solid")
  document.querySelector(".slider__wrapper--image img").remove()
}

// ===== Gallery slider V2
// document.querySelector(".test").addEventListener('scroll', () => {
//   console.log(document.querySelector(".test").scrollLeft / (document.querySelector(".test").scrollWidth - document.querySelector(".test").clientWidth))
// })

// ===== Gallery slider
const galleryImages = document.querySelectorAll(".gallery__item--image img")
const track = document.querySelector(".image-track");
track.dataset.position = 0
const handleOnDown = e => {
  if(e.target == document.querySelector('.section__gallery')){
    track.dataset.mouseDownAt = e.clientX;
  }
}

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";  
  track.dataset.prevPercentage = track.dataset.percentage;
}

const handleOnMove = e => {
  if(track.dataset.mouseDownAt === "0") return;

  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;
  
  const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -240);
  if(isNaN(nextPercentage)){
    track.dataset.percentage = 0
    console.log('not a number')
    return
  }
  
  // console.log(track.dataset.percentage, nextPercentage)
  track.dataset.percentage = nextPercentage;
  // track.dataset.position = parseInt(track.dataset.position)+(parseInt(nextPercentage) - parseInt(track.dataset.prevPercentage))
  
  track.animate({
    transform: `translate(${nextPercentage}%, 0%)`
  }, { duration: 1200, fill: "forwards" });
  
  // for(const image of track.querySelectorAll(".gallery__item--image")) {
  //   // console.log(image)
  //   image.animate({
  //     objectPosition: `${100 + nextPercentage}% center`
  //   }, { duration: 1200, fill: "forwards" });
  // //   image.animate({
  // //     transform: `translateX(${0 + nextPercentage}%)`
  // //     // objectPosition: `${100 + nextPercentage}% center`
  // //   }, { duration: 1200, fill: "forwards" });
  // }
  if(nextPercentage <= 0 && nextPercentage >= -100){
    galleryImages[0].animate({
      transform: `translateX(${0 + ((nextPercentage* 0.66))}%)`
    }, { duration: 1200, fill: "forwards" });
  }
  if(nextPercentage <= 0 && nextPercentage >= -100){
    galleryImages[1].animate({
      transform: `translateX(${0 + ((nextPercentage*0.50))}%)`
    }, { duration: 1200, fill: "forwards" });
  }
  if(nextPercentage <= 0 && nextPercentage >= -126){
    if((nextPercentage)/3 >= -50){
      galleryImages[2].animate({
        transform: `translateX(${0 + ((nextPercentage*0.33))}%)`
      }, { duration: 1200, fill: "forwards" });
    }
  }
  if(nextPercentage <= -26 && nextPercentage >= -168){
    if((nextPercentage + 26)/3 >= -50){
      galleryImages[3].animate({
        transform: `translateX(${0 + ((0.33*(nextPercentage + 26)))}%)`
      }, { duration: 1200, fill: "forwards" });
    }
  }
  if(nextPercentage <= -68 && nextPercentage >= -210){
    if((nextPercentage + 68)/4 >= -50){
      galleryImages[4].animate({
        transform: `translateX(${0 + ((0.33*(nextPercentage + 68)))}%)`
      }, { duration: 1200, fill: "forwards" });
    }
  }
  if(nextPercentage <= -110 && nextPercentage >= -252){
    if((nextPercentage + 110)/3 >= -50){
      galleryImages[5].animate({
        transform: `translateX(${0 + ((0.33*(nextPercentage + 110)))}%)`
      }, { duration: 1200, fill: "forwards" });
    }
  }
  if(nextPercentage <= -152 && nextPercentage >= -294){
    if((nextPercentage + 152)/3 >= -50){
      galleryImages[6].animate({
        transform: `translateX(${0 + ((0.33*(nextPercentage + 152)))}%)`
      }, { duration: 1200, fill: "forwards" });
    }
  }
  if(nextPercentage <= -194 && nextPercentage >= -336){
    galleryImages[7].animate({
      transform: `translateX(${0 + ((0.16*(nextPercentage + 194)))}%)`
    }, { duration: 1200, fill: "forwards" });
  }
}

/* -- Had to add extra lines for touch events -- */

window.onmousedown = e => handleOnDown(e);

window.ontouchstart = e => handleOnDown(e.touches[0]);

window.onmouseup = e => handleOnUp(e);

window.ontouchend = e => handleOnUp(e.touches[0]);

window.onmousemove = e => handleOnMove(e);

window.ontouchmove = e => handleOnMove(e.touches[0]);

// ===== slider =================================================================================================================================================
function makeintoSlide(containerClass, slideItemClass, rowId){
  rowId = {
      isDragging: false,
      startPos: 0,
      currentTranslate: 0,
      prevTranslate: 0,
      animationID: null,
      currentIndex: 0
  }
  document.querySelectorAll(slideItemClass).forEach((slide, index) => {
      // touch events
      slide.addEventListener('touchstart', touchStart(index))
      slide.addEventListener('touchend', touchEnd)
      slide.addEventListener('touchmove', touchMove)
  })

  function setPositionByIndex() {
    document.querySelector('.photo-bar-active').classList.remove('photo-bar-active')
    document.querySelectorAll('.photo-bar')[rowId.currentIndex].classList.add('photo-bar-active')
      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    rowId.currentTranslate = rowId.currentIndex * -window.innerWidth
    rowId.prevTranslate = rowId.currentTranslate
    setSliderPosition()
  }

  function setSliderPosition() {
      document.querySelector(containerClass).style.transform = `translateX(${rowId.currentTranslate}px)`
  }

  function getPositionX(event) {
    return event.touches[0].clientX
  }

  function animation() {
      setSliderPosition()
      if (rowId.isDragging) requestAnimationFrame(animation)
  }

  window.addEventListener('resize', setPositionByIndex())

  function touchStart(index) {
      return function (event) {
          rowId.currentIndex = index
          rowId.startPos = getPositionX(event)
          rowId.isDragging = true
          rowId.animationID = requestAnimationFrame(animation)
          document.querySelector(containerClass).classList.add('grabbing')
          document.querySelectorAll('.header__title--letter').forEach((item) => {
            item.classList.add('active')
          })
      }
  }

  function touchMove(event) {
      if (rowId.isDragging) {
        const currentPosition = getPositionX(event)
        rowId.currentTranslate = rowId.prevTranslate + currentPosition - rowId.startPos
      }
  }

  function touchEnd() {
      cancelAnimationFrame(rowId.animationID)
      rowId.isDragging = false
      const movedBy = rowId.currentTranslate - rowId.prevTranslate
    
      // if moved enough negative then snap to next slide if there is one
      if (movedBy < -100 && rowId.currentIndex < document.querySelector(containerClass).childElementCount - 1) rowId.currentIndex += 1
    
      // if moved enough positive then snap to previous slide if there is one
      if (movedBy > 100 && rowId.currentIndex > 0) rowId.currentIndex -= 1
    
      setPositionByIndex()

      document.querySelector(containerClass).classList.remove('grabbing')
      document.querySelectorAll('.header__title--letter').forEach((item) => {
        item.classList.remove('active')
      })
    }
}

// window.oncontextmenu = function (event) {
//   event.preventDefault()
//   event.stopPropagation()
//   return false
// }

// =================
// makeintoSlide(".productPage__slider", ".slider__wrapper--image", productImages)