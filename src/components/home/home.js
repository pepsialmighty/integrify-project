import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './home.css';
import MyCard from '../card/card';

const Home = () => {
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const respone = await axios
        .get('https://jsonplaceholder.typicode.com/users')
        .then((res) => res.data)
        .catch((err) => console.log(err));
      setUserInfo(respone);
    };

    fetchData();
  }, []);

  return (
    <div className='home__container'>
      <div className='home__cards'>
        {userInfo &&
          userInfo.map((info) => <MyCard key={info.id} data={info} />)}
      </div>
      <div className='home__footer'>
        <p>© Copyright 2020 Nguyen Nguyen. All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Home;
