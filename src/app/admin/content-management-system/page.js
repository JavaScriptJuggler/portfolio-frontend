"use client";
import AdminLayout from '@/app/components/layouts/AdminLayout';
import React, { useContext, useEffect, useState } from 'react';
import FormRepeater from './FormRepeater';
import Cookies from 'js-cookie';
import Spinner from '@/app/components/admin_components/Spinner';
import { toast } from 'react-toastify';
import { LoadingContext } from '@/context/Loadingbar';

function page() {
    const [heroSection, setheroSection] = useState({ name: "", subtitle: "", heroImage: null, resumeFile: null });
    const [ctaSection, setctaSection] = useState({ heading: "", description: "" });
    const [serviceSectionCMS, setserviceSectionCMS] = useState({ heading: "", description: "" });
    const [isLoading, setisLoading] = useState(true);
    let [formValues, setFormValues] = useState([{ heading: "", description: "", image: null, itemId: "" }]);
    const { setLoadingBar } = useContext(LoadingContext);
    /* handle changing */
    const handleChange = (e, section = '') => {
        const { name, value, type } = e.target;

        if (section == 'hero') {
            if (type === 'file') {
                setheroSection((prevHeroSection) => ({
                    ...prevHeroSection,
                    [name]: e.target.files[0],
                }));
            } else {
                setheroSection((prevHeroSection) => ({
                    ...prevHeroSection,
                    [name]: value,
                }));
            }
        }
        if (section == 'service') {
            if (type === 'file') {
                setserviceSectionCMS((prevHeroSection) => ({
                    ...prevHeroSection,
                    [name]: e.target.files[0],
                }));
            } else {
                setserviceSectionCMS((prevHeroSection) => ({
                    ...prevHeroSection,
                    [name]: value,
                }));
            }
        }
        if (section == 'cta') {
            setctaSection((prevHeroSection) => ({
                ...prevHeroSection,
                [name]: value,
            }));
        }
    };

    /* hero section submit */
    const handleSubmit = () => {
        // Create FormData and append data
        setisLoading(true);
        const formData = new FormData();
        formData.append('name', heroSection.name);
        formData.append('subtitle', heroSection.subtitle);
        formData.append('heroImage', heroSection.heroImage);
        formData.append('resumeFile', heroSection.resumeFile);

        fetch(process.env.NEXT_PUBLIC_API_URL + '/storeHero', {
            headers: {
                'Authorization': `Bearer ${Cookies.get('token')}`,
            },
            method: 'POST',
            body: formData

        })
            .then(response => {
                setisLoading(false);
                handleFetch();
                toast.success('Changes updated successfully');
                response.json();

            })
            .catch(error => console.log(error));

    }

    /* hero section CMS fetch */
    const handleFetch = async () => {
        await fetch(process.env.NEXT_PUBLIC_API_URL + '/getHero', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${Cookies.get('token')}`,
            },
            body: JSON.stringify("")

        })
            .then(async response => {
                let fetchedData = await response.json();
                if (fetchedData) {
                    if (fetchedData['hero_settings']) {
                        const { name, sub_title} = fetchedData['hero_settings'][0];
                        setheroSection({ name, subtitle: sub_title });
                    }
                }
                setLoadingBar(30);
            })
            .catch(error => console.log(error));
    }

    const setRepeaterFields = (getData) => {
        setFormValues(getData);
    }

    /* fetch service repeter items */
    const fetchServices = async () => {
        await fetch(process.env.NEXT_PUBLIC_API_URL + '/getServiceSectionCms', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${Cookies.get('token')}`,
            },
            body: JSON.stringify("")

        })
            .then(async response => {
                let fetchedData = await response.json();
                let featuredServicesArr = [];
                let geFeatureArr = fetchedData.featureServices;
                if (fetchedData.servicesCms)
                    setserviceSectionCMS({ "heading": fetchedData.servicesCms.heading, "description": fetchedData.servicesCms.heading });
                if (geFeatureArr.length) {
                    geFeatureArr.forEach(element => {
                        featuredServicesArr.push({ 'heading': element.heading, 'description': element.description, 'image': "", "itemId": element.id });
                    });
                    setFormValues(featuredServicesArr);
                }
                setLoadingBar(50);
            })
            .catch(error => console.log(error));
    }

    /* save services */
    const saveServicesHero = () => {
        setisLoading(true);
        let serviceRepeaters = formValues;
        let serviceCMS = serviceSectionCMS;
        const formData = new FormData();

        serviceRepeaters.length && serviceRepeaters.forEach((item, index) => {
            formData.append(`repeaters[${index}][heading]`, item.heading);
            formData.append(`repeaters[${index}][description]`, item.description);
            formData.append(`repeaters[${index}][itemId]`, item.itemId);
            if (item.image == 'null' || item.image == "" || typeof item.image == 'undefined')
                formData.append(`repeaters[${index}][image]`, "");
            else
                formData.append(`repeaters[${index}][image]`, item.image, item.image ? item.image.name : "");
        });
        formData.append("serviceCMS", JSON.stringify(serviceCMS));
        fetch(process.env.NEXT_PUBLIC_API_URL + '/storeServiceSectionCms', {
            method: 'POST',
            headers: {
                'Authorization': `bearer ${Cookies.get('token')}`,
            },
            body: formData,
        })
            .then(response => {
                setisLoading(false);
                fetchServices();
                toast.success('Changes updated successfully');
                response.json();
            })
            .catch(error => console.log(error));
    }

    /* delete service items */
    const deleteItem = (itemId) => {
        if (itemId) {
            setisLoading(true);
            fetch(process.env.NEXT_PUBLIC_API_URL + '/deleteServiceItems', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `bearer ${Cookies.get('token')}`,
                },
                body: JSON.stringify({ item_id: itemId })

            })
                .then(response => {
                    setisLoading(false);
                    let getResponse = response.json();
                    if (getResponse.status == 1)
                        toast.success(getResponse.message);
                    else
                        toast.error(getResponse.message);
                    fetchServices();
                })
                .catch(error => console.log(error));
        }
    }

    /* submit cta section */
    const submitCtaSection = () => {
        setisLoading(true);
        fetch(process.env.NEXT_PUBLIC_API_URL + '/saveCta', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${Cookies.get('token')}`,
            },

            body: JSON.stringify(ctaSection)

        })
            .then(response => {
                setisLoading(false);
                let getData = response.json();
                if (getData.status)
                    toast.success(getData.message);
                else
                    toast.error(getData.message);
            })
            .catch(error => console.log(error));
    }

    /* fetch cta */
    const fetchCtaSection = async () => {
        await fetch(process.env.NEXT_PUBLIC_API_URL + '/getCta', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${Cookies.get('token')}`,
            },
            body: JSON.stringify("")

        })
            .then(async response => {
                let getData = await response.json();
                if (getData) {
                    const { heading, description } = getData;
                    setctaSection({ heading, description })
                    setLoadingBar(100);
                }
            })
            .catch(error => console.log(error));
    }
    useEffect(() => {
        setisLoading(true);
        handleFetch();
        fetchServices();
        fetchCtaSection();
        setisLoading(false);
    }, [])
    return (
        <AdminLayout>
            <Spinner isLoading={isLoading} />
            {/* hero section */}
            <div className="row g-4">
                <div className="col-md-12">
                    <div className="h-100 bg-light rounded p-4">
                        <div className="d-flex align-items-center justify-content-between mb-2">
                            <h6 className="mb-0">Hero Section</h6>
                        </div>
                        <div className="row">
                            <div className="form-group col-md-3">
                                <label htmlFor="" className="form-label">Name</label>
                                <input type="text" className="form-control" name="name" value={heroSection.name} onChange={(e) => { handleChange(e, 'hero') }} />
                            </div>
                            <div className="form-group col-md-3">
                                <label htmlFor="" className="form-label">Sub Title</label>
                                <input type="text" className="form-control" name="subtitle" value={heroSection.subtitle} onChange={(e) => { handleChange(e, 'hero') }} />
                            </div>
                            <div className="form-group col-md-3">
                                <label htmlFor="" className="form-label">Hero Image</label>
                                <input type="file" className="form-control" name="heroImage" accept='image/jpeg,image/png' onChange={(e) => { handleChange(e, 'hero') }} />
                            </div>
                            <div className="form-group col-md-3">
                                <label htmlFor="" className="form-label">Resume</label>
                                <input type="file" className="form-control" name="resumeFile" accept='application/pdf' onChange={(e) => { handleChange(e, 'hero') }} />
                            </div>
                            <div className="col-md-12 mt-3 text-center">
                                <button className="btn btn-primary" onClick={() => { handleSubmit() }}><i className="fas fa-save"></i> Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* service section */}
            <div className="row g-4 mt-2">
                <div className="col-md-12">
                    <div className="h-100 bg-light rounded p-4">
                        <div className="d-flex align-items-center justify-content-between mb-2">
                            <h6 className="mb-0">Service Section</h6>
                        </div>
                        <div className="row">
                            <div className="form-group col-md-6">
                                <label htmlFor="" className="form-label">Service Headline</label>
                                <input type="text" className="form-control" name="heading" value={serviceSectionCMS.heading} onChange={(e) => { handleChange(e, 'service') }} />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="" className="form-label">Service Description</label>
                                <input type="text" className="form-control" name="description" value={serviceSectionCMS.description} onChange={(e) => { handleChange(e, 'service') }} />
                            </div>
                        </div>
                        <FormRepeater formFields={formValues} setRepeaterFields={setRepeaterFields} deleteItem={deleteItem} />
                        <div className="col-md-12 mt-3 text-center">
                            <button className="btn btn-primary" onClick={() => { saveServicesHero() }}><i className="fas fa-save"></i> Save</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* call to action */}
            <div className="row g-4 mt-2">
                <div className="col-md-12">
                    <div className="h-100 bg-light rounded p-4">
                        <div className="d-flex align-items-center justify-content-between mb-2">
                            <h6 className="mb-0">Service Section</h6>
                        </div>
                        <div className="form-group mb-4">
                            <label htmlFor="" className="form-label">CTA Heading</label>
                            <input type="text" name="heading" value={ctaSection.heading} onChange={(e) => { handleChange(e, 'cta') }} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="" className="form-label">CTA Description</label>
                            <textarea name="description" value={ctaSection.description} onChange={(e) => { handleChange(e, 'cta') }} id="" cols="30" rows="3" style={{ resize: "none" }} className="form-control"></textarea>
                        </div>
                        <div className="col-md-12 mt-3 text-center">
                            <button className="btn btn-primary" onClick={() => { submitCtaSection() }}><i className="fas fa-save"></i> Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

export default page;
