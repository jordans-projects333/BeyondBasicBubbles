function selectedCurrency(e){
    switch(e.value){
        case "USD":
            document.querySelector('.footer__currency--currencyDisplay').innerHTML = '$-USD<i class="fa-solid fa-chevron-up"></i>'
            document.querySelector('.nav__currency--display').innerHTML = '-Currency: $-USD<i class="fa-solid fa-chevron-up"></i>'
            document.querySelectorAll('.grid__item--price').forEach((item) => {
                item.innerText = "$"+(parseInt(item.dataset.price) * usdRate).toFixed(2)
            })
            break
        case "EUR":
            document.querySelector('.footer__currency--currencyDisplay').innerHTML = '€-EUR<i class="fa-solid fa-chevron-up"></i>'
            document.querySelector('.nav__currency--display').innerHTML = '-Currency: €-EUR<i class="fa-solid fa-chevron-up"></i>'
            document.querySelectorAll('.grid__item--price').forEach((item) => {
                item.innerText = "€"+(parseInt(item.dataset.price) * eurRate).toFixed(2)
            })
            break
        case "GBP":
            document.querySelector('.footer__currency--currencyDisplay').innerHTML = '£-GBP<i class="fa-solid fa-chevron-up"></i>'
            document.querySelector('.nav__currency--display').innerHTML = '-Currency: £-GBP<i class="fa-solid fa-chevron-up"></i>'
            document.querySelectorAll('.grid__item--price').forEach((item) => {
                item.innerText = "£"+item.dataset.price
            })
            break
            
    }
    
}

function appendDataToOptions(selectElement, code, description){
    const optionElement = document.createElement('option')
    optionElement.value = code
    optionElement.textContent = description
    selectElement.appendChild(optionElement)
}

let usdRate
let eurRate
fetch('https://api.exchangerate.host/latest?base=GBP')
.then(response => response.json())
.then(data => {
    const currencyRates = data.rates
    for (const key in currencyRates) {
        if(key == "USD")usdRate = currencyRates[key]
        if(key == "EUR")eurRate = currencyRates[key]
    }
})
const getCurrencyOptions = () => {
    fetch('https://api.exchangerate.host/symbols')
    .then(response => response.json())
    .then((data) => {
        const currencyApiData = data.symbols
        const currencyApiDataList = (Object.values(currencyApiData))
        currencyApiDataList.forEach(e  => {
            if(Object.values(e)[1] == "USD"){
                appendDataToOptions(document.querySelector('.footer__currency select'), Object.values(e)[1], Object.values(e)[0])
                appendDataToOptions(document.querySelector('.nav__currency--select'), Object.values(e)[1], Object.values(e)[0])
            }
            if(Object.values(e)[1] == "EUR"){
                appendDataToOptions(document.querySelector('.footer__currency select'), Object.values(e)[1], Object.values(e)[0])
                appendDataToOptions(document.querySelector('.nav__currency--select'), Object.values(e)[1], Object.values(e)[0])
            }
            if(Object.values(e)[1] == "GBP"){
                appendDataToOptions(document.querySelector('.footer__currency select'), Object.values(e)[1], Object.values(e)[0])
                appendDataToOptions(document.querySelector('.nav__currency--select'), Object.values(e)[1], Object.values(e)[0])
            }
        })
    })
}

getCurrencyOptions()