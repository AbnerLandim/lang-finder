import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiStar } from 'react-icons/fi';
import Loading from 'react-loading';
import './styles.css';
import api from '../../services/api';

export default function List() {

    const [repos, setRepos] = useState([]);
    const [lang, setLang] = useState('');
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [sorry, setSorry] = useState(false);

    const language = localStorage.getItem('language');

    useEffect(() => {
        setIsLoading(true);
        api.get('repositories/' + language + '/' + page)
            .then(response => {

                setRepos(response.data);   
                setIsLoading(false);  
                setLang(language);

            }).catch(function (error) {
                setLang('Not found');
                setSorry(true);
            })
            
    }, [page, lang]);

    return (
        <div className='outer-container'>
            <Link className="back-link" to="/">
                <FiArrowLeft size={18} color="#A888C3" />
                Back
            </Link>
            <header>
                <span className='title-decor'>{'<'}</span><span>{lang}</span><span className='title-decor'>{'>'}</span>
            </header>
            <span id='subtitle'>Repositories:</span>
            <div className='repo-container'>

                {
                    isLoading ? (
                        [!sorry ? (
                            <div className='loading'>
                                <Loading
                                    type={'spinningBubbles'}
                                    color={'#ffffff'}
                                    height={'6%'}
                                    width={'6%'}
                                />
                            </div>

                        ) : (
                                <div className='sorry-msg'><span>There is no match for your search.</span></div>
                            )]
                    ) : (
                            <ul>
                                {
                                    repos.map(repo => (
                                        <a href={repo.url} className='hyperlink' target="_blank">
                                            <li>
                                                <section>
                                                    <img src={repo.avatar_url} />
                                                    <span>{repo.full_name}</span>
                                                </section>
                                                <section>
                                                    <a href={repo.url + '/stargazers'} className='hyperlink' target="_blank">
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
                        )
                }

                <div className='footer-container'>
                    {
                        page > 1 ?
                            (
                                <div>
                                    <button
                                        onClick={() => setPage(parseInt(page) - 1)}
                                        className='prev-button'>
                                        Prev
                                    </button>
                                    <input
                                        placeholder='page'
                                        value={page}
                                        onChange={e => setPage(e.target.value)}
                                    />
                                    <button
                                        onClick={() => setPage(parseInt(page) + 1)}
                                        className='next-button'>
                                        Next
                                    </button>
                                </div>

                            ) : (
                                <div>
                                    <button
                                        disabled
                                        onClick={() => setPage(parseInt(page) - 1)}
                                        className='prev-button'>
                                        Prev
                                    </button>
                                    <input
                                        placeholder='page'
                                        value={page}
                                        onChange={e => setPage(e.target.value)}
                                    />
                                    <button
                                        onClick={() => setPage(parseInt(page) + 1)}
                                        className='next-button'>
                                        Next
                                    </button>
                                </div>
                            )
                    }
                </div>
            </div>
        </div>
    );
}