"use client"
import React from 'react';
import loadingSpinner from '../../assets/admin_assets/spinner.gif';
import Image from 'next/image';
function Spinner(props) {
    const { isLoading } = props;
    return (
        <>
            {isLoading == true && (
                <div
                    id="spinner"
                    className="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center"
                >
                    <Image src={loadingSpinner} alt="loading" />
                </div>
            )}
        </>
    );
}

export default Spinner;
