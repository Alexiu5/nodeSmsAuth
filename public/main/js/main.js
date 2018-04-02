let socket = io()
socket.on('message', (data)=>{
    console.log('socket message :', data.message)

})

// let form = document.querySelector('form')
// let formData = new FormData(form)
// $("#formLogin").on('submit',function(event){
//     event.preventDefault();
//     alert('this is a message for you babe')
// })