function initClock(clockId, greetingId) {
    const clockElement = document.getElementById(clockId);
    const greetingElement = document.getElementById(greetingId);

    function updateTimeAndGreeting() {
        const now = new Date();

        // Update Clock
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
        if (clockElement) {
            clockElement.textContent = timeString;
        }

        // Update Greeting text for brutalist aesthetic
        const hour = now.getHours();
        let greeting = 'NE NUIT';
        let theme = 'dark';
        if (hour >= 5 && hour < 12) {
            greeting = 'JOUR';
            theme = 'light';
        } else if (hour >= 12 && hour < 17) {
            greeting = 'JOUR';
            theme = 'light';
        } else if (hour >= 17 && hour <= 23) {
            greeting = 'SOIR';
            theme = 'dark';
        }

        document.documentElement.setAttribute('data-theme', theme);

        if (greetingElement) {
            // Using DOM methods instead of innerHTML for better LLD security
            greetingElement.textContent = '';
            greetingElement.appendChild(document.createTextNode('BON'));
            greetingElement.appendChild(document.createElement('br'));
            greetingElement.appendChild(document.createTextNode(greeting));
        }
    }

    updateTimeAndGreeting();
    setInterval(updateTimeAndGreeting, 1000);
}
