// ==UserScript==
// @name        Download Images on Hover
// @namespace
// @version     1.0
// @description Downloads images on hover.
// @author      qpayr
// @match       *://*/*
// @grant       none
// ==/UserScript==

(function() {
    'use strict';

    let downloadCounter = 1; // Initialize download counter

    function downloadImage(imageUrl, event) {
        if (!event.ctrlKey) return; // Download only on Ctrl key press

        let fileName = `Image ${downloadCounter++}`; // Generate sequential filename
        let downloadPath = '/Users/[YOUR_USERNAME]/Downloads/'; // Change download path

        let xhr = new XMLHttpRequest();
        xhr.open('GET', imageUrl, true);
        xhr.responseType = 'blob';
        xhr.onload = function(event) {
            let blob = xhr.response;
            let a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = fileName;
            a.click();
        };
        xhr.send();
    }

    document.addEventListener('mouseover', function(event) {
        if (event.target.tagName.toLowerCase() === 'img') {
            event.target.addEventListener('click', function(event) {
                downloadImage(this.src, event);
            });
        }
    });
})();