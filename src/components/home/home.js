import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Skeleton from '@material-ui/lab/Skeleton';
import { gsap } from 'gsap';

import './home.css';
import MyCard from '../card/card';
import { URL } from '../config/path';

const Home = () => {
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const respone = await axios
        .get(`${URL}`)
        .then((res) => res.data)
        .catch((err) => console.log(err));
      setUserInfo(respone);
    };

    fetchData();
  }, []);

  useEffect(() => {
    gsap.from('.home__card', {
      opacity: 0,
      y: 100,
      stagger: 0.1,
      duration: 1,
    });
  }, [userInfo]);

  return (
    <div className='home__container'>
      <div className='home__title'>
        <h1>HOME PAGE</h1>
      </div>
      <div className='home__cards'>
        {userInfo
          ? userInfo.map((info) => (
              <div key={info.id} className='home__card'>
                <MyCard data={info} />
              </div>
            ))
          : [1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i}>
                <Skeleton variant='text' width={200} height={50} />
                <Skeleton variant='rect' width={250} height={80} />
                <Skeleton variant='text' width={200} height={50} />
                <Skeleton variant='rect' width={250} height={80} />
              </div>
            ))}
      </div>
      <div className='home__footer'>
        <p>© Copyright 2020 Nguyen Nguyen. All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Home;
