const config=({
  testDir:'./tests',
  timeout:90*1000,
  expect:{
    timeout:90*1000
  },
  reporter:'html',
  use:{
    browserName:'chromium',
    headless:false,
    screenshot:'on',
    trace:'on',
    video:'on'
  },
})
module.exports=config