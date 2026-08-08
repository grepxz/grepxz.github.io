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

// Mock-button demolition: placeholder links explode and grey out when clicked.
(function () {
    var COLORS = ['#0645ad', '#3366cc', '#ccccff', '#a7d7f9', '#54595d'];
    var reduceMotion = (window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) ||
        !('animate' in Element.prototype);

    function explode(x, y) {
        for (var i = 0; i < 14; i++) {
            var p = document.createElement('span');
            p.className = 'debris';
            var size = 3 + Math.random() * 4;
            p.style.width = size + 'px';
            p.style.height = size + 'px';
            p.style.background = COLORS[Math.floor(Math.random() * COLORS.length)];
            p.style.left = x + 'px';
            p.style.top = y + 'px';
            document.body.appendChild(p);

            var angle = Math.random() * Math.PI * 2;
            var dist = 30 + Math.random() * 70;
            var dx = Math.cos(angle) * dist;
            var dy = Math.sin(angle) * dist - 25;
            var spin = (Math.random() * 720 - 360) + 'deg';
            var anim = p.animate([
                { transform: 'translate(0,0) rotate(0deg)', opacity: 1 },
                { transform: 'translate(' + dx * 0.7 + 'px,' + dy * 0.7 + 'px) rotate(' + spin + ')', opacity: 1, offset: 0.55 },
                { transform: 'translate(' + dx + 'px,' + (dy + 55) + 'px) rotate(' + spin + ')', opacity: 0 }
            ], { duration: 550 + Math.random() * 350, easing: 'cubic-bezier(.15,.6,.4,1)' });
            anim.onfinish = (function (el) { return function () { el.remove(); }; })(p);
            // Timer fallback: onfinish stalls while the document is hidden.
            setTimeout((function (el) { return function () { el.remove(); }; })(p), 1800);
        }
    }

    document.addEventListener('click', function (e) {
        var target = e.target.closest && e.target.closest('a[href="#"], #submitSearch');
        if (!target) return;
        e.preventDefault();

        var victim = target.id === 'submitSearch'
            ? document.getElementById('simpleSearch')
            : target;
        if (!victim || victim.classList.contains('exploded')) return;

        var rect = victim.getBoundingClientRect();
        var x = e.clientX || rect.left + rect.width / 2;
        var y = e.clientY || rect.top + rect.height / 2;

        if (!reduceMotion) {
            explode(x, y);
            victim.animate([
                { transform: 'scale(1)' },
                { transform: 'scale(1.25) rotate(' + (Math.random() * 8 - 4) + 'deg)' },
                { transform: 'scale(1)' }
            ], { duration: 180, easing: 'ease-out' });
        }
        victim.classList.add('exploded');
    });
})();
