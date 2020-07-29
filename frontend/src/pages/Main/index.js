import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './styles.css';
import api from '../../services/api';
import Logo from '../../assets/github-logo.svg';
import Loading from 'react-loading';
import { FaSistrix, FaGithubAlt, FaLinkedin, FaEnvelope } from 'react-icons/fa';

export default function Main() {

    const [lang, setLang] = useState('');
    const [sorry, setSorry] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const history = new useHistory();

    function search(e) {
        e.preventDefault();

        localStorage.clear();
        setIsLoading(true);
        setSorry(false);
        api.get(`repositories/${lang}`)
            .then(res => {
                localStorage.setItem('repositories', JSON.stringify(res.data));
                localStorage.setItem('language', lang);
                setIsLoading(false);
                history.push('list');
            }).catch(function (error) {
                console.log(error);
                setIsLoading(false);
                setSorry(true);
            })
    }

    return (
        <div className='main-container'>
            <div className="content-container">
                <div>
                    <header>
                        <img src={Logo} alt='lang-finder logo' />
                        <span>Lang Finder</span>
                    </header>

                    <div className='message-container'>
                        <span>Search for any language you'd like to see projects about, so we can show you repositories containing them.</span>
                    </div>

                    <form className='control-container' onSubmit={search}>
                        <input
                            placeholder="Search language..."
                            onChange={e => setLang(e.target.value.replace(/[~`!@#$%^&()_={}[\]:;,.<>+?-]/g, "").toLowerCase().split(" ")[0])}
                            required
                            autofocus
                        />
                        <button type='submit'>
                            <FaSistrix size={18} color='#ffffff' />
                        </button>
                    </form>

                    {
                        sorry ?
                            (
                                <div className='sorry-msg'><span>There is no match for your search.</span></div>
                            ) : (
                                <div><span></span></div>
                            )
                    }

                    <div className='footer-div'>
                        <a href='https://github.com/AbnerLandim' target='_blank' rel="noopener noreferrer">
                            <FaGithubAlt size={18} color='#000000' />
                        </a>
                        <a href='https://www.linkedin.com/in/abner-landim-siqueira' target='_blank' rel="noopener noreferrer">
                            <FaLinkedin size={18} color='#000000' />
                        </a>
                        <a href='mailto:abner.landim340@gmail.com' target='_blank' rel="noopener noreferrer">
                            <FaEnvelope size={18} color='#000000' />
                        </a>
                    </div>

                    {
                        isLoading ? (

                            <div className='loading'>
                                <Loading
                                    type={'spinningBubbles'}
                                    color={'#ffffff'}
                                    height={'6%'}
                                    width={'6%'}
                                />
                            </div>
                        ) : (
                                <div><span></span></div>
                            )
                    }
                </div>
            </div>
        </div>
    );
}