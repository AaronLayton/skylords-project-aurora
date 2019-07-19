

export default () => {
    document.querySelectorAll('textarea')
        .forEach(elm => {
            elm.addEventListener('keydown', (e) => {
                if (e.ctrlKey && e.keyCode == 13) {
                    elm.closest('form').querySelector('[type="submit"]').click();
                }
            });
        })
}