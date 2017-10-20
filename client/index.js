import _ from 'lodash';

import style from './index.scss';
import io from 'socket.io-client';

const socket = io.connect(window.location.href);

const tweetElem = document.querySelector('.tweet-card p');

socket.on('tweet', (res) => {
  tweetElem.innerHTML = res.data.text;
})
