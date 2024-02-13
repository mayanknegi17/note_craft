import React, { useState } from 'react'

import Data from './dummyTemplate.json'

function TemplateTest() {
    const [data, setData] = useState(Data)
    const [selectedTemp, setSelectedTemp] = useState("")
    console.log(data)

    const handleSelect = (e) => {
        setSelectedTemp(e.target.value)
    }

    return (
        <div className='demo-template'>
            <div className='dt-top'>
                <select onChange={handleSelect} value={selectedTemp} className={selectedTemp == "" && "select-error"}>
                    {data.map((item) => <option value={item.name}>{item.name}</option>)}
                </select>
                {selectedTemp == "" && <span className='error'>Please Select a template</span>}
            </div>
            {data.map((item) =>
                item.name === selectedTemp ?
                    item.components.map((innerItem, key) =>
                        <div key={key}>
                            {innerItem.type == "HEADER" ? <div className="dt-section">
                                <h4>Template Header</h4>
                                {innerItem.format === "VIDEO" || innerItem.format === "DOCUMENT" ? 
                                <label className='upload-button'>
                                    <input type="file" />
                                    Upload File
                                </label> :  
                                innerItem.format === "TEXT" ?
                                <span className='dth-inner'>{innerItem.text}</span> : innerItem.format === "IMAGE" ?
                                <div className='img-list'>
                                    {/* {innerItem.images.map((imgData) =>  */}
                                <img src={innerItem.images.link} /> 
                                {/* )} */}
                                </div> : null}
                            </div> : 
                            innerItem.type == "BODY" ?
                            <div className="dt-section">
                                <h4>Template Body</h4>
                                <span className='dth-inner'>{innerItem.text}</span>
                            </div> :
                            innerItem.type == "FOOTER" ?
                            <div className="dt-section">
                                <h4>Template Footer</h4>
                                <span className='dth-inner'>{innerItem.text}</span>
                            </div> : null}
                        </div>
                    ) : null
            )}
        </div>
    )
}

export default TemplateTest