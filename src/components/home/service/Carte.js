import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

// import img from '../../../images/service/box1.svg'


const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    minHeight:250,
    margin:"0 10px",
    boxShadow: "0px 5px 9px -2px #00000042",
    '&:hover':{
        boxShadow: "0px 5px 12px -2px #00000030",

    }
  },
  cardContentStyle:{
    height : 100
  },
  media: {
    height: 150,
  },

  titre:{
    color:"#3f981c",
    fontFamily: "Montserrat",
    textAlign: "center",
  //  paddingTop: "30px",
   //  borderRadius: "50%"
    fontWeight: "700",
    
  }
});

export default function Carte(props) {


  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea href={props.item.ref}>
        <CardMedia
          className={classes.media}
          image={props.item.photo}
          title={props.item.titre}
        />
        <CardContent className={classes.cardContentStyle}>
          <Typography className={classes.titre} align="center" variant="h5" component="h2">
          {props.item.titre}
          </Typography>
       
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
