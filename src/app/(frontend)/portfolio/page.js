"use client";
import Breadcrumb from '@/app/components/frontend_component/Breadcrumb';
import HeaderImages from '@/app/components/frontend_component/HeaderImages';
import UserLayout from '@/app/components/layouts/UserLayout';
import React, { useContext, useEffect, useState } from 'react';
import PortfolioCard from './PortfolioCard';
import { LoadingContext } from '@/context/Loadingbar';

function page() {
    const [portfolios, setPortfolios] = useState([]);
    const [portfoliosFilter, setPortfoliosFilter] = useState([]);
    const [portfoliosCategory, setPortfoliosCategory] = useState([]);
    const { setLoadingBar } = useContext(LoadingContext);
    const fetchPortfolios = () => {
        setLoadingBar(40);
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/getPortfolios`)
            .then(async response => {
                let getPortfolios = await response.json();
                setPortfolios(getPortfolios.getPortfolios);
                setPortfoliosFilter(getPortfolios.getPortfolios);
                setPortfoliosCategory(getPortfolios.getPortfolioCategory);
                setLoadingBar(100);
            })
            .catch(error => console.log(error));
    }

    /* filter records */
    const filterRecords = (categoryValue, element) => {

        if (categoryValue !== 'all') {
            let portfolioArr = [...portfolios].filter((item) => {
                return item.category_value === categoryValue;
            })
            setPortfoliosFilter(portfolioArr);
        } else {
            setPortfoliosFilter(portfolios);
        }
        const elements = document.querySelectorAll('.filter-btn');
        elements.forEach((element) => {
            element.classList.remove('filter-btn-active');
        })
        element.classList.add('filter-btn-active');
    }

    useEffect(() => {
        fetchPortfolios();
    }, [])
    return (
        <UserLayout>
            <HeaderImages />
            <section className="page-hero pt-16 pb-10">
                <div className="container">
                    <Breadcrumb pagename="Portfolios" />
                    <div className="page-hero-content mx-auto max-w-[768px] text-center">
                        <h1 className="mb-5 mt-8">
                            Explore Soumya's Portfolio Showcase
                        </h1>
                        <p>
                            Embark on a visual journey through my diverse portfolio, showcasing design, development, and creative projects that define my passion and expertise.
                        </p>
                    </div>
                </div>
            </section>
            <section className="section pt-0">
                <div className="container">
                    <div className="row justify-center">
                        <div className="lg:col-10">
                            <ul className="integration-tab filter-list justify-center">
                                <li>
                                    <a className="filter-btn filter-btn-active btn btn-sm" onClick={(e) => {
                                        e.preventDefault();
                                        filterRecords('all', e.target)
                                    }}>All</a
                                    >
                                </li>
                                {
                                    portfoliosCategory.map((item, index) => {
                                        return (
                                            <li key={index}>
                                                <a className="filter-btn btn btn-sm" onClick={(e) => {
                                                    e.preventDefault();
                                                    filterRecords(item.category_value, e.target)
                                                }} >{item.category_value}</a>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="row mt-10 integration-tab-items">
                        <PortfolioCard portfolios={portfoliosFilter} />
                    </div>
                </div>
            </section>
        </UserLayout>
    );
}

export default page;
