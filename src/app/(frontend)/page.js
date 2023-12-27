"use client";
import React, { useContext, useEffect, useState } from 'react';
import UserLayout from '../components/layouts/UserLayout';
import bannerImage from '../assets/frontend_assets/images/banner-img.png'
import bannerImageShare from '../assets/frontend_assets/images/banner-shape.svg'
import featureShapeImage from '../assets/frontend_assets/images/icons/feature-shape.svg'
import dropImage from '../assets/frontend_assets/images/icons/drop.svg'
import brainImage from '../assets/frontend_assets/images/icons/brain.svg'
import timerImage from '../assets/frontend_assets/images/icons/timer.svg'
import image1 from '../assets/frontend_assets/images/sells-by-country.png'
import checks from '../assets/frontend_assets/images/icons/checkmark-circle.svg'
import shape from '../assets/frontend_assets/images/shape.svg'
import collaborationImage from '../assets/frontend_assets/images/collaboration.png'
import problemSolving from '../assets/frontend_assets/images/intro-thumbnail.png'
import Image from 'next/image';
import Services from '../components/frontend_component/Services';
import { LoadingContext } from '@/context/Loadingbar';
import { ResumeContext } from '@/context/Resume';

function page() {
  const { setLoadingBar } = useContext(LoadingContext);
  const [hero, setHero] = useState({ "name": "", "sub_title": "", "hero_image": "", "resume_link": "" });
  const [servicesCms, setServicesCms] = useState({ 'heading': "", 'description': "" });
  const [services, setServices] = useState([]);
  const [cta, setCta] = useState({ heading: "", description: "" });
  const { resumeLink } = useContext(ResumeContext);
  const getHeroData = () => {
    setLoadingBar(50);
    fetch(process.env.NEXT_PUBLIC_API_URL + '/getHomeData')
      .then(async response => {
        let getData = await response.json()
        setHero(getData.hero);
        setServicesCms(getData.services.cms);
        setServices(getData.services.services);
        let { heading, description } = getData.cta;
        setCta({ heading, description });
        setLoadingBar(100);
      })
      .catch(error => console.log(error));
  }

  useEffect(() => {
    getHeroData();
  }, []);
  return (
    <UserLayout>
      <section className="banner relative">
        <div className="container">
          <div className="row items-center">
            <div className="lg:col-6">
              <h1 className="banner-title">
                {hero.name || ""}
              </h1>
              <p className="mt-6">{hero.sub_title || ""}</p>
              <a target='_blank' className="btn btn-white mt-8" href={resumeLink || ""}>Download My Resume</a>
            </div>
            <div className="lg:col-6">
              <img
                className="w-full object-contain"
                src={hero.hero_image || ""}
                alt=""
                width={'auto'}
              />
            </div>
          </div>
        </div>
        <Image
          className="banner-shape absolute -top-28 right-0 -z-[1] w-full max-w-[30%]"
          src={bannerImageShare}
          alt=""
        />
      </section>

      {/* key features */}
      <section className="section key-feature relative">
        <Image
          className="absolute left-0 top-0 -z-[1] -translate-y-1/2"
          src={featureShapeImage}
          alt=""
        />
        <div className="container">
          <div className="row justify-between text-center lg:text-start">
            <div className="lg:col-5">
              <h2>{servicesCms.heading || ""}</h2>
            </div>
            <div className="mt-6 lg:col-5 lg:mt-0">
              <p>{servicesCms.description || ""}</p>
            </div>
          </div>
          <div
            className="key-feature-grid mt-10 grid grid-cols-2 gap-7 md:grid-cols-3 xl:grid-cols-4"
          >
            <Services services={services} />
          </div>
        </div>
      </section>

      {/* services */}
      <section className="section services">
        <div className="container">
          <div className="tab row gx-5 items-center" data-tab-group="integration-tab">
            <div className="lg:col-7 lg:order-2">
              <div className="tab-content" data-tab-content>
                <div className="tab-content-panel active" data-tab-panel="0">
                  <Image style={{ width: '500px', height: '500px', float: 'right' }}
                    className="w-full object-contain"
                    src={image1}
                  />
                </div>
                <div className="tab-content-panel" data-tab-panel="1">
                  <Image style={{ width: '500px', height: '500px', float: 'right' }} className="w-full object-contain" src={image1} />
                </div>
                <div className="tab-content-panel" data-tab-panel="2">
                  <Image style={{ width: '500px', height: '500px', float: 'right' }}
                    className="w-full object-contain"
                    src={image1}
                  />
                </div>
              </div>
            </div>
            <div className="mt-6 lg:col-5 lg:order-1 lg:mt-0">
              <div className="text-container">
                <h2 className="lg:text-4xl">
                  Comprehensive Full Stack Expertise
                </h2>
                <p className="mt-4">
                  Seamless integration of frontend and backend, delivering comprehensive web solutions with a focus on a unified development approach.
                </p>
                <ul className="tab-nav -ml-4 mt-8 border-b-0" data-tab-nav>
                  <li className="tab-nav-item active" data-tab="0">
                    <Image className="mr-3" src={dropImage} alt="" />
                    Elegant, Responsive Frontend Solutions
                  </li>
                  <li className="tab-nav-item" data-tab="1">
                    <Image className="mr-3" src={brainImage} alt="" />
                    Strong Server, Scalable Architecture Solutions.
                  </li>
                  <li className="tab-nav-item" data-tab="2">
                    <Image className="mr-3" src={timerImage} alt="" />
                    Integrated Full Stack, Holistic Development
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row gx-5 mt-12 items-center lg:mt-0">
            <div className="lg:col-7">
              <div className="relative">
                <Image className="w-full object-contain" style={{ width: '550px', height: '550px', }} src={collaborationImage} />
                <Image
                  className="absolute bottom-6 left-1/2 -z-[1] -translate-x-1/2"
                  src={shape}
                  alt=""
                />
              </div>
            </div>
            <div className="mt-6 lg:col-5 lg:mt-0">
              <div className="text-container">
                <h2 className="lg:text-4xl">
                  Efficient Database Management
                </h2>
                <p className="mt-4">
                  Streamlining data storage and retrieval, ensuring optimal performance and responsiveness through effective database design and management.
                </p>
                <ul className="mt-6 text-dark lg:-ml-4">
                  <li className="mb-2 flex items-center rounded px-4">
                    <Image
                      className="mr-3"
                      src={checks}
                      alt=""
                    />
                    Optimized Data Structures
                  </li>
                  <li className="mb-2 flex items-center rounded px-4">
                    <Image
                      className="mr-3"
                      src={checks}
                      alt=""
                    />
                    Query Optimization
                  </li>
                  <li className="flex items-center rounded px-4">
                    <Image
                      className="mr-3"
                      src={checks}
                      alt=""
                    />
                    Scalable Database Design
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row gx-5 mt-12 items-center lg:mt-0">
            <div className="lg:col-7 lg:order-2">
              <div className="video pb-5 pr-9">
                <div className="video-thumbnail overflow-hidden rounded-2xl">
                  <Image
                    style={{ width: '400px', height: '400px', float: 'right' }}
                    className="w-full object-contain"
                    src={problemSolving}
                    alt=""
                  />
                </div>
                <div
                  className="video-player absolute left-0 top-0 z-10 hidden h-full w-full"
                >
                </div>
                <Image
                  className="intro-shape absolute bottom-0 right-0 -z-[1]"
                  src={shape}
                  alt=""
                />
              </div>
            </div>
            <div className="mt-6 lg:col-5 lg:order-1 lg:mt-0">
              <div className="text-container">
                <h2 className="lg:text-4xl">Agile Problem Solving</h2>
                <p className="mt-4">
                  Agile and adaptive problem-solving skills, addressing challenges dynamically in both frontend and backend development for robust, flexible, and innovative solutions.
                </p>
                <button className="btn btn-white mt-6">Know More About Me</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="px-5 py-20 xl:py-[120px]">
        <div className="container">
          <div
            className="bg-gradient row justify-center rounded-b-[80px] rounded-t-[20px] px-[30px] pb-[75px] pt-16"
          >
            <div className="lg:col-11">
              <div className="row">
                <div className="lg:col-7">
                  <h2 className="h1 text-white">{cta.heading}</h2>
                  <a className="btn btn-white mt-8" href="#">Download My Resume</a>
                </div>
                <div className="mt-8 lg:col-5 lg:mt-0">
                  <p className="text-white">{cta.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </UserLayout>
  );
}

export default page;
