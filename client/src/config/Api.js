export default {
    base: 'http://127.0.0.1:4000/api',
    auth: '/login',
    channel: '/channel',
    channelMsg: (id) => '/channel/' + id + '/posts',
    channelMbrs: (id) => '/channel/' + id + '/members',
    postToChannel: (id) => '/channel/' + id,
}