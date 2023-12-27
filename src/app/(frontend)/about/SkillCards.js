import Image from 'next/image';
import React from 'react';
import gradient from '../../assets/frontend_assets/images/gradient-number-bg.svg';

function SkillCards({ skills }) {
    return (
        <>
            {
                skills.map((item, index) => (
                    <div className="mb-8 sm:col-6 lg:col-4">
                        <div className="rounded-xl bg-white p-6 shadow-lg lg:p-8">
                            <div className="gradient-number relative inline-block">
                                <span
                                    className="bg-gradient absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                >{String(index + 1).padStart(2, '0')}</span
                                >
                                <Image src={gradient} alt="" />
                            </div>
                            <h4 className="my-6">{item.skill_name}</h4>
                            <p>{item.skill_description}</p>
                        </div>
                    </div>
                ))
            }
        </>
    );
}

export default SkillCards;
