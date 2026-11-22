const menu = document.querySelector('#primary-nav');
const menuButton = document.querySelector('.menu-switch');
menuButton.hidden = false;
menu.classList.add('collapsible');
function setMenu(open) {
    menuButton.setAttribute('aria-expanded', String(open));
    menu.classList.toggle('open', open);
}
menuButton.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.classList.contains('open')) {
        setMenu(false);
        menuButton.focus();
    }
});
const theme = document.querySelector('#theme-toggle');
theme.hidden = false;
theme.setAttribute('aria-pressed', String(document.documentElement.classList.contains('dark')));
theme.addEventListener('click', () => {
    const dark = document.documentElement.classList.toggle('dark');
    theme.setAttribute('aria-pressed', String(dark));
    try { localStorage.setItem('color-theme', dark ? 'dark' : 'light'); } catch {}
});
    // Add copy to clipboard functionality for code blocks
    const codeBlocks = document.querySelectorAll('pre code');
    codeBlocks.forEach(codeBlock => {
        const pre = codeBlock.parentElement;
        const button = document.createElement('button');
        button.className = 'absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm transition-colors duration-200';
        button.textContent = 'Copy';
        button.setAttribute('aria-label', 'Copy code to clipboard');
        
        // Make pre element relative for absolute positioning
        pre.style.position = 'relative';
        pre.appendChild(button);
        
        button.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(codeBlock.textContent);
                button.textContent = 'Copied!';
                button.classList.add('bg-green-600');
                
                setTimeout(() => {
                    button.textContent = 'Copy';
                    button.classList.remove('bg-green-600');
                }, 2000);
            } catch (err) {
                console.error('Failed to copy text: ', err);
                button.textContent = 'Failed';
                
                setTimeout(() => {
                    button.textContent = 'Copy';
                }, 2000);
            }
        });
    });
    

if (matchMedia('(max-width:760px)').matches) {
    document.querySelectorAll('.reading aside details').forEach(outline => { outline.open = false; });
}
