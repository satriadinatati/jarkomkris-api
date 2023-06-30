// console.log(require('crypto').randomBytes(256).toString('base64'));

const fs = require('fs');
require('dotenv').config();

const app_key = 'APP_KEY = '+require('crypto').randomBytes(256).toString('base64');

const envFilePath = '.env';
const envContents = fs.readFileSync(envFilePath, 'utf-8');

const updatedEnvContents = envContents + '\n' + app_key;

fs.writeFileSync(envFilePath, updatedEnvContents, 'utf-8');
