import { totalmem } from "os";

const MAIN_CONTENT_SELECTOR = '#centercontent, #maincontent';
const allLinks = [];
let backedUpContent;
let backedUpFooter;

export default () => {
    const leftContent = document.querySelector('#leftcontent');
    
    const auroraTitle = document.createElement('div');
    auroraTitle.classList.add('block-title');
    auroraTitle.innerHTML = "AURORA";
    leftContent.appendChild(auroraTitle);

    const auroraMenuContainer = document.createElement('div');
    const auroraMenu = document.createElement('ul');

    auroraMenuContainer.classList.add('block-menu');
    auroraMenu.classList.add('menu');
    
    auroraMenuContainer.appendChild(auroraMenu);
    leftContent.appendChild(auroraMenuContainer);

    setupEventListeners();
    backupCenterContent();

    return auroraMenu;
}

export function addLink(menuElm, url, text, target = undefined) {
    const newLi = document.createElement('li');
    const newLink = document.createElement('a');

    newLink.href = url;
    newLink.innerHTML = text;
    if (target) newLink.target = target;

    newLi.appendChild(newLink);
    menuElm.appendChild(newLi);

    return newLi;
}

export function addPage(menuElm, hashtag, text, cb) {
    addLink(menuElm, `#${hashtag}`, text);
    allLinks.push({
        hashtag,
        cb
    });
}

function getPageCallbackByHash(allLinks, hashtag) {
    const entryFile = allLinks.find(entry => entry.hashtag == hashtag);

    if (!entryFile) return null;
    return entryFile.cb;
}

function setupEventListeners(){
    window.addEventListener("hashchange", async (e) => {
        await handleHash(location.hash);
    }, false);
}

export async function handleHash(hash) {
    const cb = getPageCallbackByHash(allLinks, hash.replace('#',''));

    if (cb) {
        const mod = await cb();
        const page = mod.default();
        
        setPageContent(page.title, page.renderer);
        return;
    }
    
    setPageToOriginal();
}

function setPageToOriginal() {
    const centerContent = document.querySelector(MAIN_CONTENT_SELECTOR);

    centerContent.innerHTML = getOriginalCenterContent();
}

function setPageContent(title, content) {
    const centerContent = document.querySelector(MAIN_CONTENT_SELECTOR);

    centerContent.innerHTML = '';

    const titleElm = document.createElement('div');
    titleElm.classList.add('block-title');
    titleElm.innerHTML = title.toUpperCase();

    const bodyElm = document.createElement('div');
    bodyElm.classList.add('base-body');

    if (typeof content === "string") {
        bodyElm.innerHTML = content;
    } else {
        content(bodyElm);
    }

    const footerElm = document.createElement('div');
    footerElm.classList.add('block-title');
    footerElm.innerHTML = backedUpFooter;

    centerContent.appendChild(titleElm);
    centerContent.appendChild(bodyElm);
    centerContent.appendChild(footerElm);
}


function backupCenterContent() {
    if (backedUpContent) return backedUpContent;

    backedUpContent = document.querySelector(MAIN_CONTENT_SELECTOR).innerHTML;
    backedUpFooter = document.querySelector(MAIN_CONTENT_SELECTOR).querySelector('.block-title:last-child').innerHTML;
}

function getOriginalCenterContent() {
    return backedUpContent;
}