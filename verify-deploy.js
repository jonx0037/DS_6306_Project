const https = require('https');

const checkGitHubPages = () => {
  console.log('Checking GitHub Pages deployment...');
  
  const options = {
    hostname: 'jonx0037.github.io',
    path: '/DS_6306_Project/',
    method: 'GET'
  };

  const req = https.request(options, (res) => {
    console.log('Status Code:', res.statusCode);
    console.log('Headers:', res.headers);

    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      console.log('Response received');
      if (res.statusCode === 200) {
        console.log('✅ Site is accessible!');
      } else {
        console.log('❌ Site returned status code:', res.statusCode);
      }
    });
  });

  req.on('error', (error) => {
    console.error('Error checking deployment:', error);
  });

  req.end();
};

// Check deployment status every 30 seconds for 5 minutes
let checks = 0;
const maxChecks = 10;

console.log('Starting deployment verification...');
const interval = setInterval(() => {
  checks++;
  console.log(`\nCheck ${checks} of ${maxChecks}`);
  checkGitHubPages();
  
  if (checks >= maxChecks) {
    clearInterval(interval);
    console.log('\nVerification complete.');
  }
}, 30000);

// Run first check immediately
checkGitHubPages();