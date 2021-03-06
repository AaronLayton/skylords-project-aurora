import {html, render} from 'lit-html';
import { addClass, removeClass, waitForFrame } from '../../modules/utility-functions';
import * as CTH from '../../modules/css-transition-helper';
import panelUpdater from '../../modules/panel-updater.js';
import styles from './style.scss';

const CONTAINER_X_OFFSET = 10;
const CONTAINER_Y_OFFSET = -23;

let playerCardTemplate;

export default () => {
    let mouseoutTimeout;
    const container = document.createElement('div');
    container.classList.add('info-container');
    document.body.appendChild(container);
    
    container.addEventListener('mouseover', () => {
        clearTimeout(mouseoutTimeout);
    });
    container.addEventListener('mouseout', () => {
        mouseoutTimeout = hideContainer(container);
    });

    const allPlayerLinks = document.querySelectorAll('[href^="/player"]');
    allPlayerLinks.forEach(elm => {
        elm.addEventListener('mouseover', async (e) => {
            const URL = e.currentTarget.getAttribute('href');
            const tmep = getTemplateInstance();
            const panel = container.querySelector('.panel-updater') || document.createElement("div");

            resetContainer(container);
            clearTimeout(mouseoutTimeout);

            positionContainer(container, e.currentTarget);

            const data = await panelUpdater(panel, getPlayerData(URL));
            CTH.activate(container);
            render(tmep(data), container);
        });

        elm.addEventListener('mouseout', e => {
            mouseoutTimeout = hideContainer(container);
        });
    });
}

async function getPlayerData(url) {
    return fetch(url)
        .then(response => response.text())
        .then(text => {
            const parser = new DOMParser();
            const htmlDocument = parser.parseFromString(text, "text/html");
            return htmlDocument;
        })
        .then(getProfileData);
}

async function getProfileData(doc = document) {
    let selectorOffset = 0;

    const playerLink = doc.querySelector('#centercontent > div.base-body > table > tbody > tr > td:nth-child(2) > p:nth-child(1) > a');
    const playerUsername = playerLink.getAttribute("href").replace("/com/spm/","");

    const hasClan = doc.querySelector('#centercontent > div.base-body > table > tbody > tr > td:nth-child(1) > *:nth-child(2)').innerText == "Clan:";
    if (hasClan) selectorOffset++;

    //console.log("hasClan", hasClan);

    const hasLocation = doc.querySelector(`#centercontent > div.base-body > table > tbody > tr > td:nth-child(1) > *:nth-child(${3 + selectorOffset})`).innerText == "Location:";
    if (hasLocation) selectorOffset++;

    //console.log("hasLocation", hasLocation);
    
    const hasGender = doc.querySelector(`#centercontent > div.base-body > table > tbody > tr > td:nth-child(1) > *:nth-child(${3 + selectorOffset})`).innerText == "Gender:";
    if (hasGender) selectorOffset++;
    //console.log("hasGender", hasGender);
    
    return {
        name: playerUsername,
        displayName: playerLink.innerText,
        classImg: doc.querySelector(`#centercontent > div.base-body > table > tbody > tr > td:nth-child(2) > p > img`).getAttribute('src'),
        clanName: hasClan ? doc.querySelector(`#centercontent > div.base-body > table > tbody > tr > td:nth-child(2) > p:nth-child(2)`).innerText : null,
        points: doc.querySelector(`#centercontent > div.base-body > table > tbody > tr > td:nth-child(2) > p:nth-child(${5 + selectorOffset})`).innerText,
        totalPoints: doc.querySelector(`#centercontent > div.base-body > table > tbody > tr > td:nth-child(2) > p:nth-child(${6 + selectorOffset})`).innerText,
        timesDefeated: doc.querySelector(`#centercontent > div.base-body > table > tbody > tr > td:nth-child(2) > p:nth-child(${23 + selectorOffset})`).innerText,
        playersDefeated: doc.querySelector(`#centercontent > div.base-body > table > tbody > tr > td:nth-child(2) > p:nth-child(${24 + selectorOffset})`).innerText,
    };
}


function resetContainer(container){
    removeClass(container, "is-visible");
    removeClass(container, "is-active");
}

function hideContainer(container) {
    return setTimeout(() => {
        CTH.deactivate(container);
    }, 1000);
}

function getTemplateInstance() {
    if (playerCardTemplate) return playerCardTemplate;

    playerCardTemplate = ({
        name,
        displayName,
        clanName,
        classImg,
        points,
        totalPoints,
        timesDefeated,
        playersDefeated
    }) => html`
        <div class="info-popup">
            <div class="panel-updater">
                <div class="info-popup__header p-3">
                    <div class="info-popup__player-name">${displayName}</div>
                    <div class="info-popup__clan-name"><a href="/clan/${clanName}">${clanName}</a></div>
                    <img src="${classImg}" />
                </div>
                <div class="info-popup__body px-3 pb-3">
                    <div class="player-info">
                        Points: <span>${points}</span>
                    </div>
                    <div class="player-info">
                        Total Points: <span>${totalPoints}</span>
                    </div>
                    <div class="player-info">
                        Times Defeated: <span>${timesDefeated}</span>
                    </div>
                    <div class="player-info">
                        Players Defeated: <span>${playersDefeated}</span>
                    </div>
                </div>
                <div class="info-popup__footer">
                    <a href="/com/spm/${name}">Send PM</a>
                    <a href="/player/${name}">Profile</a>
                </div>
            </div>
        </div>
    `;

    return playerCardTemplate;
}

function positionContainer(container, target) {
    const style = window.getComputedStyle(target);
    const domrect = target.getBoundingClientRect();
    container.style.top = `${domrect.y + window.pageYOffset + CONTAINER_Y_OFFSET}px`;
    container.style.left = `${domrect.x + domrect.width + CONTAINER_X_OFFSET}px`;
}