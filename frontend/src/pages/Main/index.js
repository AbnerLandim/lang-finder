import React from 'react';
import './styles.css';
import Logo from '../../assets/github-logo.svg';

export default function Main() {

    //codificação
    localStorage.setItem('language', 'javascript');

    return (
        <div className='main-container'>
            <div className="content-container">

                <header>
                    <img src={Logo} />
                    <span>Lang Finder</span>
                </header>

                <div className='message-container'>
                    <span>Search for any language you'd like to see projects about, so we can show you repositories containing them.</span>
                </div>

                <div className='control-container'>

                    <select>
                        <option value="" disabled selected hidden>Select language...</option>
                    </select>

                </div>
            </div>
        </div>
    );
}