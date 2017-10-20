import _ from 'lodash';

import style from './index.scss';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:8080');

const tweetElem = document.querySelector('.tweet-card p');

socket.on('tweet', (res) => {
  console.log(res);
  tweetElem.innerHTML = res.data.text;
})
