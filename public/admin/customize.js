document.querySelector("#product__add--form").addEventListener('submit', (e) => {
    e.preventDefault()
    const form = document.querySelector("#product__add--form");
    const formData = new FormData(form);
    const options = {
        method: "POST",
        body: formData,
    };
    fetch("/editProducts/add", options)
    .then(response => response.json())
    .then(data => {
        data.message ? console.log('upload') : console.log('didnt work')
    })
})

let currentEditName
let currentEditElement

document.querySelector("#product__edit--form").addEventListener('submit', (e) => {
    e.preventDefault()
    function checkForDuplicate(){
        let noDuplicates = true
        document.querySelectorAll('.grid__item--name').forEach((item) => {
            if(item.innerText == document.querySelector('.edit__form--name').value && item.closest('.products__grid--item') != currentEditElement.closest('.products__grid--item')){
                noDuplicates = false
            }
        })
        return noDuplicates
    }
    if(checkForDuplicate()){
        const form = document.querySelector("#product__edit--form");
        const formData = new FormData(form);
        // Update original name
        document.querySelector('.edit__form--originalName').value = document.querySelector('.edit__form--name').value
        // name
        currentEditElement.closest('.products__grid--item').querySelector('.grid__item--name').innerText = document.querySelector('.edit__form--name').value
        // price
        currentEditElement.closest('.products__grid--item').querySelector('.grid__item--price').innerText = document.querySelector('.edit__form--price').value
        const options = {
            method: "POST",
            body: formData,
        }
        fetch("/editProducts/edit", options)
        .then(response => response.json())
        .then(data => {
            data.message ? console.log('upload') : console.log('didnt work')
        })
    }
})

function onFileSelected(event) {
    console.log(event.target)
    let selectedFile = event.target.files[0];
    let reader = new FileReader();
  
    let imgtag = currentEditElement.closest('.products__grid--item').querySelector('.grid__item--image')
    imgtag.title = selectedFile.name;
  
    reader.onload = function(event) {
      imgtag.src = event.target.result;
    };
  
    reader.readAsDataURL(selectedFile);
  }

function loadDataIntoItem(dataName, dataPrice){
    const template = document.querySelector("#grid__item--template")
    const the_content = template.content.cloneNode(true)
    let str = dataName
    str = str.replace(/\s/g, '-')
    the_content.querySelector("img").src = `/images/products/${str}.jpg`
    the_content.querySelector(".grid__item--name").innerText = dataName
    the_content.querySelector(".grid__item--price").innerText = dataPrice
    document.querySelector(".section__products--grid").insertBefore(the_content, document.querySelector('.grid__item--addProduct'))
    
    // document.querySelector(`#${data.name} img`).addEventListener("load", () =>{
    //     document.querySelector(`#${data.name}`).querySelector(".loader").style.display = "none"
    // })
}
function editBarIconToggles(item){
    if(document.querySelector('.section__editBar--item.active') != null && document.querySelector('.section__editBar--item.active') == item){
        item.classList.toggle('active')
        return
    }else if(document.querySelector('.section__editBar--item.active') != null){
        document.querySelector('.section__editBar--item.active').classList.remove('active')
        item.classList.add('active')
        return
    }
    item.classList.add('active')
}
function addProductFormToggle(item){
    if(document.querySelector('#editBar__item--add') == item){
        document.querySelector('.section__editBar--addForm').classList.toggle('active')
    }else{
        document.querySelector('.section__editBar--addForm').classList.remove('active')
    }
}
function deleteProductToggle(item){
    if(document.querySelector('#editBar__item--delete') == item){
        document.querySelectorAll('.grid__item--delete').forEach((e) => {
            e.classList.toggle('active')
            e.parentElement.querySelector('img').classList.toggle('active')
        })
    }else{
        document.querySelectorAll('.grid__item--delete').forEach((e) => {
            e.classList.remove('active')
            e.parentElement.querySelector('img').classList.remove('active')
        })
    }
}
function editProductToggle(item){
    document.querySelector('.section__editBar--editForm').classList.remove('active')
    if(document.querySelector('#editBar__item--edit') == item){
        document.querySelectorAll('.grid__item--edit').forEach((e) => {
            e.classList.toggle('active')
            e.parentElement.querySelector('img').classList.toggle('active2')
        })
    }else{
        document.querySelectorAll('.grid__item--edit').forEach((e) => {
            e.classList.remove('active')
            e.parentElement.querySelector('img').classList.remove('active2')
        })
    }
}
// ===== Add product button =====
document.querySelector('#editBar__item--add').addEventListener('click', () => {
    editBarIconToggles(document.querySelector('#editBar__item--add'))
    addProductFormToggle(document.querySelector('#editBar__item--add'))
    deleteProductToggle(document.querySelector('#editBar__item--add'))
    editProductToggle(document.querySelector('#editBar__item--add'))

})
// ===== Edit product button =====
document.querySelector('#editBar__item--edit').addEventListener('click', () => {
    editBarIconToggles(document.querySelector('#editBar__item--edit'))
    addProductFormToggle(document.querySelector('#editBar__item--edit'))
    deleteProductToggle(document.querySelector('#editBar__item--edit'))
    editProductToggle(document.querySelector('#editBar__item--edit'))
})
// ===== Delete product button =====
document.querySelector('#editBar__item--delete').addEventListener('click', () => {
    editBarIconToggles(document.querySelector('#editBar__item--delete'))
    addProductFormToggle(document.querySelector('#editBar__item--delete'))
    deleteProductToggle(document.querySelector('#editBar__item--delete'))
    editProductToggle(document.querySelector('#editBar__item--delete'))
})
let areYouSure = false
function deleteClicked(e){
    e.querySelector('.item__delete--text').style.display = 'block'
    if(!areYouSure){
        areYouSure = !areYouSure
    }else{
        e.parentElement.remove()
        areYouSure = false
        const options3 = {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ name: e.parentElement.querySelector('.grid__item--name').innerText}),
        };
        fetch("/editProducts/delete", options3)
        .then(response => response.json())
    }
}
function deleteLeave(e){
    e.querySelector('.item__delete--text').style.display = 'none'
    areYouSure = false
}
function editClicked(e){
    document.querySelector('.section__editBar--editForm').classList.toggle('active')
    currentEditName = e.closest('.products__grid--item').querySelector('.grid__item--name').innerText
    let currentEditPrice = e.closest('.products__grid--item').querySelector('.grid__item--price').innerText
    document.querySelector('.edit__form--name').value = currentEditName
    document.querySelector('.edit__form--price').value = currentEditPrice
    document.querySelector('.edit__form--originalName').value = currentEditName
    currentEditElement = e
}
function closeEdit(){
    document.querySelector('.section__editBar--editForm').classList.remove('active')
}
const options2 = {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
};
fetch("/getProducts", options2)
.then(response => response.json())
.then((data) => {
    for(let i = 0; i < data.alreadyExists.length; i++){
        if(document.readyState == "complete"){
            loadDataIntoItem(data.alreadyExists[i].name, data.alreadyExists[i].price)
        }else{
            window.addEventListener("load", () => {
                loadDataIntoItem(data.alreadyExists[i].name, data.alreadyExists[i].price)
            })
        }
    }
})


