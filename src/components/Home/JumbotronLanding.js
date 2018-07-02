import React from 'react';
import { Jumbotron, Button } from 'reactstrap';

const JumbotronLanding = (props) => {
    return (
        <div>
            <Jumbotron style={{ backgroundSize: 'cover', backgroundImage: 'url(' + props.landingImage + ')' }}>
                <h1 className="display-3">{ props.jumbo[props.locale].heading }</h1>
                <p className="lead">{ props.jumbo[props.locale].text }</p>
                <hr className="my-2" />
                <p>{ props.jumbo[props.locale]['sub-text'] }</p>
                <p className="lead">
                    <Button color="primary">{ props.jumbo[props.locale]['button-text'] }</Button>
                </p>
            </Jumbotron>
        </div>
    );
};

export default JumbotronLanding;