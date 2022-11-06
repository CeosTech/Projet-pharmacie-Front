import React, { Component } from 'react';
import Antigenique from './antigenique/Antigenique';
import Vaccin from './vaccin/Vaccin';
import Ordonnance from './ordonnance/Ordonnance';



class RendezVous extends Component {
    render() {
        return (
            <div>
                <Antigenique />
                <Vaccin /> 
                <Ordonnance />                
            </div>
        );
    }
}

export default RendezVous;