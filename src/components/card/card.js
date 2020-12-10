import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { Link } from 'react-router-dom';

import './card.css';
import { useStateValue } from '../../StateProvider';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 50,
    width: '90%',
    height: '100%',
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
    height: 70,
    width: 70,
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
    height: 70,
    width: 70,
  },
  pos: {
    marginBottom: 10,
    fontSize: 12,
    fontWeight: 800,
    fontStyle: 'italic',
  },
  pos1: {
    marginBottom: 10,
    fontSize: 12,
  },
  pos2: {
    fontWeight: 600,
  },
  btn: {
    color: '#ddd',
    fontWeight: 600,
  },
}));

const MyCard = (props) => {
  const classes = useStyles();
  const [user, setUser] = useState(props.data);

  const [{ userData }, dispatch] = useStateValue();

  const addUserData = () => {
    dispatch({
      type: 'ADD_USER_INFO',
      userInfo: {
        id: user.id,
        name: user.name,
        username: user.username,
        phone: user.phone,
        website: user.website,
        email: user.email,
        address: user.address,
        company: user.company,
      },
    });
  };

  return (
    <Card className={classes.root} variant='elevation'>
      <CardContent>
        <div className='card card__avatar'>
          <Avatar className={classes.purple} alt={user.name} />
        </div>
        <div className='card card__name'>
          <Typography className={classes.pos2}>{user.name}</Typography>
        </div>
        <div className='card card__userName'>
          <Typography className={classes.pos} color='textSecondary'>
            {`@${user.name}`}
          </Typography>
        </div>
        <div className='card card__website'>
          <Typography className={classes.pos1} color='textSecondary'>
            <a href={`http://${user.website}`}>{`http://${user.website}`}</a>
          </Typography>
        </div>
      </CardContent>
      <Link to={`/user/${user.id}`}>
        <CardActions className='card card__button'>
          <Button className={classes.btn} size='large' onClick={addUserData}>
            MORE DETAILS
          </Button>
        </CardActions>
      </Link>
    </Card>
  );
};

export default MyCard;
