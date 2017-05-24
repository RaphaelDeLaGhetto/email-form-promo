'use strict';

const Browser = require('zombie');
const app = require('../app');
const request = require('supertest');

// Test server is started in `startTestServerSpec.js`
Browser.localhost('example.com', 3000);

describe('GET /', () => {

  let browser;//, agent, account, fake;

  beforeEach((done) => {
    browser = new Browser({ waitDuration: '30s', loadCss: false });
    browser.visit('/', (err) => {
      if (err) done.fail(err);        
      browser.assert.success();       
      done();            
    });
  });

  it('shows the email question form', () => {
    expect(browser.query("form[action='/signup'] input[name='email']")).toBeTruthy();
    expect(browser.query("form[action='/signup'] textarea[name='message']")).toBeTruthy();
    expect(browser.query("form[action='/signup'] button[type='submit']")).toBeTruthy();
  });
});
