"use client";
import HeaderImages from '@/app/components/frontend_component/HeaderImages';
import UserLayout from '@/app/components/layouts/UserLayout';
import { LoadingContext } from '@/context/Loadingbar';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';

function page({ params }) {
    const [Portfolio, setPortfolio] = useState({});
    const { setLoadingBar } = useContext(LoadingContext);
    const fetchPortfolio = () => {
        setLoadingBar(50);
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/getSinglePortfolio?slug=${params.portfolio_slug}`)
            .then(async response => {
                let getData = await response.json();
                setPortfolio(getData);
                setLoadingBar(100);
            })
            .catch(error => console.log(error));
    }

    useEffect(() => {
        fetchPortfolio();
    }, []);
    return (
        <UserLayout>
            <HeaderImages />
            <section className="integration-single section pt-0">
                <div className="container">
                    <div className="row justify-center">
                        <div className="lg:col-10">
                            <div
                                className="integration-single-container rounded-xl bg-white py-16 px-5 shadow-lg md:px-10 tab" data-tab-group="service-tab"
                            >
                                <div className="px-4 text-center">
                                    <img
                                        className="mx-auto"
                                        src="images/icons/webflow-colored.svg"
                                        alt=""
                                    />
                                    <h1 className="mt-6">{Portfolio.portfolio_name}</h1>
                                    <p className="mt-6">{Portfolio.portfolio_short_description}</p>
                                    <Link className="btn btn-primary mt-8 px-10" href="/portfolio">Show all portfolios</Link>
                                </div>
                                <div className="px-4 mt-10">
                                    <div className="tab-content-panel" dangerouslySetInnerHTML={{ __html: Portfolio.portfolio_description }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </UserLayout >
    );
}

export default page;
