const menu = document.querySelector('#primary-nav');
const menuButton = document.querySelector('.menu-switch');
function setMenu(open) {
    menuButton.setAttribute('aria-expanded', String(open));
    menu.classList.toggle('open', open);
}
menuButton.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
document.addEventListener('pointerdown', event => {
    if (menu.classList.contains('open') && !menu.contains(event.target) && event.target !== menuButton) setMenu(false);
});
menu.addEventListener('focusout', event => {
    if (menu.classList.contains('open') && !menu.contains(event.relatedTarget)) setMenu(false);
});
document.addEventListener('keydown', event => {
    const focusIsInNavigation = event.target === menuButton || menu.contains(event.target);
    const menuButtonIsVisible = menuButton.offsetParent !== null;
    const dialogIsOpen = document.querySelector('dialog[open]');
    if (event.key === 'Escape' && menuButtonIsVisible && menu.classList.contains('open') && !dialogIsOpen) {
        setMenu(false);
        if (focusIsInNavigation) menuButton.focus();
    }
});
matchMedia('(min-width:921px)').addEventListener('change', event => {
    if (event.matches && menu.classList.contains('open')) setMenu(false);
});
window.addEventListener('resize', () => {
    if (window.innerWidth > 920 && menu.classList.contains('open')) setMenu(false);
});
const theme = document.querySelector('#theme-toggle');
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
        const wrapper = document.createElement('div');
        wrapper.className = 'code-block';
        const toolbar = document.createElement('div');
        toolbar.className = 'code-toolbar';
        const status = document.createElement('span');
        status.className = 'copy-status';
        status.setAttribute('role', 'status');
        status.setAttribute('aria-live', 'polite');
        const button = document.createElement('button');
        button.className = 'copy-code-button';
        button.textContent = 'Copy code';
        button.type = 'button';
        pre.before(wrapper);
        wrapper.append(toolbar, pre);
        toolbar.append(status, button);

        button.addEventListener('click', async () => {
            clearTimeout(button.feedbackTimer);
            try {
                await navigator.clipboard.writeText(codeBlock.textContent);
                button.textContent = 'Copied!';
                button.classList.add('copied');
                status.textContent = 'Code copied to clipboard.';
            } catch {
                button.textContent = 'Copy failed';
                button.classList.remove('copied');
                status.textContent = 'Could not copy code. Select it and copy manually.';
            }
            button.feedbackTimer = setTimeout(() => {
                button.textContent = 'Copy code';
                button.classList.remove('copied');
                status.textContent = '';
            }, 2500);
        });
    });
