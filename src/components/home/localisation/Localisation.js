import React, { Component } from 'react';
import './Header.css';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from "react-router-dom";


import {Grid } from '@material-ui/core';

class Header extends Component {
    render() {
        return (
            <div id="header">
                <Grid container alignItems="center" justifyContent="center" className="Grid_Container">
                    
                        <div className="Div_Text_Header"><strong>Lorem ipsum dolor <br></br>sit amet </strong>
                        <br></br>
                        <Button id="Btn_Prise_Rdv">
                            <Link to="/carte" className="commanderHeader">
                                <strong>Prendre rendez-vous</strong>
                            </Link>
                        </Button>
                        </div>
                        
                       
                        
                </Grid>           
            </div>
        );
    }
}

export default Header;