let APIURL = '';

switch (window.location.hostname) {
    case 'localhost' || '127.0.0.1':
    APIURL = 'http://localhost:3000';
    break;
    
    case 'the-office-api-client.herokuapp.com':
        APIURL = 'https://the-office-api-client.herokuapp.com/'
}

export default APIURL;