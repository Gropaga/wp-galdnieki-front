import React from 'react'
const dotCount = 3;

export default () =>
    <div className="row">
        <div className="col-md-12">
            <div className="la-container">
                <div className="la-ball-fall la-3x">
                    {
                        [...Array(dotCount).keys()].map(index => <div key={index} />)
                    }
                </div>
            </div>
        </div>
    </div>;