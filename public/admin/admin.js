


const options = {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
};
fetch("/getProducts", options)
.then(response => response.json())
.then((data) => {
    for(let i = 0; i < data.alreadyExists.length; i++){
        
        
        let str = data.alreadyExists[i].name
        str = str.replace(/\s/g, '-')
        const template = document.querySelector('.section__products template')
        const the_content = template.content.cloneNode(true)
        the_content.querySelector('img').src = `/images/products/${str}.jpg`
        the_content.querySelector('h3').innerText = data.alreadyExists[i].name
        document.querySelector('.section__products').appendChild(the_content)
    }
})