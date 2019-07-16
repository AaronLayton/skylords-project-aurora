import {html, render} from 'lit-html';
import panelUpdater from '../../modules/panel-updater.js';
import styles from './style.scss';

let playerCardTemplate;

export default () => {
    const container = document.createElement('div');
    container.classList.add('tmp-container');
    document.body.appendChild(container);

    const allPlayerLinks = document.querySelectorAll('[href^="/player"]');

    allPlayerLinks.forEach(elm => {
        elm.addEventListener('mouseover', e => {
            const URL = e.target.getAttribute('href');
            const tmep = getTemplateInstance();

            render(tmep({
                name: "DAngel",
                displayName: "Aaron the Great",
                clanName: "ChaosInDaGalaxy",
                points: "1,000,000",
                totalPoints: "1,000,000",
                timesDefeated: "0",
                playersDefeated: "0"
            }), container);
            console.log("mouse over");
        });

        elm.addEventListener('mouseout', e => {
            console.log("mouse out");
        });
    });
}

function getTemplateInstance() {
    if (playerCardTemplate) return playerCardTemplate;

    playerCardTemplate = ({
        name,
        displayName,
        clanName,
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
                    <img src="https://www.skylords.com/styles/2/class5.png" />
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