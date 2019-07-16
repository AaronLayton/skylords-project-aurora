import styles from './panel-updater.scss';

export default (container, promiseToAwait) => {
    var deferredOverlay = setTimeout(function () {
        setPanelLoading(container);
    }, 300);

    return promiseToAwait
        .finally(function (data) {
            clearTimeout(deferredOverlay);
            setPanelLoaded(container);
            return data;
        });
};

const setPanelLoading = elm => {
    elm.classList.add('is-loading');
};

const setPanelLoaded = elm => {
    elm.classList.remove('is-loading');
};
