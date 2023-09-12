import React from 'react'
import Login from '../pages/Login'
import { Link } from 'react-router-dom'
 

function LoginRegister({children,classNames}) {


    const combinedClassNames = Array.isArray(classNames)
    ? classNames.join(' ')
    : classNames;

  return (
    <>
    
{/* <!-- Modal trigger button --> */}
<button  className={combinedClassNames} data-bs-toggle="modal" data-bs-target="#sign-in">{children}</button>
{/* 
{/* <!-- Modal Body --> */}
{/* <!-- if you want to close by clicking outside the modal, delete the last endpoint:data-bs-backdrop and data-bs-keyboard --> */}
 <div class="modal fade" id="sign-in" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
  <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered  modal-lg  modal-md modal-xl" role="document">
    <div class="modal-content mx-lg-5 mx-2  bg-payne-gray  my-5 p-4">
      <div class="modal-header px-md-2 px-0">
        <h5 class="modal-title text-uppercase" id="modalTitleId">login to your account </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body px-md-2 px-0">
    
        <Login/>
    
      </div>
     
    </div>
  </div>
</div> 


{/* <!-- Optional: Place to the bottom of scripts --> */}
<script>
  const myModal = new bootstrap.Modal(document.getElementById('modalId'), options)

</script>

    </>
  )
}

export default LoginRegister