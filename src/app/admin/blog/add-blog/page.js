'use client';
import Spinner from '@/app/components/admin_components/Spinner';
import AdminLayout from '@/app/components/layouts/AdminLayout';
import React, { useEffect, useState, useRef, useContext } from 'react';
import JoditEditor from 'jodit-react';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { LoadingContext } from '@/context/Loadingbar';

function page() {
    const [isLoading, setisLoading] = useState(false);
    const editor = useRef(null);
    const [blogName, setblogName] = useState("");
    const [stortDescription, setstortDescription] = useState("");
    const [content, setContent] = useState('');
    const { setLoadingBar } = useContext(LoadingContext);
    const submitBlog = () => {
        setisLoading(true);
        fetch(process.env.NEXT_PUBLIC_API_URL + '/saveBlog', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${Cookies.get('token')}`,
            },
            body: JSON.stringify({
                "blog_name": blogName,
                "blog_content": content,
                "short_description": stortDescription,
            })
        })
            .then(async response => {
                let getResponse = await response.json();
                setisLoading(false);
                if (getResponse.status) {
                    toast.success(getResponse.message);
                } else {
                    toast.error(getResponse.message);
                }
            })
            .catch(error => console.log(error));
    }
    useEffect(() => {
        setLoadingBar(50);
        setTimeout(() => {
            setLoadingBar(100);
        }, 1000);
    }, []);
    return (
        <AdminLayout>
            <Spinner isLoading={isLoading} />
            {/* hero section */}
            <div className="row g-4">
                <div className="col-md-12">
                    <div className="h-100 bg-light rounded p-4">
                        <div className="d-flex align-items-center justify-content-between mb-2">
                            <h6 className="mb-0">Write New Blog</h6>
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="" className="form-label">Blog Name</label>
                            <input type="text" value={blogName} onChange={(e) => { setblogName(e.target.value) }} name="blog_name" id="blog_name" className="form-control" />
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="" className="form-label">Blog Short Description</label>
                            <input type="text" value={stortDescription} onChange={(e) => { setstortDescription(e.target.value) }} name="short_description" id="blog_name" className="form-control" />
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="" className="form-label" >Blog</label>
                            <JoditEditor
                                ref={editor}
                                value={content}
                                tabIndex={1} // tabIndex of textarea
                                onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                            />
                        </div>
                        <div className="text-center">
                            <button className="btn btn-primary m-2" onClick={() => { submitBlog() }}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

export default page;
