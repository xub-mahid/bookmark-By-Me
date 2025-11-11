const titleH2 = document.getElementById("titleH2");
const titleP = document.getElementById("titleP")
const button = document.getElementById("button")
const password = document.getElementById("password")
const passwordBOX = document.getElementById("passwordBOX")
const fullName = document.getElementById("fullName")
const fullNameBOX = document.getElementById("fullNameBOX")
const linkReset = document.getElementById("linkReset")
const linkSingIn = document.getElementById("linkSingIn")
const signUp = document.getElementById("signUp")



function resetF(){
    titleH2.innerHTML= "Forgot your password?"
    titleP.innerHTML= "Enter your email address below and we'll send you a link to reset your password."
    button.innerHTML= "Reset"
    password.style.display = "none"
    passwordBOX.style.display = "none"
    linkReset.style.display = "none"
    linkSingIn.style.display = "block"
    signUp.style.display  = "block"
    fullName.style.display  = "none"
    fullNameBOX.style.display  = "none"

}
function signUpF(){
    titleH2.innerHTML= "Create your account"
    titleP.innerHTML= "Join us and start saving your favorite links-organized searchable, and always within reach."
    button.innerHTML= "Sign up"
    password.style.display = ""
    passwordBOX.style.display = ""
    fullName.style.display  = "block"
    fullNameBOX.style.display  = "block"
    signUp.style.display  = "none"
    linkReset.style.display = "block"
    linkSingIn.style.display = "block"
}
function singInF(){
     location.reload();
}
function loginCk(event){
      event.preventDefault();
    
    const email = document.getElementById("email").value
    const pass = passwordBOX.value 
      if(email == "jarvisai855@gmail.com" && pass == "1234") {
           window.location.href = "main.html";
        } 
      else {
        alert("Username is invalid!");
      }

}
