import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiStar } from 'react-icons/fi';
import './styles.css';
import api from '../../services/api';


export default function List() {

    const [repos, setRepos] = useState([]);
    const [lang, setLang] = useState('');
    const [page, setPage] = useState(1);

    const language = localStorage.getItem('language');

    useEffect(() => {
        api.get('repositories/' + language + '/' + page)
            .then(response => {
                setRepos(response.data);
            });
        setLang(language);

    }, [page, lang]);

    return (
        <div className='outer-container'>
            <Link className="back-link" to="/">
                <FiArrowLeft size={18} color="#6200B5" />
                Back
            </Link>
            <header>
                <span>{'< ' + lang + ' >'}</span>
            </header>
            <span id='subtitle'>Repositories:</span>
            <div className='repo-container'>
                <ul>
                    {
                        repos.map(repo => (
                            <a href={repo.url} className='hyperlink'>
                                <li>
                                    <section>
                                        <img src={repo.avatar_url} />
                                        <span>{repo.full_name}</span>
                                    </section>
                                    <section>
                                        <a href={repo.url + '/stargazers'} className='hyperlink'>
                                            <div className='stars-div'>
                                                <FiStar size={12} color="#FFFFFF" />
                                                <span>{repo.stars_count}</span>
                                            </div>
                                        </a>
                                        <span id='description'>{repo.description}</span>
                                    </section>
                                </li>
                            </a>
                        ))
                    }
                </ul>
                {/*backlink estava aqui*/}
                <div className='footer-container'>
                    {
                        page > 1 ?
                            (
                                <div>
                                    <button onClick={() => setPage(page - 1)} className='prev-button'>Prev</button>
                                    <input placeholder='page' value={page} onChange={e => setPage(e.target.value)} />
                                    <button onClick={() => setPage(page + 1)} className='next-button'>Next</button>
                                </div>

                            ) : (
                                <div>
                                    <button disabled onClick={() => setPage(page - 1)} className='prev-button'>Prev</button>
                                    <input placeholder='page' value={page} onChange={e => setPage(e.target.value)} />
                                    <button onClick={() => setPage(page + 1)} className='next-button'>Next</button>
                                </div>
                            )
                    }
                </div>
            </div>
        </div>
    );
}