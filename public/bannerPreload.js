// function preloadImage(url)
// {
//     var img=new Image();
//     img.src=url;
// }
// preloadImage("/images/background.jpg")
// preloadImage("/images/headerLogo.png")
// preloadImage("/images/logo.png")
// preloadImage("/images/logoText.png")
// async function gettingDataUrl() {
//   let blob = await fetch("/images/background.jpg").then(r => r.blob());
//   let dataUrl = await new Promise(resolve => {
//     let reader = new FileReader();
//     reader.onload = () => resolve(reader.result);
//     reader.readAsDataURL(blob);
//   });
//   console.log(dataUrl)
// }
// gettingDataUrl()