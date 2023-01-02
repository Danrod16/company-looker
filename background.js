const { link } = require("fs");

const button = document.getElementById('analyze');
const loader = document.getElementById('loader');
const industry = document.getElementById('industry');
const alexaRanking = document.getElementById('alexa-ranking');
const companyName = document.getElementById('company-name');
const description = document.getElementById('description');
const logo = document.getElementById('logo');
const twitter = document.getElementById('twitter');
const facebook = document.getElementById('facebook');
const linkedin = document.getElementById('linkedin');
const angellist = document.getElementById('youtube');


button.addEventListener('click', async () => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        loader.style.display = 'block';
        const activeTab = tabs[0];
        const domain = activeTab.url.match(/\/\/.*?(?=\/)/)[0].replace('//', '');
        fetch(`https://api.thecompaniesapi.com/v1/companies/${domain}`, { 
            method: 'GET', headers: { 'Content-Type': 'application/json', 'Authorization': '3al0Z2cC' }
        }).then(response => response.json() )
        .then(result => 
            setTimeout(() => {
                console.log(result)
                displayResult(result)
            }, 1900)
        );
    });
});

function displayResult(response) {
    loader.style.display = 'none';
    companyName.innerHTML = response.name;
    alexaRanking.innerHTML = response.alexaRank;
    industry.innerHTML = response.industry;
    description.innerHTML = response.description;
    logo.src = response.logo;
    facebook.href = response.facebook;
    linkedin.href = response.linkedin;
    twitter.href = response.twitter;
    angellist.href = response.angellist;
}
