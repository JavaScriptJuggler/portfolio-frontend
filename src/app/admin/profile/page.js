"use client"
import Spinner from '@/app/components/admin_components/Spinner';
import AdminLayout from '@/app/components/layouts/AdminLayout';
import { LoadingContext } from '@/context/Loadingbar';
import Cookies from 'js-cookie';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function page() {
    const [isLoading, setisLoading] = useState(false);
    const [socialLinks, setsocialLinks] = useState({ facebook: '', xhandle: '', linkedin: '', whatsapp: '' });
    const [password, setPassword] = useState({ old_password: '', new_password: '' });
    const { setLoadingBar } = useContext(LoadingContext);
    const handleInputChange = (e) => {
        const updatedLinks = { ...socialLinks, [e.target.name]: e.target.value };
        setsocialLinks(updatedLinks);
    };
    const handlePasswordInputChange = (e) => {
        const updatedLinks = { ...password, [e.target.name]: e.target.value };
        setPassword(updatedLinks);
    };

    /* save socila links */
    const saveSocialLink = () => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/saveSocialLinks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${Cookies.get('token')}`
            },
            body: JSON.stringify(socialLinks)
        })
            .then(async response => {
                let getResponse = await response.json();
                getResponse.status ? toast.success(getResponse.message) : toast.error(getResponse.message);
            })
            .catch(error => console.log(error));
    }

    /* get social links */
    const getSocialLinks = () => {
        setLoadingBar(50);
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/getSocialLinks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${Cookies.get('token')}`
            },
        })
            .then(async response => {
                let getResponse = await response.json();
                let { facebook, xhandle, linkdin, whatsapp } = getResponse;
                setsocialLinks({ facebook, xhandle, linkedin: linkdin, whatsapp });
                setLoadingBar(100);
            })
            .catch(error => console.log(error));
    }

    /* change password */
    const changePasswordRequest = () => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/changePassword`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${Cookies.get('token')}`,
            },
            body: JSON.stringify(password)
        })
            .then(async response => {
                let getResponse = await response.json();
                getResponse.status ? toast.success(getResponse.message) : toast.error(getResponse.message);
            })
            .catch(error => console.log(error));
    }

    useEffect(() => {
        setisLoading(true);
        getSocialLinks();
        setisLoading(false);
    }, []);
    return (
        <AdminLayout>
            <Spinner isLoading={isLoading} />
            <div className="row g-4">
                <div className="col-md-12">
                    <div className="h-100 bg-light rounded p-4">
                        <div className="d-flex align-items-center justify-content-between mb-2">
                            <h6 className="mb-0">Social Links</h6>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-2">
                                <div className="form-group">
                                    <label htmlFor="facebook" className="form-label">Facebook</label>
                                    <input type="text" id='facebook' value={socialLinks.facebook || ''} onChange={(e) => { handleInputChange(e) }} name="facebook" className="form-control" />
                                </div>
                            </div>
                            <div className="col-md-6 mb-2">
                                <div className="form-group">
                                    <label htmlFor="x-handle" className="form-label">X-handle</label>
                                    <input type="text" id='x-handle' value={socialLinks.xhandle || ''} onChange={(e) => { handleInputChange(e) }} name="xhandle" className="form-control" />
                                </div>
                            </div>
                            <div className="col-md-6 mb-2">
                                <div className="form-group">
                                    <label htmlFor="linkedin" className="form-label">Linkedin</label>
                                    <input type="text" id='linkedin' value={socialLinks.linkedin || ''} onChange={(e) => { handleInputChange(e) }} name="linkedin" className="form-control" />
                                </div>
                            </div>
                            <div className="col-md-6 mb-2">
                                <div className="form-group">
                                    <label htmlFor="whatsapp" className="form-label">Github</label>
                                    <input type="text" id='whatsapp' value={socialLinks.whatsapp || ''} onChange={(e) => { handleInputChange(e) }} name="whatsapp" className="form-control" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 text-center mt-2">
                            <button className="btn btn-primary" onClick={(e) => { saveSocialLink() }}><i className='fas fa-save'></i> Save</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row g-4 mt-2">
                <div className="col-md-12">
                    <div className="h-100 bg-light rounded p-4">
                        <div className="d-flex align-items-center justify-content-between mb-2">
                            <h6 className="mb-0">Change Password</h6>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="current_password" className="form-label">Current Password</label>
                                    <input type="text" className="form-control" name='old_password' value={password.old_password} onChange={(e) => { handlePasswordInputChange(e) }} id='current_password' />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="new_password" className="form-label">New Password</label>
                                    <input type="text" className="form-control" name='new_password' value={password.new_password} onChange={(e) => { handlePasswordInputChange(e) }} id='new_password' />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 text-center mt-2">
                            <button className="btn btn-primary" onClick={(e) => { changePasswordRequest() }}><i className='fas fa-save'></i> Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

export default page;
