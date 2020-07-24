import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './styles.css';
import Logo from '../../assets/github-logo.svg';
import { FaSistrix, FaGithubAlt, FaLinkedin, FaEnvelope } from 'react-icons/fa';

export default function Main() {

    const [lang, setLang] = useState('');
    const history = new useHistory();

    function search(e) {
        e.preventDefault();
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

                <form className='control-container' onSubmit={search}>
                    <input
                        placeholder="Search language..."
                        onChange={e => setLang(e.target.value)}
                        required
                    />
                    <button type='submit'>
                        <FaSistrix size={18} color='#ffffff' />
                    </button>
                </form>

                <div className='footer-div'>
                    <a href='https://github.com/AbnerLandim' target='_blank'>
                        <FaGithubAlt size={18} color='#000000' />
                    </a>
                    <a href='https://www.linkedin.com/in/abner-landim-siqueira' target='_blank'>
                        <FaLinkedin size={18} color='#000000' />
                    </a>
                    <a href='mailto:abner.landim340@gmail.com' target='_blank'>
                        <FaEnvelope size={18} color='#000000' />
                    </a>
                </div>

            </div>
        </div>
    );
}