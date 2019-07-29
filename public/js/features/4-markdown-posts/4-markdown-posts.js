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
            const userSignature = entry.querySelector('.usign');
            if (userSignature) {
                userSignature.remove();
            }
            
            const originalText = entry.innerText;
            const markdownHtml = md.render(originalText);
            

            newHtml += `${markdownHtml}`;

            if (userSignature) {
                const originalText = userSignature.innerText;
                const newText = originalText.replace("__________________________","").replace(/\n/g, "  \n");
                const signatureMarkdownHtml = md.render(newText);
                newHtml += `<div class="aurora-markdown__footer">${signatureMarkdownHtml}</div>`;
            }
            
            
            entry.innerHTML = `<div class="aurora-markdown">${newHtml}</div>`;
        });
}