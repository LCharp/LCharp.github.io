function renderBookmarks(containerId, bookmarks) {
    const container = document.getElementById(containerId);
    if (!container || typeof bookmarks === 'undefined') return;

    let animationDelay = 0.1;

    for (const [category, linksObj] of Object.entries(bookmarks)) {
        // create wrapper for grid row spacing 
        const colDiv = document.createElement('div');
        colDiv.className = 'col-6 stagger-in';
        colDiv.style.animationDelay = `${animationDelay}s`;
        colDiv.style.marginBottom = '2.5rem';

        // Root card element (re-using Oat UI class conceptually)
        const article = document.createElement('article');
        article.className = 'card';

        // Custom Header element
        const header = document.createElement('header');
        const h3 = document.createElement('h3');
        h3.textContent = category;
        header.appendChild(h3);
        article.appendChild(header);

        // Container for link chips
        const chipContainer = document.createElement('div');
        chipContainer.className = 'chip-container';

        // Loop over the Object inside the category (iterating object keys)
        for (const [name, data] of Object.entries(linksObj)) {
            const a = document.createElement('a');
            a.href = data.url;
            a.className = 'link-chip'; // custom chip class overriding basic Oat UI ones

            // Build the string explicitly displaying the icon and textual representation securely
            const icon = document.createElement('i');
            icon.className = data.logo;

            const span = document.createElement('span');
            span.textContent = data.displayUrl;

            a.appendChild(icon);
            a.appendChild(document.createTextNode(' '));
            a.appendChild(span);

            chipContainer.appendChild(a);
        }

        article.appendChild(chipContainer);
        colDiv.appendChild(article);
        container.appendChild(colDiv);

        animationDelay += 0.15;
    }
}
