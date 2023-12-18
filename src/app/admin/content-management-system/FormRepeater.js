"use client";
import React, { useState } from 'react';

function FormRepeater(props) {
    const formValues = props.formFields;
    const addFormFields = () => {
        props.setRepeaterFields([...formValues, { heading: "", description: "", image: "", itemId: "" }]);
    }
    let handleChange = (i, e) => {
        let newFormValues = [...formValues];
        if (e.target.type == 'file')
            newFormValues[i][e.target.name] = e.target.files[0];
        else
            newFormValues[i][e.target.name] = e.target.value;
        props.setRepeaterFields(newFormValues);
    }
    let removeFormFields = (i, itemId) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        props.setRepeaterFields(newFormValues);
        props.deleteItem(itemId);
    }

    return (
        <>
            <div className="row mt-4">
                {formValues.map((element, index) => {
                    return (
                        <div className='col-md-12 mb-2' key={index}>
                            <div className="row">
                                <input type="hidden" name="itemId" value={element.itemId || ""} />
                                <div className="form-group col-md-3">
                                    <label htmlFor="" className="form-label">Service Heading</label>
                                    <input type="text" name="heading" value={element.heading || ""} onChange={e => handleChange(index, e)} className="form-control" />
                                </div>
                                <div className="form-group col-md-3">
                                    <label htmlFor="" className="form-label">Service Description</label>
                                    <input type="text" name="description" value={element.description || ""} onChange={e => handleChange(index, e)} className="form-control" />
                                </div>
                                <div className="form-group col-md-3">
                                    <label htmlFor="" className="form-label">Service Image</label>
                                    <input type="file" name="image" onChange={e => handleChange(index, e)} className="form-control" />
                                </div>
                                <div className="form-group col-md-3 text-end">
                                    <button className="btn btn-danger btn-sm" style={{ marginTop: '30px' }} onClick={() => { removeFormFields(index, element.itemId || "") }}><i className="fas fa-trash"></i></button>
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

export default FormRepeater;
