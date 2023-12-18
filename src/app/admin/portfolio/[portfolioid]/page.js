"use client";
import Spinner from '@/app/components/admin_components/Spinner';
import AdminLayout from '@/app/components/layouts/AdminLayout';
import React, { useContext, useEffect, useRef, useState } from 'react';
import JoditEditor from 'jodit-react';
import { LoadingContext } from '@/context/Loadingbar';
import Cookies from 'js-cookie';
import CreatableSelect from 'react-select/creatable';
import { toast } from 'react-toastify';

function page({ params }) {
    const portfolioId = params.portfolioid;
    const [isLoading, setIsLoading] = useState(false);
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [portfolioName, setportfolioName] = useState("");
    const [portfolioShortDescription, setportfolioShortDescription] = useState("");
    const [portfolioCategory, setPortfolioCategory] = useState("");
    const [image, setImage] = useState(null);
    const { setLoadingBar } = useContext(LoadingContext);
    const [options, setoptions] = useState([]);

    const updatePortFolio = () => {
        setIsLoading(true);
        let formData = new FormData();
        formData.append('portfolio_name', portfolioName);
        formData.append('portfolio_description', content);
        formData.append('portfolio_short_description', portfolioShortDescription);
        formData.append('portfolio_image', image);
        formData.append('portfolio_category', JSON.stringify(portfolioCategory));
        formData.append('id', portfolioId);
        fetch(process.env.NEXT_PUBLIC_API_URL + '/savePortfolio', {
            method: 'POST',
            headers: {
                // 'Content-Type': 'application/json'
                'Authorization': `bearer ${Cookies.get('token')}`,
            },
            body: formData
        })
            .then(async response => {
                let getData = await response.json();
                setIsLoading(false);
                if (getData.status)
                    toast.success(getData.message);
                else
                    toast.error(getData.message);
            })
            .catch(error => console.log(error));
    }

    const fetchPortfolio = async () => {
        setLoadingBar(50);
        await fetch(process.env.NEXT_PUBLIC_API_URL + '/searchPortfolio', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${Cookies.get('token')}`,
            },
            body: JSON.stringify({ id: portfolioId })
        })
            .then(async response => {
                let getData = await response.json();
                setoptions(getData.data.portfolio_categories)
                setContent(getData.data.portfolio_data.portfolio_description)
                setportfolioName(getData.data.portfolio_data.portfolio_name)
                setportfolioShortDescription(getData.data.portfolio_data.portfolio_short_description)
                setPortfolioCategory(JSON.parse(getData.data.portfolio_data.category_data))
                setLoadingBar(100);
            })
            .catch(error => console.log(error));
    }

    const handleChange = (selectedOptions) => {
        setPortfolioCategory(selectedOptions);
    }

    useEffect(() => {
        setIsLoading(true);
        fetchPortfolio();
        setIsLoading(false);
    }, []);

    return (
        <AdminLayout>
            <Spinner isLoading={isLoading} />
            <div className="row g-4">
                <div className="col-md-12">
                    <div className="h-100 bg-light rounded p-4">
                        <div className="d-flex align-items-center justify-content-between mb-2">
                            <h6 className="mb-0">Add Portfolios</h6>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group mt-2">
                                    <label htmlFor="" className="form-label">Portfolio Name</label>
                                    <input type="text" name="" onChange={(e) => { setportfolioName(e.target.value) }} value={portfolioName} id="" className="form-control" />
                                </div>
                                <div className="form-group mt-2">
                                    <label htmlFor="" className="form-label">Portfolio Short Description</label>
                                    <input type="text" name="" id="" onChange={(e) => { setportfolioShortDescription(e.target.value) }} value={portfolioShortDescription} className="form-control" />
                                </div>
                                <div className="form-group mt-2">
                                    <label htmlFor="" className="form-label">Portfolio Description</label>
                                    <JoditEditor
                                        ref={editor}
                                        value={content}
                                        tabIndex={1}
                                        onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                                        onChange={newContent => { }}
                                    />
                                </div>
                                <div className="form-group mt-2">
                                    <label htmlFor="" className="form-label">Portfolio Category</label>
                                    <CreatableSelect isClearable onChange={handleChange} value={portfolioCategory} options={options} />
                                    {/* <input type="text" name="" id="" onChange={(e) => { setPortfolioCategory(e.target.value) }} value={portfolioCategory} className="form-control" /> */}
                                </div>
                                <div className="form-group mt-2">
                                    <label htmlFor="" className="form-label">Image</label>
                                    <input type="file" onChange={(e) => { setImage(e.target.files[0]) }} name="" id="" className="form-control" />
                                </div>
                            </div>
                            <div className="col-md-12 text-center mt-2">
                                <button className="btn btn-primary" onClick={(e) => { updatePortFolio() }}><i className="fas fa-save"></i> Save Changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

export default page;
