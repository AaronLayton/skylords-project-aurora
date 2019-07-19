
import { addClass, removeClass, waitForFrame } from './utility-functions';

const CCC_ACTIVE_CLASS = 'is-active';
const CCC_VISIBLE_CLASS = 'is-visible';

export const activate = elm => {    
    addClass(elm, CCC_VISIBLE_CLASS);

    return waitForFrame()
        .then(waitForFrame)
        .then(() => {
            return new Promise(resolve => {
                const onTransitionEnd = () => {
                    elm.removeEventListener('transitionend', onTransitionEnd);
                    resolve();
                };
                elm.addEventListener('transitionend', onTransitionEnd);
                addClass(elm, CCC_ACTIVE_CLASS);
            });
        });
};

export const deactivate = elm => {
    return new Promise(resolve => {
        const onTransitionEnd = () => {
            removeClass(elm, CCC_VISIBLE_CLASS);
            elm.removeEventListener('transitionend', onTransitionEnd);
            resolve();
        };
    
        elm.addEventListener('transitionend', onTransitionEnd);
        removeClass(elm, CCC_ACTIVE_CLASS);
    });
};

export const toggle = async (elm, isActive = false) => {
    if (elm.classList.contains(CCC_ACTIVE_CLASS && isActive === false)) {
        deactivate(elm);
        return;
    }

    activate(elm);
}; 