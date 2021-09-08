

import React, {useState} from 'react'
import Button from '../../components/button'
import InputTxt from '../../components/inputText'
function Login() {

   
    const salao = () => {
        console.log('salao')
    }
    const cozinha = () => {
       console.log('cozinha')
    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");



   function loginBtn(e) {
       e.preventDefault();
       if (email ==="" || password ===""){
           console.log("nao pode")
       }else{
           fetch('https://lab-api-bq.herokuapp.com/auth', {
               method: 'POST',
               headers: {
                  'accept': 'application/json',
                  'Content-Type': 'application/x-www-form-urlencoded'
               },
               body: `email=${email}&password=${password}`
           })
           .then((response) => response.json())
           .then((json) => {
               const token = json.token
               const id = json.id
               const tokenUser = localStorage.setItem('token', token)
               const idUser = localStorage.setItem('id', id)

               if (tokenUser !== null && idUser !==null && json.role === "cozinha") {
                   cozinha();
               } else if (tokenUser !== null && idUser !==null && json.role ==="salao") {
                   salao()
               } else {
                   console.log("nada deu bom")
               }
           })
       }
   }
   

    return(
    
   <div>
       <form className="login">
           <h1>Faça Login</h1>
           <InputTxt
        
          inputType="text"
          inputPlaceholder=" Digite seu E-mail"
          inputValue={email}
          inputOnChange={(event) => setEmail(event.target.value)}
          inputClassName="LoginInput"
        />

        <InputTxt
        
          inputType="password"
          inputPlaceholder=" Digite sua senha"
          inputValue={password}
          inputOnChange={(event) => setPassword(event.target.value)}
          inputClassName="LoginInput"
        />

          <Button 
          buttonOnClick={loginBtn}
          buttonText="Login"
          btnClassName="btnForm"
          
        />
           
       </form>
   </div>
    )

}

export default Login;