import React from 'react';
import Header from './Header';
import Footer from './Footer';

function Login() {
  return (
    <div>
        <Header/>
        <div className="mx-5 bg-payne-gray rounded-4 my-5 p-4">
          <form action="" method="">
            <div class="mb-3">
              <label for="" class="form-label">Username or Email</label>
              <input type="text"
                  class="form-control form-control-sm" name="" id="" aria-describedby="helpId" placeholder=""/>
            </div>
            <div class="mb-3">
              <label for="" class="form-label">Password</label>
              <input type="password"
                  class="form-control form-control-sm placeholder-signup" name="" id="" aria-describedby="helpId" placeholder=""/>
            </div>

            <button type="submit" class="btn bg-fire-engine-red mt-3 text-uppercase text-light">Login</button>
            
          </form>
        </div>
        <Footer/>
    </div>
  )
}

export default Login