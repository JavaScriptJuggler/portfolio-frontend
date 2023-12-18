"use client";
import AdminLayout from '@/app/components/layouts/AdminLayout';
import React, { useContext, useEffect, useState } from 'react';
import CoreSkills from './CoreSkills';
import Cookies from 'js-cookie';
import Spinner from '@/app/components/admin_components/Spinner';
import { toast } from 'react-toastify';
import { LoadingContext } from '@/context/Loadingbar';

function page() {
    const [aboutCms, setaboutCms] = useState({ description: "", number_of_project: "", programming_language_known: "", framework_known: "", client_handled: "" });
    const [isLoading, setisLoading] = useState(true);
    let [formValues, setFormValues] = useState([{ skillName: "", skillDescription: "", itemId: "" }]);
    const { setLoadingBar } = useContext(LoadingContext);
    /* handle changing */
    const handleChange = (e, section) => {
        const { name, value, type } = e.target;
        if (section == 'aboutcms') {
            setaboutCms((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    }

    /* submit cms */
    const saveAboutCms = () => {
        setisLoading(true);
        fetch(process.env.NEXT_PUBLIC_API_URL + '/saveAboutCms', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cookies.get('token')}`,
            },
            body: JSON.stringify(aboutCms)
        })
            .then(async response => {
                setisLoading(false);
                let isSuccess = await response.json();
                if (isSuccess)
                    toast.success(isSuccess.message);
                else
                    toast.error(isSuccess.message);
            })
            .catch(error => console.log(error));
    }

    /* fetch aboutCms */
    const fetchAboutCms = async () => {
        await fetch(process.env.NEXT_PUBLIC_API_URL + '/getAboutCms', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cookies.get('token')}`,
            },
            body: JSON.stringify("")

        })
            .then(async response => {
                let fetchAboutCmsData = await response.json();
                if (fetchAboutCmsData) {
                    const { description, number_of_project, programming_language_known, framework_known, client_handled } = fetchAboutCmsData;
                    setaboutCms({ description, number_of_project, programming_language_known, framework_known, client_handled });
                }
                setLoadingBar(70);
            })
            .catch(error => console.log(error));
    }

    /* repetater handle change */
    const repeaterHandleChange = (itemData) => {
        setFormValues(itemData);
    }

    /* submit skill repeater */
    const submitSkillRepeater = () => {
        setisLoading(true);
        fetch(process.env.NEXT_PUBLIC_API_URL + '/saveSkills', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cookies.get('token')}`,
            },
            body: JSON.stringify(formValues)
        })
            .then(async response => {
                setisLoading(false);
                let getResponse = await response.json();
                if (getResponse.status)
                    toast.success(getResponse.message);
                else
                    toast.error(getResponse.message);
                fetchSkills();
            })
            .catch(error => console.log(error));
    }

    /* fetch skills */
    const fetchSkills = async () => {
        await fetch(process.env.NEXT_PUBLIC_API_URL + '/getSkills', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cookies.get('token')}`,
            },
            body: JSON.stringify("")
        })
            .then(async response => {
                let getData = await response.json();
                if (getData.length) {
                    setFormValues(getData)
                }
                setLoadingBar(100);
            })
            .catch(error => console.log(error));
    }

    /* delete trigger skills */
    const deleteSkills = (itemId) => {
        fetch(process.env.NEXT_PUBLIC_API_URL + '/deleteSkills', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cookies.get('token')}`,
            },
            body: JSON.stringify({ itemId })
        })
            .then(async response => {
                let getData = await response.json();
                if (getData.status)
                    toast.success(getData.message);
                else
                    toast.error(getData.message);
                fetchSkills();
            })

            .catch(error => console.log(error));
    }

    useEffect(() => {
        setisLoading(true);
        fetchAboutCms();
        fetchSkills();
        setisLoading(false);
    }, []);
    return (
        <AdminLayout>
            <Spinner isLoading={isLoading} />
            <div className="row g-4 mt-2">
                <div className="col-md-12">
                    <div className="h-100 bg-light rounded p-4">
                        <div className="d-flex align-items-center justify-content-between mb-2">
                            <h6 className="mb-0">About Section</h6>
                        </div>
                        <div className="form-group">
                            <label htmlFor="" className="form-label">About Description</label>
                            <textarea id="" cols="30" rows="5" style={{ resize: "none" }} onChange={(e) => { handleChange(e, 'aboutcms') }} value={aboutCms.description} name="description" className="form-control"></textarea>
                        </div>

                        <div className="d-flex align-items-center justify-content-between mb-2 mt-3">
                            <h6 className="mb-0">Short Counter</h6>
                        </div>
                        <div className="row">
                            <div className="form-group col-md-3 mb-2">
                                <input type="text" value={aboutCms.number_of_project} name="number_of_project" onChange={(e) => { handleChange(e, 'aboutcms') }} placeholder='Number of projects completed' className="form-control" />
                            </div>
                            <div className="form-group col-md-3 mb-2">
                                <input type="text" value={aboutCms.programming_language_known} name="programming_language_known" onChange={(e) => { handleChange(e, 'aboutcms') }} placeholder='Programming Languages' className="form-control" />
                            </div>
                            <div className="form-group col-md-3 mb-2">
                                <input type="text" value={aboutCms.framework_known} name="framework_known" onChange={(e) => { handleChange(e, 'aboutcms') }} placeholder='Frameworks and Libraries' className="form-control" />
                            </div>
                            <div className="form-group col-md-3 mb-2">
                                <input type="text" value={aboutCms.client_handled} name="client_handled" onChange={(e) => { handleChange(e, 'aboutcms') }} placeholder='Clients Handled' className="form-control" />
                            </div>
                        </div>
                        <div className="col-md-12 text-center">
                            <button className="button btn btn-primary" onClick={() => { saveAboutCms() }}><i className="fas fa-save"></i> Save</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="h-100 bg-light rounded p-4">
                        <div className="d-flex align-items-center justify-content-between mb-2">
                            <h6 className="mb-0">My Skills</h6>
                        </div>
                        <CoreSkills formValues={formValues} repeaterHandleChange={repeaterHandleChange} deleteSkills={deleteSkills} />
                        <div className="col-md-12 text-center mt-3">
                            <button className="button btn btn-primary" onClick={() => { submitSkillRepeater() }}><i className="fas fa-save"></i> Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout >
    );
}

export default page;
