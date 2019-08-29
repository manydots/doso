
module.exports = {
  toolkit: 'just',
  toolkitConfig: {
    port: 9000,
    open: true,
    openTarget: 'demos/index.html',
    liveload: true,
    disableHostCheck: true
  },

  tasks: {
    start: [{
      command: 'npm run start'
    }],
    build: [{
      command: 'npm run start'
    }],
    publish: []
  }
};