const twit = require('twit');
const _ = require('lodash');

const T = new twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000,
})

const stream = T.stream('statuses/filter', {
  track: '#devBot, #devbot, #Devbot'
});

module.exports = (io) => {
  const postUpdateFn = function (content, cb) {
    T.post('statuses/update', content, function (err, data, response) {
      cb(data);
    })
  }
  const retweetFn = function (content, cb) {
    T.post('statuses/retweet/:id', content, function (err, data, response) {
      cb(data);
    })
  }
  stream.on('tweet', data => {
    retweetFn({
      id: data.id_str
    }, (res) => {
      console.log(res);
    })
    const tweet = _.pick(data, ['id', 'text', 'user']);
    io.emit('tweet', {
      data: tweet,
      message: 'New Tweet Received',
      status: 200
    });
  });
  return {
    postUpdate: postUpdateFn
  }
}
