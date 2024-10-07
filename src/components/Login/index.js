import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, createUserWithEmailAndPassword, GoogleAuthProvider, getRedirectResult } from "firebase/auth";
const provider = new GoogleAuthProvider();

const Login = ({ setIsAuthenticated }) => {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const auth = getAuth();

  const handleLogin = e => {
    e.preventDefault();

    if(document.activeElement.name === "Google" ){

      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          // IdP data available using getAdditionalUserInfo(result)

          Swal.fire({
          timer: 1500,
          showConfirmButton: false,
          willOpen: () => {
            Swal.showLoading();
          },
          willClose: () => {
            localStorage.setItem('is_authenticated', true);
            setIsAuthenticated(true);
  
            Swal.fire({
              icon: 'success',
              title: 'Successfully logged in!' +user,
              showConfirmButton: false,
              timer: 1500,
            });
          },
        });
          // ...
        }).catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...

          Swal.fire({
            timer: 1500,
            showConfirmButton: false,
            willOpen: () => {
              Swal.showLoading();
            },
            willClose: () => {
              Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Incorrect email or password.'+errorMessage+", "+errorCode,
                showConfirmButton: true,
              });
            },
          });
        });

    }else if(document.activeElement.name === "Login" ){

      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        Swal.fire({
          timer: 1500,
          showConfirmButton: false,
          willOpen: () => {
            Swal.showLoading();
          },
          willClose: () => {
            localStorage.setItem('is_authenticated', true);
            setIsAuthenticated(true);
  
            Swal.fire({
              icon: 'success',
              title: 'Successfully logged in!' +user,
              showConfirmButton: false,
              timer: 1500,
            });
          },
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        Swal.fire({
          timer: 1500,
          showConfirmButton: false,
          willOpen: () => {
            Swal.showLoading();
          },
          willClose: () => {
            Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: 'Incorrect email or password.'+errorMessage+", "+errorCode,
              showConfirmButton: true,
            });
          },
        });
      });

    }else if(document.activeElement.name === "Register"){

      try{
        createUserWithEmailAndPassword(auth, email, password)
        Swal.fire({
          timer: 1500,
          showConfirmButton: false,
          willOpen: () => {
            Swal.showLoading();
          },
          willClose: () => {
            localStorage.setItem('is_authenticated', true);
            setIsAuthenticated(true);
  
            Swal.fire({
              icon: 'success',
              title: 'Successfully registered and loffed in!' +email,
              showConfirmButton: false,
              timer: 1500,
            });
          },
        })
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
      } catch(error){
        console.log(error);
      }

    }

  };

  return (
    <div className="small-container">
      <form onSubmit={handleLogin}>
        <h1>Admin Login</h1>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="admin@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="qwerty"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <input style={{ marginTop: '12px', marginLeft: '12px', backgroundColor: 'blue' }} type="submit" value="Login" name="Google" />
        <input style={{ marginTop: '12px', marginLeft: '12px', backgroundColor: 'green'  }} type="submit" value="Login2" name="Login" />
        <input style={{ marginTop: '12px', marginLeft: '12px', backgroundColor: 'black' }} type="submit" value="Register2" name="Register" />
      </form>
    </div>
  );
};

export default Login;
