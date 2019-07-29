import {html, render} from 'lit-html';
import allFeatures from '../features/0-all-features';
import { setOption } from '../modules/local-storage-settings';
import settingsCSS from '../../css/pages/settings.css';


const featureTemplate = ({name, description, image, key, active = true}) => html`
    <div class="aurora-feature">
        <a href="${image}" target="_blank" class="aurora-feature__image">
            <img src="${image}" />
        </a>
        <div class="aurora-feature__info">
            <h2>${name}</h2>
            <p>${description}</p>
        </div>
        <div class="aurora-feature__actions">
            <input type="checkbox" ?checked=${active} name="${key}" @click=${changeHandler} />
        </div>
    </div>
`;

const renderPage = (allFeatures) => html`
    <div class="aurora">
        <p id="desc" @click=${changeHandler}>
            This is the main Project Aurora settings page. From here you can see a list of all the features and fixes that Aurora has built in. Hopefully some of these features get built into to Skylords so we are providing a way to turn off certain features
        </p>
        ${allFeatures.map((feature => featureTemplate(feature)))}
    </div>
`;

function changeHandler(e) {
    setOption(e.target.getAttribute("name"), e.target.checked);
}

export default () => {
    return {
        title: "Settings",
        renderer: (container) => {
            render(renderPage(allFeatures), container)
        }
    };
}