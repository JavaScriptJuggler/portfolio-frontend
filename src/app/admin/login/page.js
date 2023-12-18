"use client";
import AdminLayout from '@/app/components/layouts/AdminLayout';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import Spinner from '@/app/components/admin_components/Spinner';

function page() {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [isLoading, setisLoading] = useState(false);
    const [authError, setauthError] = useState("");
    const router = useRouter();
    const login = async () => {
        if (email && password) {
            setisLoading(true);
            await fetch(process.env.NEXT_PUBLIC_API_URL + '/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                })

            })
                .then(async response => {
                    setisLoading(false);
                    let getData = await response.json();
                    if (getData.access_token) {
                        setauthError("");
                        Cookies.set('token', getData.access_token, { "expires": new Date(new Date().getTime() + 60 * 60 * 1000) });
                        router.push('/admin/dashboard');
                    } else {
                        setauthError("Something went wrong");
                    }

                })
                .catch(error => console.log(error));
        }
    }
    return (
        <AdminLayout>
            <Spinner isLoading={isLoading} />
            <div className="row h-100 align-items-center justify-content-center" style={{ "minHeight": "100vh" }}>
                <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
                    <div className="bg-light rounded p-4 p-sm-5 my-4 mx-3">
                        <div className="text-center mb-3">
                            <h3 className="text-primary text-center"><i className="fa fa-hashtag me-2"></i>Soumya Manna</h3>
                        </div>
                        {authError && (
                            <div class="alert alert-danger" role="alert">
                                {authError}
                            </div>

                        )}
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" value={email} onChange={(e) => { setemail(e.target.value) }} id="floatingInput" placeholder="name@example.com" />
                            <label htmlFor="floatingInput">Email address</label>
                        </div>
                        <div className="form-floating mb-4">
                            <input type="password" value={password} onChange={(e) => { setpassword(e.target.value) }} className="form-control" id="floatingPassword" placeholder="Password" />
                            <label htmlFor="floatingPassword">Password</label>
                        </div>
                        <div className="d-flex align-items-center justify-content-between mb-4">
                            <div className="form-check">
                                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                            </div>
                            <a href="">Forgot Password</a>
                        </div>
                        <button type="button" onClick={() => { login() }} className="btn btn-primary py-3 w-100 mb-4">Sign In</button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

export default page;