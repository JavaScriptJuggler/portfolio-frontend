"use client"
import UserLayout from '@/app/components/layouts/UserLayout';
import React, { useContext, useEffect, useState } from 'react';
import gallery1 from '../../assets/frontend_assets/images/about/gallery-img-1.png';
import gallery2 from '../../assets/frontend_assets/images/about/gallery-img-2.png';
import gallery3 from '../../assets/frontend_assets/images/about/gallery-img-3.png';
import shape from '../../assets/frontend_assets/images/shape.svg';
import Image from 'next/image';
import HeaderImages from '@/app/components/frontend_component/HeaderImages';
import Breadcrumb from '@/app/components/frontend_component/Breadcrumb';
import Link from 'next/link';
import { ResumeContext } from '@/context/Resume';
import { LoadingContext } from '@/context/Loadingbar';
import SkillCards from './SkillCards';
function page() {
    const [aboutDescription, setaboutDescription] = useState('');
    const [aboutCounters, setAboutCounters] = useState({ 'number_of_project': '', 'programming_language_known': '', 'framework_known': '', 'client_handled': '' });
    const [skills, setskills] = useState([]);
    const { resumeLink } = useContext(ResumeContext);
    const { setLoadingBar } = useContext(LoadingContext);
    const getAboutInfo = () => {
        setLoadingBar(50);
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/getAboutData`)
            .then(async response => {
                let getData = await response.json();
                setaboutDescription(getData.data.description);
                const { number_of_project, programming_language_known, framework_known, client_handled } = getData.data;
                setAboutCounters({ number_of_project, programming_language_known, framework_known, client_handled });
                setskills(getData.skills);
                setLoadingBar(100);
            })
            .catch(error => console.log(error));
    }

    useEffect(() => {
        getAboutInfo();
    }, []);
    return (
        <UserLayout>
            <HeaderImages />
            <section className="page-hero py-16">
                <div className="container">
                    <Breadcrumb pagename='About' />
                    <div className="page-hero-content mx-auto max-w-[768px] text-center">
                        <h1 className="mb-5 mt-8">About Myself</h1>
                        <p>{aboutDescription}</p>
                        <div className="mt-11 justify-center sm:flex">
                            <a className="btn btn-primary m-3 block sm:inline-block" href={resumeLink}
                            >Download My Resume</a
                            >
                            <Link
                                className="btn btn-outline-primary m-3 block min-w-[160px] sm:inline-block"
                                href="/portfolio"
                            >My Portfolio</Link>
                        </div>
                    </div>
                    <div className="counter mt-16">
                        <div className="row mx-0 rounded-[20px] bg-white px-10 shadow-lg lg:py-10">
                            <div
                                className="border-border px-10 py-10 text-center sm:col-6 lg:col-3 lg:border-r lg:py-0"
                            >
                                <h2>
                                    <span className="count">{String(aboutCounters.number_of_project).padStart(2, '0')}</span> <span className="text-[#A3A1FB]">+</span>
                                </h2>
                                <p>Projects Completed</p>
                            </div>
                            <div
                                className="border-border px-10 py-10 text-center sm:col-6 lg:col-3 lg:border-r lg:py-0"
                            >
                                <h2>
                                    <span className="count">{String(aboutCounters.programming_language_known).padStart(2, '0')}</span>
                                    <span className="text-[#5EE2A0]">+</span>
                                </h2>
                                <p>Coding Languages</p>
                            </div>
                            <div
                                className="border-border px-10 py-10 text-center sm:col-6 lg:col-3 lg:border-r lg:py-0"
                            >
                                <h2>
                                    <span className="count">{String(aboutCounters.framework_known).padStart(2, '0')}</span> <span className="text-primary">+</span>
                                </h2>
                                <p>Frameworks & Libraries</p>
                            </div>
                            <div className="px-10 py-10 text-center sm:col-6 lg:col-3 lg:py-0">
                                <h2>
                                    <span className="count">{String(aboutCounters.client_handled).padStart(2, '0')}</span> <span className="text-[#FEC163]">+</span>
                                </h2>
                                <p>Client Handled</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section">
                <div className="container">
                    <div className="row justify-center text-center">
                        <div className="col-8">
                            <h2>Passionate software developer crafting innovative solutions for impactful user experiences.</h2>
                        </div>
                    </div>
                    <div className="row mt-2.5">
                        <div className="md:col-6">
                            <div className="relative mt-8">
                                <Image
                                    className="w-full object-cover"
                                    width="480"
                                    height="328"
                                    src={gallery1}
                                    alt=""
                                />
                            </div>
                            <div className="relative mt-8">
                                <Image
                                    className="w-full object-cover"
                                    width="480"
                                    height="274"
                                    src={gallery2}
                                    alt=""
                                />
                                <Image
                                    className="absolute -bottom-5 -left-5 -z-[1]"
                                    src={shape}
                                    alt=""
                                />
                            </div>
                        </div>
                        <div className="md:col-6">
                            <div className="relative mt-8">
                                <Image
                                    className="w-full object-cover"
                                    width="480"
                                    height="540"
                                    src={gallery3}
                                    alt=""
                                />
                                <Image
                                    className="absolute -bottom-4 -right-5 -z-[1] h-16 w-16"
                                    src={shape}
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section">
                <div className="container">
                    <div className="row items-center justify-between">
                        <div className="md:col-5">
                            <h2 className="text-center md:text-left">
                                Skills driving my fullstack development.
                            </h2>
                        </div>
                        <div className="mt-6 text-center md:col-3 md:mt-0 md:text-right">
                            <a className="btn btn-primary" href="#">See My Portfolio</a>
                        </div>
                    </div>
                    <div className="row mt-14">
                        <SkillCards skills={skills} />
                    </div>
                </div>
            </section>
        </UserLayout>
    );
}

export default page;
