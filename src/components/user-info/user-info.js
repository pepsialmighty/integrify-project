import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Skeleton from '@material-ui/lab/Skeleton';
import axios from 'axios';

import './user-info.css';
import { useStateValue } from '../../StateProvider';

const UserInfo = () => {
  let { id } = useParams();
  let history = useHistory();

  const [{ userData }] = useStateValue();
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(userData[0]);
    console.log('hohoo');
  }, [userData]);

  console.log(data);
  const handleClick = () => {
    history.push('/');
  };

  // If the application can not get the data, refetch the data
  useEffect(() => {
    if (!userData.length) {
      // history.push('/');
      // alert('Please try again!');
      const refetch = async () => {
        const response = await axios
          .get(`https://jsonplaceholder.typicode.com/users/${id}`)
          .then((res) => res.data)
          .catch((err) => console.log(err));

        setData(response);
        console.log('hoh');
      };

      refetch();
    } else {
      return;
    }
  }, []);

  return (
    <div className='userInfo__container'>
      <div className='userInfo__wrapper'>
        <div className='userInfo__title'>
          <h1>User Detail Page</h1>
        </div>
        {!data ? (
          <div>
            <Skeleton variant='text' width={150} />
            <Skeleton variant='rect' height={100} />
            <Skeleton variant='text' width={150} />
            <Skeleton variant='rect' height={100} />
            <Skeleton variant='text' width={150} />
            <Skeleton variant='rect' height={100} />
          </div>
        ) : (
          <div className='userInfo__content'>
            <div className='userInfo__info'>
              <h3>Name: {data.name}</h3>
            </div>
            <div className='userInfo__info'>
              <h3>Username: {data.username}</h3>
            </div>
            <div className='userInfo__info'>
              <h3>
                Email: <a href={`mailto:${data.email}`}>{data.email}</a>
              </h3>
            </div>
            <div className='userInfo__info'>
              <h3>
                Phone: <a href={`tel:${data.phone}`}>{data.phone}</a>
              </h3>
            </div>
            <div className='userInfo__info'>
              <h3>
                Website: <a href={data.website}>{data.website}</a>
              </h3>
            </div>
            <div className='userInfo__info'>
              <h3>
                Company:
                <ul>
                  <li>Name: {data.company.name}</li>
                  <li>Catch phase: {data.company.catchPhrase}</li>
                  <li>BS: {data.company.bs}</li>
                </ul>
              </h3>
            </div>
            <div className='userInfo__info'>
              <h3>
                Address:
                <ul>
                  <li>Street: {data.address.street}</li>
                  <li>Suite: {data.address.suite}</li>
                  <li>City: {data.address.city}</li>
                  <li>Zipcode: {data.address.zipcode}</li>
                  <li>Geo Lat: {data.address.geo.lat}</li>
                  <li>Geo LNG: {data.address.geo.lng}</li>
                </ul>
              </h3>
            </div>
          </div>
        )}
      </div>
      <Button
        variant='contained'
        className='userInfo__btn'
        color='primary'
        onClick={handleClick}
      >
        Back
      </Button>
    </div>
  );
};

export default UserInfo;
