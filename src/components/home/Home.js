import React, { Component } from 'react';
import Header from './header/Header';
import Service from './service/Service';
import Galerie from './galerie/Galerie';
import Offre from './offre/Offre';


class Home extends Component {
    render() {
        return (
            <div>
                <Header />
                <Service />
                <Galerie />
                <Offre />
            </div>
        );
    }
}

export default Home;