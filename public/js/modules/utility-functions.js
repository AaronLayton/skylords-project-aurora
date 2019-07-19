// @ts-check
/**
 * @module utility-functions
 */


export const addClass = (elm, className) => elm.classList.add(className);
export const convertObjectKeysToArray = obj => Object.keys(obj).map(data => [data, obj[data]]);
export const convertObjectValuesToArray = obj => Object.values(obj).map(data => [data, obj[data]]);
export const removeClass = (elm, className) => elm.classList.remove(className);

export const setStateClass = (elm, possibleStateClasses, stateClassToAdd) => {

    possibleStateClasses.forEach(stateClass => removeClass(elm, stateClass));
    addClass(elm, stateClassToAdd);

};

export const toggleClass = (elm, className, shouldAddClass) => elm.classList.toggle(className, shouldAddClass);

export const setStylesOnElement = (styles, element) => Object.assign(element.style, styles);

export const insertAfter = (referenceNode, elmToAppend) => referenceNode.parentNode.insertBefore(elmToAppend, referenceNode.nextSibling);

export const findElementPosition = elm => {
    const rect = elm.getBoundingClientRect();
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    const coords = {
        top: rect.top + scrollTop,
        left: rect.left + scrollLeft
    };

    return coords;
};

export const queryStringFromObject = params => Object.keys(params).map(key => `${key}=${params[key]}`).join('&');
export const waitForFrame = () => new Promise((resolve) => requestAnimationFrame(resolve));