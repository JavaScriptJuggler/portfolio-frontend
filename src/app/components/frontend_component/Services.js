import React from 'react';

function Services() {
    return (
        <>
            <div
                className="flex flex-col justify-between rounded-lg bg-white p-5 shadow-lg"
            >
                <div>
                    <h3 className="h4 text-xl lg:text-2xl">Live Caption</h3>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
                </div>
                <span className="icon mt-4">
                    <img
                        className="objec-contain"
                        src="images/icons/feature-icon-1.svg"
                        alt=""
                    />
                </span>
            </div>
        </>
    );
}

export default Services;
