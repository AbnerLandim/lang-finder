import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import api from '../../services/api';

export default function List() {

    const [repos, setRepos] = useState([]);
    const [lang, setLang] = useState('');

    const language = localStorage.getItem('language');

    useEffect(() => {
        api.get('repositories/' + language + '/1')
            .then(response => {
                setRepos(response.data);
            });
        setLang(language);

    }, [lang]);

    return (
        <div className='outer-container'>
            <header>
                <span>{lang}</span>
            </header>
            <span id='subtitle'>Repositories:</span>
            <div className='repo-container'>
                <ul>
                    {
                        repos.map(repo => (
                            <a href={repo.url} className='hyperlink'>
                                <li>
                                    <img src={repo.avatar_url} />                                  
                                    <span>{repo.full_name}</span>                                   
                                </li>
                            </a>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
}