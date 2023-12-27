import React from 'react';

function Services({ services }) {
    return (
        <>
            {
                services.map((item, index) => (
                    <div
                        className="flex flex-col justify-between rounded-lg bg-white p-5 shadow-lg"
                        key={index}
                    >
                        <div>
                            <h3 className="h4 text-xl lg:text-2xl">{item.heading}</h3>
                            <p>{item.description}</p>
                        </div>
                        <span className="icon mt-4">
                            <img
                                className="objec-contain"
                                src={item.icon_link}
                                alt=""
                            />
                        </span>
                    </div>
                ))
            }
        </>
    );
}

export default Services;
