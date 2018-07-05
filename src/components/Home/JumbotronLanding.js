import React from 'react';
import { Jumbotron, Button } from 'reactstrap';

const JumbotronLanding = ({ locale, image, jumbo }) => (
    jumbo.filter((jumbo) => jumbo.locale === locale).map((jumbo) => (
        <Jumbotron style={{ backgroundSize: 'cover', backgroundImage: 'url(' + image + ')' }}>
            <h1 className="display-3">{ jumbo.heading }</h1>
            <p className="lead">{ jumbo.text }</p>
            <hr className="my-2" />
            <p>{ jumbo.subText }</p>
            <p className="lead">
                <Button color="primary">{ jumbo.buttonText }</Button>
            </p>
        </Jumbotron>
    )).pop()
);

export default JumbotronLanding;