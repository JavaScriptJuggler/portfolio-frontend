"use client";
import React, { useEffect, useState } from 'react';
import logo from '../../assets/frontend_assets/images/logo.svg'
import Image from 'next/image';
import Link from 'next/link';

function Footer() {
    const [socialLinks, setsocialLinks] = useState({ facebook: '', xhandle: '', linkdin: '', whatsapp: '' });
    const getSocialLinks = () => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/getSocialLinks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(async response => {
                let getResponse = await response.json();
                const { facebook, xhandle, linkdin, whatsapp } = getResponse;
                setsocialLinks({ facebook, xhandle, linkdin, whatsapp });
            })
            .catch(error => console.log(error));
    }
    useEffect(() => {
        getSocialLinks();
    }, []);
    return (
        <footer className="footer bg-theme-light/50">
            <div className="container">
                <div className="row gx-5 pb-10 pt-[52px]">
                    <div className="col-12 mt-12 md:col-6 lg:col-3">
                        <Link href="/">
                            <span style={{ fontFamily: 'Dancing Script', fontSize: '30px', width: '500', color: 'black' }}>Soumya Manna</span>
                        </Link>
                        <p className="mt-6">
                            Full-stack developer skilled in front-end (HTML, CSS, JS) and back-end (PHP, Laravel). Expert in seamless solutions.
                        </p>
                    </div>
                    <div className="col-12 mt-12 md:col-6 lg:col-3">
                        <h6>Socials</h6>
                        <p>
                            <a href='mailto:soumyamanna180898@gmail.com'>soumyamanna180898@gmail.com</a>
                        </p>
                        <ul className="social-icons mt-4 lg:mt-6">
                            <li>
                                <a target="_blank" href={socialLinks.facebook}>
                                    <svg
                                        width="19"
                                        height="21"
                                        viewBox="0 0 20 21"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M19.1056 10.4495C19.1056 5.09642 15 0.759277 9.9327 0.759277C4.86539 0.759277 0.759766 5.09642 0.759766 10.4495C0.759766 15.2946 4.08865 19.3191 8.49018 20.0224V13.2627H6.15996V10.4495H8.49018V8.33951C8.49018 5.91696 9.85872 4.54939 11.93 4.54939C12.9657 4.54939 14.0013 4.74476 14.0013 4.74476V7.12823H12.8547C11.7081 7.12823 11.3382 7.87063 11.3382 8.65209V10.4495H13.8904L13.4835 13.2627H11.3382V20.0224C15.7398 19.3191 19.1056 15.2946 19.1056 10.4495Z"
                                            fill="#222222"
                                        />
                                    </svg>
                                </a>
                            </li>
                            <li>
                                <a target="_blank" href={socialLinks.xhandle}>
                                    <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                        width="19" height="15" viewBox="0 0 512.000000 512.000000"
                                        preserveAspectRatio="xMidYMid meet">

                                        <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                                            fill="#000000" stroke="none">
                                            <path d="M2315 5109 c-800 -83 -1501 -518 -1927 -1196 -604 -961 -490 -2237
                                    274 -3068 425 -462 951 -737 1583 -827 119 -17 512 -16 635 1 622 86 1148 360
                                    1572 820 349 378 572 862 650 1406 17 118 17 512 0 630 -59 416 -191 769 -410
                                    1099 -92 140 -185 254 -315 385 -399 404 -893 653 -1462 737 -123 18 -478 26
                                    -600 13z m27 -1592 c207 -302 379 -549 382 -550 3 -1 218 246 479 548 l473
                                    550 128 3 c75 1 126 -1 124 -7 -1 -5 -123 -148 -269 -317 -146 -170 -390 -454
                                    -542 -631 l-277 -321 531 -774 c292 -425 560 -815 596 -865 l64 -93 -439 0
                                    -439 0 -398 580 c-219 319 -401 580 -404 579 -3 0 -229 -260 -501 -577 l-496
                                    -577 -132 -3 -132 -3 574 668 574 667 -32 46 c-36 49 -1071 1557 -1101 1603
                                    l-17 27 438 -2 439 -3 377 -548z"/>
                                            <path d="M2359 2558 l918 -1313 196 -3 c108 -1 197 1 197 5 0 5 -411 595 -913
                                    1313 l-913 1305 -202 3 -201 2 918 -1312z"/>
                                        </g>
                                    </svg>
                                </a>
                            </li>
                            <li>
                                <a target="_blank" href={socialLinks.linkdin}>
                                    <svg
                                        width="19"
                                        height="16"
                                        viewBox="0 0 19 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M4.56609 15.2704V5.45315H0.948103V15.2704H4.56609ZM2.73764 4.1398C3.90474 4.1398 4.83841 3.31895 4.83841 2.33394C4.83841 1.38176 3.90474 0.59375 2.73764 0.59375C1.60945 0.59375 0.675781 1.38176 0.675781 2.33394C0.675781 3.31895 1.60945 4.1398 2.73764 4.1398ZM18.0654 15.2704H18.1044V9.8857C18.1044 7.259 17.4041 5.22331 13.7472 5.22331C11.9966 5.22331 10.8295 6.04415 10.3237 6.79933H10.2848V5.45315H6.82246V15.2704H10.4404V10.411C10.4404 9.13053 10.7128 7.91568 12.5801 7.91568C14.4475 7.91568 14.4864 9.36036 14.4864 10.5095V15.2704H18.0654Z"
                                            fill="#222222"
                                        />
                                    </svg>
                                </a>
                            </li>
                            <li>
                                <a target="_blank" href={socialLinks.whatsapp}>
                                    <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                        width="19" height="15" viewBox="0 0 512.000000 512.000000"
                                        preserveAspectRatio="xMidYMid meet">

                                        <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                                            fill="#000000" stroke="none">
                                            <path d="M2247 4995 c-1043 -126 -1913 -881 -2167 -1880 -59 -234 -74 -356
                                    -74 -610 -1 -129 5 -259 13 -315 108 -783 536 -1431 1212 -1841 206 -124 479
                                    -239 570 -239 45 0 55 4 85 34 22 22 34 44 35 63 2 40 -3 448 -4 449 -1 1 -42
                                    -5 -92 -13 -108 -17 -273 -12 -360 12 -115 30 -202 79 -279 158 -64 63 -81 90
                                    -144 217 -83 169 -138 244 -230 308 -142 100 -165 144 -87 171 31 10 54 11
                                    103 3 136 -22 259 -109 355 -251 120 -178 219 -247 389 -271 78 -11 185 1 285
                                    31 71 22 71 22 98 131 18 70 67 163 111 209 l25 26 -63 7 c-103 12 -293 55
                                    -386 88 -168 59 -276 123 -395 237 -222 212 -326 520 -314 931 4 141 9 178 31
                                    255 36 121 88 223 164 323 48 64 60 86 53 100 -21 40 -41 168 -41 261 0 107
                                    18 219 50 317 25 73 38 78 145 63 136 -19 330 -99 506 -209 71 -45 80 -48 111
                                    -39 84 24 309 59 450 69 228 17 538 -10 737 -64 l54 -15 91 56 c175 108 358
                                    183 495 203 108 15 117 10 145 -79 13 -42 29 -111 36 -154 17 -103 8 -293 -17
                                    -372 l-19 -60 46 -56 c150 -187 212 -376 211 -645 -1 -671 -304 -1054 -930
                                    -1179 -64 -12 -142 -26 -174 -30 l-58 -7 35 -38 c43 -48 88 -135 112 -216 15
                                    -51 18 -122 23 -504 5 -334 9 -451 19 -467 17 -31 63 -53 108 -53 93 0 453
                                    163 659 297 165 109 299 219 435 359 385 395 615 869 691 1424 20 144 17 507
                                    -5 655 -172 1140 -1081 2015 -2234 2150 -154 18 -464 18 -615 0z"/>
                                        </g>
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-12 mt-12 md:col-6 lg:col-3">
                        <h6>Quick Links</h6>
                        <ul>
                            <li>
                                <Link href="/about">About</Link>
                            </li>
                            <li>
                                <Link href="/blogs">Blogs</Link>
                            </li>
                            <li>
                                <Link href="/portfolio">Portfolio</Link>
                            </li>
                            <li>
                                <Link href="/contact">Contact</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-12 mt-12 md:col-6 lg:col-3">
                        <h6>Location & Contact</h6>
                        <p>102,Elias Road,Agarpara,Kolkata 700058</p>
                        <p>+91 7450892149</p>
                    </div>
                </div>
            </div>
            <div className="container max-w-[1440px]">
                <div
                    className="footer-copyright mx-auto border-t border-border pb-10 pt-7 text-center"
                >
                    <p>Designed And Developed by Soumya Manna</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
