import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Skeleton from '@material-ui/lab/Skeleton';
import axios from 'axios';
import { gsap } from 'gsap';

import './user-info.css';
import { useStateValue } from '../../StateProvider';

import avatar from '../../assets/avat.jpg';

const UserInfo = () => {
  let { id } = useParams();
  let history = useHistory();

  const [{ userData }] = useStateValue();
  const [data, setData] = useState(null);

  const handleClick = () => {
    history.push('/');
  };

  useEffect(() => {
    setData(userData[0]);
  }, [userData]);

  // If the application can not get the data, refetch the data
  useEffect(() => {
    if (!userData.length) {
      const refetch = async () => {
        const response = await axios
          .get(`https://jsonplaceholder.typicode.com/users/${id}`)
          .then((res) => res.data)
          .catch((err) => console.log(err));

        setData(response);
      };

      refetch();
    } else {
      return;
    }
  }, []);

  useEffect(() => {
    gsap.from('.userInfo__wrapper', {
      y: 100,
      duration: 1,
    });
  }, []);

  useEffect(() => {
    let tl = gsap.timeline();

    tl.from('.userInfo__wrapper', {
      duration: 1,
    });
    tl.from('.userInfo__right', { x: 300, opacity: 0, duration: 1 });
    tl.from('.userInfo__left', { x: -60, duration: 1 });
  }, [data]);

  return (
    <div className='userInfo__container'>
      <div className='userInfo__title'>
        <h1>User Detail Page</h1>
      </div>
      <div className='userInfo__wrapper'>
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
            <div className='userInfo__left'>
              <div className='userInfo__avatar'>
                <img src={avatar} alt='' />
              </div>
            </div>
            <div className='divider'></div>
            <div className='userInfo__right'>
              <div className='userInfo__right__content'>
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
            </div>
          </div>
        )}
      </div>
      <div className='userInfo__btn'>
        <Button variant='contained' color='primary' onClick={handleClick}>
          Back
        </Button>
      </div>
    </div>
  );
};

export default UserInfo;
