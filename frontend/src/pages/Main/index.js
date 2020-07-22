import React from 'react';
import './styles.css';
import Logo from '../../assets/github-logo.svg';

export default function Main() {

    //codificação

    return (
        <div className='main-container'>
            <div className="content-container">
                <header>
                    <img src={Logo} />
                    <span>Lang Finder</span>
                </header>
                <div className='control-container'>
                    <section>
                        <span>Search for any language you'd like to see projects about, so we can show you repositories containing them.</span>
                    </section>
                    <section>
                        <select>
                            <option value="" disabled selected hidden>Select language...</option> 
                        </select>
                    </section>
                </div>
                <div className="data-container">
                    teste
                </div>
            </div>
        </div>
    );
}