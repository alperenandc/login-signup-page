const container = document.querySelector(".container")
const signup = document.querySelector(".signup-link")
const login = document.querySelector(".login-link")
const eyeicon = document.querySelectorAll(".eye-icon")
const pwFields =document.querySelectorAll(".password")
const email = document.querySelector(".email")
const check = document.querySelector(".check")
const msg = document.querySelector(".error-msg")
const email2 = document.querySelector(".email2")
const check2 = document.querySelector(".check2")
const msg2 = document.querySelector(".error-msg2")
const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ ;
const confirm = document.querySelector(".confirm")
const create = document.querySelector(".create")
const pmsg = document.querySelector(".p-message")


eyeicon.forEach(eye => {
    eye.addEventListener("click", () => {
        pwFields.forEach(pass => {
            if (pass.type === "password") {
                pass.type = "text"
                eyeicon.forEach(icon => {
                    icon.classList.replace("uil-eye-slash", "uil-eye")
                    
                })
            }
        
            else {
                pass.type = "password"
                eyeicon.forEach(icon=>{
                    icon.classList.replace("uil-eye" , "uil-eye-slash")
                })
            }
        })
    })

})



signup.addEventListener("click", () => {
    container.classList.add("show-signup")
})
login.addEventListener("click", () => {
    container.classList.remove("show-signup")
}
)



function checker(){
    if(email.value.match(mailRegex)){
    check.innerHTML = ' <i class="fa-regular fa-circle-check"></i>'
    msg.style.display="none"
    check.style.color="#2ecc71"
}
else if(email.value == ""){
    check.style.display="none"
    msg.style.display = "none"
    
}
else{
    check.innerHTML='<i class="fa-solid fa-circle-exclamation"></i>'
    msg.style.display="block"
    check.style.color = "#ff2851"
}

}
function checker2(){
    if(email2.value.match(mailRegex)){
        check2.innerHTML = ' <i class="fa-regular fa-circle-check"></i>'
        msg2.style.display="none"
        check2.style.color="#2ecc71"
    }
    else if(email2.value == ""){
        check2.style.display="none"
        msg2.style.display = "none"
        
    }
    else{
        check2.innerHTML='<i class="fa-solid fa-circle-exclamation"></i>'
        msg2.style.display="block"
        check2.style.color = "#ff2851"
    }
    
    }

    function checkPassword(){
        if(create.value != confirm.value){
            pmsg.style.display="block"

        }
        else if(create.value == confirm.value)
            pmsg.style.display="none"
    }
