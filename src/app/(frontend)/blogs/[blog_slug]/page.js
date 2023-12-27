"use client";
import HeaderImages from '@/app/components/frontend_component/HeaderImages';
import UserLayout from '@/app/components/layouts/UserLayout';
import { LoadingContext } from '@/context/Loadingbar';
import React, { useContext, useEffect, useState } from 'react';

function page({ params }) {
    const [blogDetails, setblogDetails] = useState({});
    const { setLoadingBar } = useContext(LoadingContext);
    const fetchBlogData = () => {
        setLoadingBar(50);
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/getSingleBlogs?blog_slug=${params.blog_slug}`)
            .then(async response => {
                setblogDetails(await response.json());
                setLoadingBar(100);
            })
            .catch(error => console.log(error));
    }
    useEffect(() => {
        fetchBlogData();
    }, []);
    return (
        <UserLayout>
            <HeaderImages />
            <section className="section blog-single">
                <div className="container">
                    <div className="row justify-center">
                        <div className="lg:col-8">
                            <img className="rounded-xl" src={blogDetails.thumbnel} alt="" />
                        </div>
                        <div className="mt-10 max-w-[810px] lg:col-9">
                            <h1 className="h2">{blogDetails.blog_name}</h1>
                            <div className="mt-6 mb-5 flex items-center space-x-2">
                                <div
                                    className="blog-author-avatar h-[58px] w-[58px] rounded-full border-2 border-primary p-0.5" style={{ 'overflow': 'hidden' }}
                                >
                                    <img src={blogDetails.authorImage} alt="" />
                                </div>
                                <div className="">
                                    <p className="text-dark">{blogDetails.authorName}</p>
                                    <span className="text-sm">{blogDetails.published_at} 5 Min read</span>
                                </div>
                            </div>

                            <div className="content">
                                <p dangerouslySetInnerHTML={{ __html: blogDetails.blog_content }} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </UserLayout>
    );
}

export default page;
