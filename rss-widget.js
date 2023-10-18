document.addEventListener("DOMContentLoaded", function() {
    const rssFeedUrl = 'https://www.sciencedaily.com/rss/top/science.xml'; // Replace with your RSS feed URL
    const rssFeedWidget = document.getElementById('rss-feed-widget');

    // Function to fetch and display the RSS feed
    function displayRSSFeed() {
        fetch(rssFeedUrl)
            .then(response => response.text())
            .then(data => {
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(data, 'text/xml');
                const items = xmlDoc.querySelectorAll('item');
                let html = '';

                items.forEach(item => {
                    const title = item.querySelector('title').textContent;
                    const link = item.querySelector('link').textContent;
                    const description = item.querySelector('description').textContent;
                    const imageUrl = item.querySelector('enclosure').getAttribute('url'); // Assuming images are provided via the enclosure tag

                    html += `
                        <div class="feed-item">
                            <a href="${link}">
                                <img src="${imageUrl}" alt="${title}" />
                            </a>
                            <h2><a href="${link}">${title}</a></h2>
                            <p>${description}</p>
                        </div>
                    `;
                });

                rssFeedWidget.innerHTML = html;
            })
            .catch(error => {
                console.error('Error fetching RSS feed:', error);
                rssFeedWidget.innerHTML = 'Error fetching RSS feed. Check the browser console for details.';
            });
    }

    // Call the function to display the RSS feed
    displayRSSFeed();
});
