import React, { Component, useState, useEffect } from 'react';
import './Navbar.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import Logo_Mustang from '../../images/Logo_pharmacie.png';
import feuille from '../../images/feuille.png';
import { NavLink } from 'react-router-dom';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { NavLinkContent } from '../../data/NavLinkContent';
import { Grid } from '@material-ui/core';

import {HashLink} from 'react-router-hash-link';

import { useLocation } from "react-router-dom";

import { sendrequest } from "../../middlewares/request";
import { selectBaskets } from "../../app/Redux-slices/basketsSlice";
import { useSelector } from "react-redux";

import Switch from "react-switch";

const useStyles = makeStyles({
    list: {
      width: 300,
    },
    fullList: {
      width: 'auto',
    },
  });

 const handleChange = ()=> {
    return 0;
  }

const Navbar = () => {
  const location = useLocation();
  const classes = useStyles();
  const [search, setSearch] = useState("/");
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [isOpened, setOpening] = useState(undefined);
  const [isOpenedLoading, setOpeningLoading] = useState(false);
  const baskets = useSelector(selectBaskets);

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div 
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List className="menu-sidee">
        {NavLinkContent.map((content) => (
          <HashLink to={content.link} style={{textDecoration:'none'}}>
            <ListItem button key={content.id}>
              <ListItemText className="Navbar_Text" primary={content.titre} />
            </ListItem>
          </HashLink>
        ))}
        
      </List>
      
    </div>
  );

  const get_restaurant = async () => {
    sendrequest(
      "get",
      "restaurant/info_restaurant/",
      setOpening,
      setOpeningLoading
    );
  };
  
  useEffect(() => {
    if (location.pathname !== search) {
      setSearch(location.pathname);
    }
  }, [location]);
  useState(() => get_restaurant());

 
  const regex = /^\/admin/g;
  if (!location.pathname.match(regex)) {
    return (
        <div>
          
            <AppBar position="fixed" id="Navbar_Mustang">
                    <Toolbar >
                    <Grid  container xs={12} justifyContent="center" alignItems="center">
                      <Grid container className="" xs={3} md={4}>
                        <IconButton edge="start" aria-label="menu">
                            
                        {['left'].map((anchor) => (
                        <React.Fragment key={anchor}>
                        <MenuIcon onClick={toggleDrawer(anchor, true)} id="Icon_Navbar" />
                        {/* <img src={SVG_MENU} onClick={toggleDrawer(anchor, true)} id="Icon_Navbar" /> */}
                        <Drawer id="test" anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                        <CloseIcon onClick={toggleDrawer(anchor, false)} id="Icon_Navbar_Close" />
                            {list(anchor)}
                        </Drawer>
                        
                        </React.Fragment>
                    ))}
                          
                            
                        </IconButton>
                      </Grid>
                      <Grid container justifyContent="flex-start" xs={5} md={3}>
                        <a href='/#header' className="Logo_Mustang">
                            <img className="Logo_Mustang" src={Logo_Mustang}></img>
                        </a>
                      </Grid>
                      <Grid className='Div-ouvert' container xs={3} md={4} style={{minWidth:"90px "}}>
                      {isOpenedLoading && (
                        // div that contains the toggle and the  leaf img
                        <div className="ouvert-toggle">
                        <img src={feuille} alt="feuille" />
                        <Switch className='Switch'
                        checkedIcon={false}
                          onChange={handleChange} 
                          checked={isOpened[isOpened.length - 1].disponibilite_restaurant}
                          disabled = {true}
                          onHandleColor={"#79B65D"}
                          offHandleColor={"#FF0000"}
                          onColor={"#fff"}
                          offColor={"#fff"}
                          width={50}
                         
                          />
                          
                        </div>
                      )}
                        
                      </Grid>
                      {/* <Grid container  justifyContent="center" alignItems="center" md={2}>
                        <NavLink to='/panier' className="">
                            <Button id="Btn_Panier_Accueil"><strong>
                            <span>{getNombresArticles(baskets)}</span>
                              <ShoppingCartIcon /> PANIER</strong>
                              </Button>
                        </NavLink>
                      </Grid> */}
                    </Grid>
                    </Toolbar>
                </AppBar>
              
        </div>
    );
  }

  return null;
};

export default Navbar;