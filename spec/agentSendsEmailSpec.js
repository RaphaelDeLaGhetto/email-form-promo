'use strict';

const Browser = require('zombie');
const mailer = require('../mailer');
const app = require('../app');
const request = require('supertest');

// Test server is started in `startTestServerSpec.js`
Browser.localhost('example.com', 3000);

describe('GET /', () => {

  let browser;

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

  describe('POST /signup', () => {
    let _email = 'someguy@example.com';
    let _message = 'I need help making fat stacks';
    beforeEach((done) => {
      process.env.CONTACT = 'me@example.com';
      process.env.FROM = 'noreply@example.com';
      browser
        .fill('email', _email)
        .fill('message', _message)
        .pressButton('Send', (err) => {
          if (err) done.fail(err);        
          browser.assert.success();       
          done();            
        });
    });

    afterEach(() => {
      mailer.transport.sentMail = [];
    });

    it('displays success message', () => {
      browser.assert.text('.alert.alert-success',
        'Thanks for the note! Check your email: someguy@example.com');
    });

    it('sends an email to the lead', () => {
      expect(mailer.transport.sentMail.length).toEqual(2);
    });
    
    it('sends an email to the contact specified in process.env.FROM', () => {
      expect(mailer.transport.sentMail[0].data.to).toEqual(process.env.CONTACT);
      expect(mailer.transport.sentMail[0].data.from).toEqual(process.env.FROM);
      expect(mailer.transport.sentMail[0].data.subject).toEqual('Message from someguy@example.com');
      expect(mailer.transport.sentMail[0].data.text).toContain(_message);
    });

    it('sends an email to the lead', () => {
      expect(mailer.transport.sentMail[1].data.to).toEqual(_email);
      expect(mailer.transport.sentMail[1].data.from).toEqual(process.env.FROM);
      expect(mailer.transport.sentMail[1].data.subject).toEqual('Message received!');
      expect(mailer.transport.sentMail[1].data.text).toContain(_message);
    });


  });
});
