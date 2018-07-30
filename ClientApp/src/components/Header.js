import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
    <header className="container-fluid">
        <nav className="navbar navbar-expand-sm fixed-top navbar-dark bg-dark">
            <a href="/" class="navbar-left" id="logo"><img id="navImg" src="/Assets/MusicMatchup1.png" /></a>

            <button class="navbar-toggler navbar-toggler-right navbar-right" id="nav-btn" type="button" data-toggle="collapse" data-target="#nav-content" aria-controls="nav-content" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="nav-content">
                <ul className="navbar-nav ml-auto" id="navMenu">
                    <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/bands">Bands</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/artists">Artists</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/logout">Logout</Link></li>
                </ul>
            </div>
        </nav>
    </header>
);

export default Header;
          //<nav className="navbar fixed-top navbar-dark bg-dark">
          //  <a href="#" class="navbar-left"><img id="navImg" src="/Assets/MusicMatchup1.png" /></a>

            //<ul className="nav justify-content-end nav-pills" id="navMenu">
            //    <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            //    <li className="nav-item"><Link className="nav-link" to="/bands">Bands</Link></li>
            //    <li className="nav-item"><Link className="nav-link" to="/artists">Artists</Link></li>
            //    <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
            //    <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
            //    <li className="nav-item"><Link className="nav-link" to="/logout">Logout</Link></li>
            //</ul>
