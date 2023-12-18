"use client";
import Spinner from '@/app/components/admin_components/Spinner';
import AdminLayout from '@/app/components/layouts/AdminLayout';
import { LoadingContext } from '@/context/Loadingbar';
import Cookies from 'js-cookie';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import swal from 'sweetalert';

function page() {
    const [isLoading, setisLoading] = useState(false);
    const { setLoadingBar } = useContext(LoadingContext);
    const [portfolioList, setPortfolioList] = useState([]);
    const [originalPortfolioList, setOriginalPortfolioList] = useState([]);
    const [search, setsearch] = useState("");
    const ellipsisStyle = {
        'display': 'block',
        'width': '200px',
        'whiteSpace': 'nowrap',
        'overflow': 'hidden',
        'textOverflow': 'ellipsis',
    }

    const fetchPortfolio = async () => {
        setLoadingBar(50)
        await fetch(process.env.NEXT_PUBLIC_API_URL + '/getPortfolio', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${Cookies.get('token')}`
            },
        })
            .then(async response => {
                let getFetchedData = await response.json()
                setPortfolioList(getFetchedData);
                setLoadingBar(100);
            })
            .catch(error => console.log(error));
    }

    const searchValue = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        setsearch(searchTerm);
        if (originalPortfolioList.length === 0) {
            setOriginalPortfolioList(portfolioList);
        }
        let result;
        if (searchTerm.length === 0) {
            result = originalPortfolioList;
        } else {
            result = originalPortfolioList.filter(item =>
                Object.values(item).some(value =>
                    typeof value === 'string' && value.toLowerCase().includes(searchTerm)
                )
            );
        }
        setPortfolioList(result);
    };

    const deletePortfolio = (itemId) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this portfolio!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                fetch(process.env.NEXT_PUBLIC_API_URL + '/deletePortfolio', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `bearer ${Cookies.get('token')}`
                    },
                    body: JSON.stringify({ itemId: itemId })
                })
                    .then(async response => {
                        let getResponse = await response.json();
                        if (getResponse.status)
                            toast.success(getResponse.message);
                        fetchPortfolio();
                    })
                    .catch(error => console.log(error));
            });
    }
    useEffect(() => {
        setisLoading(true);
        fetchPortfolio();
        setisLoading(false);
    }, []);

    return (
        <div>
            <AdminLayout>
                <Spinner isLoading={isLoading} />
                <div className="row g-4">
                    <div className="col-md-12">
                        <div className="h-100 bg-light rounded p-4">
                            <div className="d-flex align-items-center justify-content-between mb-2">
                                <h6 className="mb-0">Portfolios</h6>
                            </div>
                            <div className="row mt-4">
                                <div className="col-md-12" style={{ height: "60vh", overflowY: "auto" }}>
                                    <div className="row g-3 align-items-center mb-3">
                                        <div className="col-auto">
                                            <label htmlFor="inputPassword6" className="col-form-label">Search</label>
                                        </div>
                                        <div className="col-auto">
                                            <input type="text" value={search} onChange={(e) => { searchValue(e) }} id="inputPassword6" className="form-control" aria-describedby="passwordHelpInline" />
                                        </div>
                                    </div>
                                    <table className="table table-striped" style={{ backgroundColor: 'white' }}>
                                        <thead style={{ color: "#009CFF", fontWeight: 600, }}>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Portfolio Name</th>
                                                <th scope="col">Category</th>
                                                <th scope="col">Short Description</th>
                                                <th scope="col">Imge</th>
                                                <th scope="col">Slug</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                portfolioList.map((element, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <th scope="row">{index + 1}</th>
                                                            <td><span style={ellipsisStyle}>{element.portfolio_name}</span></td>
                                                            <td><span style={ellipsisStyle}>{element.category}</span></td>
                                                            <td><span style={ellipsisStyle}>{element.portfolio_short_description}</span></td>
                                                            <td><span style={ellipsisStyle}>{element.icon}</span></td>
                                                            <td><span style={ellipsisStyle}>{element.slug}</span></td>
                                                            <td className='d-flex'>
                                                                <Link className="btn btn-sm btn-primary m-1" href={`/admin/portfolio/${element.id}`} ><i className="fas fa-pen"></i></Link>
                                                                <button className="btn btn-sm btn-danger m-1" onClick={() => { deletePortfolio(element.id) }}><i className="fas fa-trash"></i></button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AdminLayout >
        </div >
    );
}

export default page;
