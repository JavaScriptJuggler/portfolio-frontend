import React from 'react';
import floatingBubble1 from '../../assets/frontend_assets/images/floating-bubble-1.svg';
import floatingBubble2 from '../../assets/frontend_assets/images/floating-bubble-2.svg';
import floatingBubble3 from '../../assets/frontend_assets/images/floating-bubble-3.svg';
import Image from 'next/image';

function HeaderImages() {
    return (
        <>
            <Image
                className="floating-bubble-1 absolute right-0 top-0 -z-[1]"
                src={floatingBubble1}
                alt=""
            />
            <Image
                className="floating-bubble-2 absolute left-0 top-[387px] -z-[1]"
                src={floatingBubble2}
                alt=""
            />
            <Image
                className="floating-bubble-3 absolute right-0 top-[605px] -z-[1]"
                src={floatingBubble3}
                alt=""
            />
        </>
    );
}

export default HeaderImages;
