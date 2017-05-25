email-form-promo
================

This is a simple email-signup template. It is intended for basic company
promotional pages intending to collect emails from potential leads. I was
motivated to build this project because my old Sinatra-based, Docker-deployed
methodology has fallen victim to time and progress.

# Setup

Clone to your local machine and install

```
npm install
```

# Development server

```
npm start
```

# Test

```
npm test
```

# Production                   

Clone and install:             

```
npm install --production       
```

## Set up environment          
  
Paste the following into a `.env` file:
  
```
TITLE="Email Form Promo"
# Email
CONTACT=you@example.com
FROM=noreply@example.com
PASSWORD=
```

