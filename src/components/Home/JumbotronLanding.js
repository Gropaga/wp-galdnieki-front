import React from 'react';
import Jumbotron from 'reactstrap/lib/Jumbotron';
import Button from 'reactstrap/lib/Button';
import {getLocale} from "../../lib/i18n";

const JumbotronLanding = ({ locale, image, jumbo }) => {
    return jumbo.filter((jumbo) => jumbo.locale === locale).map((jumbo) => (
        <Jumbotron style={{ backgroundSize: 'cover', backgroundImage: 'url(' + IMAGE_URL + image + ')' }}>
            <div dangerouslySetInnerHTML={{__html: jumbo.text}}/>
        </Jumbotron>
    )).pop();
};

export default JumbotronLanding;