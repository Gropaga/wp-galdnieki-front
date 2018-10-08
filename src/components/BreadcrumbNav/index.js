import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Breadcrumb from 'reactstrap/lib/Breadcrumb';
import BreadcrumbItem from 'reactstrap/lib/BreadcrumbItem';
import {_, _lRev} from "../../lib/i18n";
import { Link } from 'react-router-dom'


const BreadcrumbNav = ({breadcrumbs, showHome = true}) => {
    return <div className="col-lg-12 col-md-12">
        <Breadcrumb>
            {
                (showHome) &&
                <BreadcrumbItem key={ `/${_lRev()}` }>
                    <Link to={ `${_lRev()}` }>
                        <FontAwesomeIcon icon="home" /> {_('home')}
                    </Link>
                </BreadcrumbItem>
            }
            {
                breadcrumbs.reduce((breadcrumbItems, item, index) => {
                    return [
                        ...breadcrumbItems,
                        <BreadcrumbItem key={item.key} active={index === breadcrumbs.length - 1} >
                            {
                                item.url ? <Link to={ item.url }>{ item.node }</Link> : item.node
                            }
                        </BreadcrumbItem>,
                    ];
                }, [])
            }
        </Breadcrumb>
    </div>;
};

export default BreadcrumbNav;