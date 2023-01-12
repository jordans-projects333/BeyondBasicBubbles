const options = {
    method: "POST",
}
fetch("/newsletter/getData", options)
.then(response => response.json())
.then(data => {
    for(let i = 0; i < data.newsletterData.length; i++){
        console.log(data.newsletterData[i])
        let displayEmail = document.createElement('h4')
        displayEmail.innerText = data.newsletterData[i].email
        document.querySelector('section').appendChild(displayEmail)
    }
})