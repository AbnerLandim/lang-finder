import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiStar } from 'react-icons/fi';
import Loading from 'react-loading';
import './styles.css';

export default function List() {

    const [lang, setLang] = useState('');
    const [currentData, setCurrentDataData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [currPage, setCurrPage] = useState(0);

    const language = localStorage.getItem('language');
    const repositories = localStorage.getItem('repositories');

    useEffect(() => {

        setIsLoading(true);
        setLang(language);
        setCurrentDataData(JSON.parse(repositories).slice(offset, offset + 5));
        setIsLoading(false);
        setPageCount(Math.ceil(Object.keys(JSON.parse(repositories)).length / 5));
        offset > 4 ? setCurrPage(parseInt((offset) / 5) + 1) : setCurrPage(parseInt(offset) + 1)

    }, [offset, lang]);

    return (
        <div className='outer-container'>
            <Link className="back-link" to="/">
                <FiArrowLeft size={18} color="#A888C3" />
                Back
            </Link>
            <header>
                <span className='title-decor'>{'<'}</span>
                <span>{lang}</span>
                <span className='title-decor'>{'>'}</span>
            </header>
            <span id='subtitle'>Repositories:</span>
            <div className='repo-container'>

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
                            <ul>
                                {
                                    currentData.map(curr => (
                                        <a href={curr.url} className='hyperlink' target="_blank">
                                            <li key={curr.full_name}>
                                                <section>
                                                    <img src={curr.avatar_url} />
                                                    <span id='full-name'>{curr.full_name}</span>
                                                </section>
                                                <section>
                                                    <a
                                                        href={curr.url + '/stargazers'}
                                                        className='hyperlink'
                                                        target="_blank">

                                                        <div className='stars-div'>
                                                            <FiStar size={12} color="#FFFFFF" />
                                                            <span>{curr.stars_count}</span>
                                                        </div>

                                                    </a>
                                                    <span id='description'>{curr.description}</span>
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
                        offset > 4 ?
                            (
                                <div>
                                    <button
                                        onClick={() => setOffset(parseInt(offset) - 5)}
                                        className='prev-button'>
                                        Prev
                                    </button>
                                    <label>
                                        {parseInt((offset) / 5) + 1} / {pageCount}
                                    </label>
                                    {
                                        currPage === pageCount ?
                                            (
                                                <button
                                                    disabled
                                                    onClick={() => setOffset(parseInt(offset) + 5)}
                                                    className='next-button'>
                                                    Next
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => setOffset(parseInt(offset) + 5)}
                                                    className='next-button'>
                                                    Next
                                                </button>)
                                    }

                                </div>
                            ) : (
                                <div>
                                    <button
                                        disabled
                                        onClick={() => setOffset(parseInt(offset) - 5)}
                                        className='prev-button'>
                                        Prev
                                    </button>
                                    <label>
                                        {parseInt(offset) + 1} / {pageCount}
                                    </label>
                                    {
                                        currPage === pageCount ?
                                            (
                                                <button
                                                    disabled
                                                    onClick={() => setOffset(parseInt(offset) + 5)}
                                                    className='next-button'>
                                                    Next
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => setOffset(parseInt(offset) + 5)}
                                                    className='next-button'>
                                                    Next
                                                </button>)
                                    }
                                </div>
                            )
                    }
                </div>
            </div>
        </div>
    );
}