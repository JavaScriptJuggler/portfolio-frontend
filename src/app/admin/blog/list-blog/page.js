'use client';
import Spinner from '@/app/components/admin_components/Spinner';
import AdminLayout from '@/app/components/layouts/AdminLayout';
import Cookies from 'js-cookie';
import swal from 'sweetalert';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { LoadingContext } from '@/context/Loadingbar';

function page() {
    const [isLoading, setisLoading] = useState(false);
    const [blogList, setblogList] = useState([]);
    const [viewBlogContent, setviewBlogContent] = useState({ name: "", short_description: "", slug: "", content: "" });
    const { setLoadingBar } = useContext(LoadingContext);
    const ellipsisStyle = {
        'display': 'block',
        'width': '200px',
        'whiteSpace': 'nowrap',
        'overflow': 'hidden',
        'textOverflow': 'ellipsis',
    }

    const getBlogList = async () => {
        fetch(process.env.NEXT_PUBLIC_API_URL + '/getBlog', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${Cookies.get('token')}`,
            }
        })
            .then(async response => {
                let blogData = await response.json();
                setblogList(blogData.blogData);
                setLoadingBar(100);
            })
            .catch(error => console.log(error));
    }

    const viewBlogContentOnClick = (blogId) => {
        fetch(process.env.NEXT_PUBLIC_API_URL + '/searchBlog', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${Cookies.get('token')}`,
            },
            body: JSON.stringify({ blog_id: blogId })
        })
            .then(async response => {
                let getBlogData = await response.json();
                if (getBlogData.status) {
                    setviewBlogContent({ name: getBlogData.data.blog_name, short_description: getBlogData.data.short_description, slug: getBlogData.data.slug, content: getBlogData.data.blog_content })
                }
            })
            .catch(error => console.log(error));
    }

    const deleteBlog = (blogId) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this Blog!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    fetch(process.env.NEXT_PUBLIC_API_URL + '/deleteBlog', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `bearer ${Cookies.get('token')}`,
                        },
                        body: JSON.stringify({ blog_id: blogId })
                    })
                        .then(async response => {
                            let getResponse = await response.json();
                            if (getResponse.status)
                                toast.success(getResponse.message);
                            else
                                toast.error(getResponse.message);
                            getBlogList();
                        })
                        .catch(error => console.log(error));
                } else { }
            });
    }

    useEffect(() => {
        setisLoading(true);
        getBlogList();
        setisLoading(false);
    }, []);
    return (
        <AdminLayout>
            <Spinner isLoading={isLoading} />
            <div className="row g-4">
                <div className="col-md-12">
                    <div className="h-100 bg-light rounded p-4">
                        <div className="d-flex align-items-center justify-content-between mb-2">
                            <h6 className="mb-0">Hero Section</h6>
                        </div>
                        <div className="row" style={{ minHeight: '90vh', overflowY: "auto" }}>
                            <div className="col-md-12">
                                <table className="table">
                                    <thead style={{ color: "#009CFF", fontWeight: 600, }}>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Blog Name</th>
                                            <th scope="col">Blog Description</th>
                                            <th scope="col">Slug</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            blogList.map((element, index) => (
                                                <tr key={index}>
                                                    <th scope="row">{index + 1}</th>
                                                    <td><span style={ellipsisStyle}>{element.blog_name}</span></td>
                                                    <td><span style={ellipsisStyle}>{element.short_description}</span></td>

                                                    <td>{element.slug}</td>
                                                    <td className='d-flex'>
                                                        <button onClick={() => { viewBlogContentOnClick(element.id) }} className="btn btn-sm btn-success m-1" data-bs-toggle="modal" data-bs-target="#exampleModal"><i className="fas fa-eye"></i></button>
                                                        <Link className="btn btn-sm btn-primary m-1" href={`/admin/blog/${element.id}`}><i className="fas fa-pen"></i></Link>
                                                        <button className="btn btn-sm btn-danger m-1" onClick={() => { deleteBlog(element.id) }}><i className="fas fa-trash"></i></button>
                                                    </td>
                                                </tr>
                                            ))
                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* view Modal */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">View Blog</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label htmlFor="" className="form-label">Blog Name</label>
                                <input type="text" name="" readOnly={true} value={viewBlogContent.name || ""} id="" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="" className="form-label">Blog Short Description</label>
                                <input type="text" name="" readOnly={true} value={viewBlogContent.short_description || ""} id="" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="" className="form-label">Blog Slug</label>
                                <input type="text" name="" readOnly={true} value={viewBlogContent.slug || ""} id="" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="" className="form-label">Blog Content</label>
                                <div className='form-control' dangerouslySetInnerHTML={{ __html: viewBlogContent.content || "" }} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout >
    );
}

export default page;
