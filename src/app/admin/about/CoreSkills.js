"use client";
import React from 'react';

function CoreSkills(props) {
    let formValues = props.formValues;
    const addFormFields = () => {
        props.repeaterHandleChange([...formValues, { skillName: "", skillDescription: "", itemId: "" }])
    }
    let handleChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        props.repeaterHandleChange(newFormValues);
    }
    let removeFormFields = (i, itemId) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        props.repeaterHandleChange(newFormValues)
        props.deleteSkills(itemId);
    }

    return (
        <>
            <div className="row mt-4">
                {formValues.map((element, index) => {
                    return (
                        <div className='col-md-12 mb-2' key={index}>
                            <div className="row">
                                <input type="hidden" name="itemId" value={element.itemId || ""} />
                                <div className="form-group col-md-4">
                                    <label htmlFor="" className="form-label">Skill Name</label>
                                    <input type="text" name="skillName" value={element.skillName || ""} onChange={e => handleChange(index, e)} placeholder='service heading' className="form-control" />
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="" className="form-label">Skill Description</label>
                                    <input type="text" name="skillDescription" value={element.skillDescription || ""} onChange={e => handleChange(index, e)} placeholder='service description' className="form-control" />
                                </div>
                                <div className="form-group col-md-4 text-end">
                                    <button className="btn btn-danger btn-sm" style={{ marginTop: '30px' }} onClick={() => { removeFormFields(index, element.itemId) }}><i className="fas fa-trash"></i></button>
                                </div>
                            </div>
                        </div>
                    )
                })}
                <div className="col-md-12 text-end">
                    <button className="btn btn-success mt-2" onClick={() => { addFormFields() }}><i className="fas fa-plus"></i></button>
                </div>
            </div>
        </>
    );
}

export default CoreSkills;
