// Nyzhnipedia — dependency-free behaviour (no jQuery).
// Adds a [hide]/[show] toggle to the contents panel, like Wikipedia.
(function () {
    function initContents(panel) {
        var hide = document.createElement('span');
        hide.className = 'hidePanel';
        hide.textContent = '[hide]';

        var show = document.createElement('span');
        show.className = 'showPanel';
        show.textContent = '[show]';

        panel.insertBefore(show, panel.firstChild);
        panel.insertBefore(hide, panel.firstChild);

        var list = panel.querySelector('ul');

        hide.addEventListener('click', function () {
            if (list) list.style.display = 'none';
            panel.classList.add('minimizedPanel');
        });
        show.addEventListener('click', function () {
            if (list) list.style.display = '';
            panel.classList.remove('minimizedPanel');
        });
    }

    function init() {
        var panels = document.querySelectorAll('.contentsPanel');
        for (var i = 0; i < panels.length; i++) initContents(panels[i]);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
