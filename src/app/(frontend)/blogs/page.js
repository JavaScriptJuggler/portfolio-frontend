"use client";
import UserLayout from '@/app/components/layouts/UserLayout';
import React, { useContext, useEffect, useState } from 'react';
import BlogCards from './BlogCards';
import HeaderImages from '@/app/components/frontend_component/HeaderImages';
import Breadcrumb from '@/app/components/frontend_component/Breadcrumb';
import { LoadingContext } from '@/context/Loadingbar';

function page() {
    const { setLoadingBar } = useContext(LoadingContext);
    const [allBlogs, setblogs] = useState([]);
    const [totalCounts, setTotalCounts] = useState(0);
    const [offset, setoffset] = useState(0);
    const getBlogLists = () => {
        setLoadingBar(50);
        fetchMore();
        setLoadingBar(100);
    }

    const fetchMore = async () => {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getblogs?offset=${offset}`, {
            method: 'GET',
        })
            .then(async response => {
                let blogs = await response.json();
                setblogs([...allBlogs, ...blogs.data]);
                setTotalCounts(blogs.count);
                setoffset(blogs.data.length);
            })
            .catch(error => console.log(error));
    }

    useEffect(() => {
        getBlogLists();
    }, []);
    return (
        <UserLayout>
            <HeaderImages />
            <section className="page-hero pt-16 pb-14">
                <div className="container">
                    <Breadcrumb pagename="Blogs" />
                    <div className="page-hero-content mx-auto max-w-[768px] text-center">
                        <h1 className="mb-5 mt-8">
                            Explore My Creative Blog
                        </h1>
                    </div>
                </div>
            </section>
            <section className="section pt-0">
                <div className="container">
                    <div className="row">
                        <BlogCards blogs={allBlogs} totalCounts={totalCounts} fetchMore={fetchMore} />
                    </div>
                </div>
            </section>
        </UserLayout>
    );
}

export default page;
