import MarkdownIt from "markdown-it";
import auroraMarkdown from './styles.scss';

export default () => {
    
    const md = new MarkdownIt({
        html: true,
        linkify: true,
        typographer: true
    });

    document.querySelectorAll('.mt-text')
        .forEach(entry => {
            let newHtml = '';
            const userSignature = document.querySelector('.usign');
            if (userSignature) {
                userSignature.remove();
            }
            
            const originalText = entry.innerText;
            const markdownHtml = md.render(originalText);

            newHtml += `${markdownHtml}`;

            if (userSignature) {
                const originalText = userSignature.innerText;
                const newText = originalText.replace("__________________________","");
                newHtml += `<div class="aurora-markdown__footer">${md.render(newText)}</div>`;
            }
            
            
            entry.innerHTML = `<div class="aurora-markdown">${newHtml}</div>`;
        });
}