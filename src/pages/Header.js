import React from 'react'
import { Link,useLocation } from 'react-router-dom';
import brandlogo from '../cinemascopelogo.png';
import '../navbarStyles.css';
import classNames from 'classnames';
function Header() {
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    const navbarClasses = classNames(
        'navbar',
        'navbar-expand-sm',
        {'transparent-bg':isHomePage},
        {'colored-bg':!isHomePage}
    );

  return (
    <>
    <nav className={navbarClasses}>
          <div className="container ">
            <Link className="navbar-brand" to="/"><img className="logo" src={brandlogo} alt="Company Logo" /></Link>
            <button className="navbar-toggler btn-light  d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse " id="collapsibleNavId">
                <ul className="navbar-nav me-auto mt-2 mt-lg-0">
                    <li className="nav-item">
                        <Link to="/login"className="nav-link active" href="#" aria-current="page">Sign in <span className="visually-hidden">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" href="#">create account</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" href="#">films</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" href="#">members</Link>
                    </li>
                    <li className="nav-item dropdown">
                        <Link className="nav-link dropdown-toggle" href="#" id="dropdownId" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</Link>
                        <div className="dropdown-menu" aria-labelledby="dropdownId">
                            <Link className="dropdown-item" href="#">Action 1</Link>
                            <Link className="dropdown-item" href="#">Action 2</Link>
                        </div>
                    </li>
                </ul>
                <form className="d-flex my-2 my-lg-0">
                    <input className="form-control me-sm-2" type="text" placeholder="Search"/>
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>
      </div>
    </nav>
    
    </>
  )
}

export default Header