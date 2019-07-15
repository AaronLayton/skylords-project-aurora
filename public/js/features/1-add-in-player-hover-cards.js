export default () => {
    const allPlayerLinks = document.querySelectorAll('[href*="/player"]');

    allPlayerLinks.forEach(elm => {
        elm.style.color = "red";
        
    });
}