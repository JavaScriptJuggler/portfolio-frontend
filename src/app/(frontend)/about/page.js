import UserLayout from '@/app/components/layouts/UserLayout';
import React from 'react';
import floatingBubble1 from '../../assets/frontend_assets/images/floating-bubble-1.svg';
import floatingBubble2 from '../../assets/frontend_assets/images/floating-bubble-2.svg';
import floatingBubble3 from '../../assets/frontend_assets/images/floating-bubble-3.svg';
import gallery1 from '../../assets/frontend_assets/images/about/gallery-img-1.png';
import gallery2 from '../../assets/frontend_assets/images/about/gallery-img-2.png';
import gallery3 from '../../assets/frontend_assets/images/about/gallery-img-3.png';
import shape from '../../assets/frontend_assets/images/shape.svg';
import gradient from '../../assets/frontend_assets/images/gradient-number-bg.svg';
import Image from 'next/image';
function page() {
    return (
        <UserLayout>
            <Image
                className="floating-bubble-1 absolute right-0 top-0 -z-[1]"
                src={floatingBubble1}
                alt=""
            />
            <Image
                className="floating-bubble-2 absolute left-0 top-[387px] -z-[1]"
                src={floatingBubble2}
                alt=""
            />
            <Image
                className="floating-bubble-3 absolute right-0 top-[605px] -z-[1]"
                src={floatingBubble3}
                alt=""
            />
            <section className="page-hero py-16">
                <div className="container">
                    <div className="text-center">
                        <ul
                            className="breadcrumb inline-flex h-8 items-center justify-center space-x-2 rounded-3xl bg-theme-light px-4 py-2"
                        >
                            <li className="leading-none text-dark">
                                <a className="inline-flex items-center text-primary" href="#">
                                    <svg
                                        className="mr-1.5"
                                        width="15"
                                        height="15"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M13.1769 15.0588H10.3533V9.41178H5.64744V15.0588H2.82391V6.58825H1.88274V16H14.118V6.58825H13.1769V15.0588ZM6.58862 15.0588V10.353H9.41215V15.0588H6.58862ZM15.8084 6.09225L15.2512 6.85178L8.00038 1.52472L0.749559 6.8499L0.192383 6.09131L8.00038 0.357666L15.8084 6.09225Z"
                                            fill="black"
                                        />
                                    </svg>
                                    <span className="text-sm leading-none">Home</span>
                                </a>
                            </li>
                            <li className="leading-none text-dark">
                                <span className="text-sm leading-none">/ About Us</span>
                            </li>
                        </ul>
                    </div>
                    <div className="page-hero-content mx-auto max-w-[768px] text-center">
                        <h1 className="mb-5 mt-8">About our company</h1>
                        <p>
                            Donec sollicitudin molestie malesda. Donec sollitudin molestie
                            malesuada. Mauris pellentesque nec, egestas non nisi. Cras ultricies
                            ligula sed magna dictum porta. Lorem
                        </p>
                        <div className="mt-11 justify-center sm:flex">
                            <a className="btn btn-primary m-3 block sm:inline-block" href="#"
                            >Download The Theme</a
                            >
                            <a
                                className="btn btn-outline-primary m-3 block min-w-[160px] sm:inline-block"
                                href="#"
                            >Learn more</a
                            >
                        </div>
                    </div>
                    <div className="counter mt-16">
                        <div className="row mx-0 rounded-[20px] bg-white px-10 shadow-lg lg:py-10">
                            <div
                                className="border-border px-10 py-10 text-center sm:col-6 lg:col-3 lg:border-r lg:py-0"
                            >
                                <h2>
                                    <span className="count">25M</span> <span className="text-[#A3A1FB]">+</span>
                                </h2>
                                <p>Customers</p>
                            </div>
                            <div
                                className="border-border px-10 py-10 text-center sm:col-6 lg:col-3 lg:border-r lg:py-0"
                            >
                                <h2>
                                    <span className="count">440M</span>
                                    <span className="text-[#5EE2A0]">+</span>
                                </h2>
                                <p>Products sold</p>
                            </div>
                            <div
                                className="border-border px-10 py-10 text-center sm:col-6 lg:col-3 lg:border-r lg:py-0"
                            >
                                <h2>
                                    <span className="count">50K</span> <span className="text-primary">+</span>
                                </h2>
                                <p>Online stores</p>
                            </div>
                            <div className="px-10 py-10 text-center sm:col-6 lg:col-3 lg:py-0">
                                <h2>
                                    <span className="count">20K</span> <span className="text-[#FEC163]">+</span>
                                </h2>
                                <p>Transactions</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section">
                <div className="container">
                    <div className="row justify-center text-center">
                        <div className="col-8">
                            <h2>We started with one single goal Empower entrepreneurs</h2>
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
                                The six core work <br />
                                drive everything do
                            </h2>
                        </div>
                        <div className="mt-6 text-center md:col-3 md:mt-0 md:text-right">
                            <a className="btn btn-primary" href="#">Download The Theme</a>
                        </div>
                    </div>
                    <div className="row mt-14">
                        <div className="mb-8 sm:col-6 lg:col-4">
                            <div className="rounded-xl bg-white p-6 shadow-lg lg:p-8">
                                <div className="gradient-number relative inline-block">
                                    <span
                                        className="bg-gradient absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                    >01</span
                                    >
                                    <Image src={gradient} alt="" />
                                </div>
                                <h4 className="my-6">Accessibility</h4>
                                <p>
                                    Nulla porttitor acmsan tinci dunt. posuere cubilia Cudfrae Donec
                                    velit neque, autor sit amet aliuam vel
                                </p>
                            </div>
                        </div>
                        <div className="mb-8 sm:col-6 lg:col-4">
                            <div className="rounded-xl bg-white p-6 shadow-lg lg:p-8">
                                <div className="gradient-number relative inline-block">
                                    <span
                                        className="bg-gradient absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                    >02</span
                                    >
                                    <Image src={gradient} alt="" />
                                </div>
                                <h4 className="my-6">Empowerement</h4>
                                <p>
                                    Nulla porttitor acmsan tinci dunt. posuere cubilia Cudfrae Donec
                                    velit neque, autor sit amet aliuam vel
                                </p>
                            </div>
                        </div>
                        <div className="mb-8 sm:col-6 lg:col-4">
                            <div className="rounded-xl bg-white p-6 shadow-lg lg:p-8">
                                <div className="gradient-number relative inline-block">
                                    <span
                                        className="bg-gradient absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                    >03</span
                                    >
                                    <Image src={gradient} alt="" />
                                </div>
                                <h4 className="my-6">Innovation</h4>
                                <p>
                                    Nulla porttitor acmsan tinci dunt. posuere cubilia Cudfrae Donec
                                    velit neque, autor sit amet aliuam vel
                                </p>
                            </div>
                        </div>
                        <div className="mb-8 sm:col-6 lg:col-4">
                            <div className="rounded-xl bg-white p-6 shadow-lg lg:p-8">
                                <div className="gradient-number relative inline-block">
                                    <span
                                        className="bg-gradient absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                    >04</span
                                    >
                                    <Image src={gradient} alt="" />
                                </div>
                                <h4 className="my-6">Excellence</h4>
                                <p>
                                    Nulla porttitor acmsan tinci dunt. posuere cubilia Cudfrae Donec
                                    velit neque, autor sit amet aliuam vel
                                </p>
                            </div>
                        </div>
                        <div className="mb-8 sm:col-6 lg:col-4">
                            <div className="rounded-xl bg-white p-6 shadow-lg lg:p-8">
                                <div className="gradient-number relative inline-block">
                                    <span
                                        className="bg-gradient absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                    >05</span
                                    >
                                    <Image src={gradient} alt="" />
                                </div>
                                <h4 className="my-6">Team work</h4>
                                <p>
                                    Nulla porttitor acmsan tinci dunt. posuere cubilia Cudfrae Donec
                                    velit neque, autor sit amet aliuam vel
                                </p>
                            </div>
                        </div>
                        <div className="mb-8 sm:col-6 lg:col-4">
                            <div className="rounded-xl bg-white p-6 shadow-lg lg:p-8">
                                <div className="gradient-number relative inline-block">
                                    <span
                                        className="bg-gradient absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                    >06</span
                                    >
                                    <Image src={gradient} alt="" />
                                </div>
                                <h4 className="my-6">Responsibility</h4>
                                <p>
                                    Nulla porttitor acmsan tinci dunt. posuere cubilia Cudfrae Donec
                                    velit neque, autor sit amet aliuam vel
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </UserLayout>
    );
}

export default page;
