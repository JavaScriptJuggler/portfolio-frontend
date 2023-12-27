"use client";
import Image from 'next/image';
import React, { useContext, useState } from 'react';
import logo from '../../assets/frontend_assets/images/logo.svg'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LoadingBar from 'react-top-loading-bar';
import { LoadingContext } from '@/context/Loadingbar';
import { ResumeContext } from '@/context/Resume';

function Header() {
    const { loadingBar, setLoadingBar } = useContext(LoadingContext);
    const { resumeLink } = useContext(ResumeContext);
    let pathName = usePathname();
    return (
        <>
            <LoadingBar
                color='#fe6019'
                height={'3px'}
                progress={loadingBar}
            // onLoaderFinished={() => setLoadingBar(0)}
            />
            <header className="header">
                <nav className="navbar container">
                    <div className="order-0">
                        <Link href="/">
                            <span style={{ fontSize: '35px', width: '500', color: 'black', fontFamily: 'Dancing Script' }}>Soumya Manna</span>
                            {/* <Image src={logo} height="30" width="147" alt="logo" /> */}
                        </Link>
                    </div>
                    <input id="nav-toggle" type="checkbox" className="hidden" />
                    <label
                        id="show-button"
                        htmlFor="nav-toggle"
                        className="order-1 flex cursor-pointer items-center lg:order-1 lg:hidden"
                    >
                        <svg className="h-6 fill-current" viewBox="0 0 20 20">
                            <title>Menu Open</title>
                            <path d="M0 3h20v2H0V3z m0 6h20v2H0V9z m0 6h20v2H0V0z"></path>
                        </svg>
                    </label>
                    <label
                        id="hide-button"
                        htmlFor="nav-toggle"
                        className="order-2 hidden cursor-pointer items-center lg:order-1"
                    >
                        <svg className="h-6 fill-current" viewBox="0 0 20 20">
                            <title>Menu Close</title>
                            <polygon
                                points="11 9 22 9 22 11 11 11 11 22 9 22 9 11 -2 11 -2 9 9 9 9 -2 11 -2"
                                transform="rotate(45 10 10)"
                            ></polygon>
                        </svg>
                    </label>
                    <ul
                        id="nav-menu"
                        className="navbar-nav order-2 hidden w-full flex-[0_0_100%] lg:order-1 lg:flex lg:w-auto lg:flex-auto lg:justify-center lg:space-x-5"
                    >
                        <li className="nav-item">
                            <Link href="/" className={`nav-link ${pathName == '/' ? 'active' : ""}`}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/about" className={`nav-link ${pathName == '/about' ? 'active' : ""}`}>About</Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/blogs" className={`nav-link ${pathName.startsWith('/blogs') ? 'active' : ""}`}>Blogs</Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/portfolio" className={`nav-link ${pathName.startsWith('/portfolio') ? 'active' : ""}`}>Portfolio</Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/contact" className={`nav-link ${pathName == '/contact' ? 'active' : ""}`}>Contact</Link>
                        </li>
                    </ul>
                    <div className="order-1 ml-auto hidden items-center md:order-2 md:ml-0 lg:flex">
                        <a className="btn btn-white btn-sm" href={resumeLink}>Download My Resume</a>
                    </div>
                </nav>
            </header>
        </>
    );
}

export default Header;
