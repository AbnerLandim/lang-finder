import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './styles.css';
import Logo from '../../assets/github-logo.svg';
import { FiSearch } from 'react-icons/fi';

export default function Main() {

    const [lang, setLang] = useState('');
    const history = new useHistory();

    function search() {
        localStorage.setItem('language', lang);
        history.push('list');
    }

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
                    <input 
                        placeholder="Select language..." 
                        onChange={e => setLang(e.target.value)}
                    />
                    <button onClick={search}>
                        <FiSearch size={18} color='#ffffff'/>
                    </button>
                </div>

            </div>
        </div>
    );
}