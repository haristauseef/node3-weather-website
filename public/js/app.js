console.log("this is from client side javascript")

fetch('http://localhost:3000/weather?').then((response) => {
    response.json().then((data) => {
        if(data.error){
            console.log('there was an error')
        }else{
            console.log(data.location)
            console.log(data.forecast)
        }
    })
})

const weatherForm = document.querySelector('form')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log("submit button is pressed")
})