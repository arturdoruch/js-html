/**
 * Created by Artur on 2016-02-14.
 */

export default {
    /**
     * @param {HTMLElement} element
     */
    empty(element) {
        if (!(element instanceof HTMLElement)) {
            return;
        }

        if (element.nodeName === 'TEXTAREA' || element.nodeName === 'INPUT') {
            element.value = '';
        } else {
            element.innerHTML = '';
        }
    },

    /**
     * Gets urls from hyperlinks anchor.
     *
     * @param {NodeList|HTMLCollection|Array} hyperlinks
     * @param {bool|Array} [removeSSL]
     *
     * @returns {[]}
     */
    extractUrls(hyperlinks, removeSSL) {
        let urls = [],
            url,
            host,
            _removeSSL = function (url) {
                if (removeSSL === true) {
                    url = url.replace(/^https/i, 'http');
                } else if (removeSSL instanceof Array) {
                    host = url.replace(/^https?:\/\/([\w\.]+)\/.*/i, '$1');
                    if ($.inArray(host, removeSSL)) {
                        url = url.replace(/^https/i, 'http');
                    }
                }
                return url;
            };

        for (let i = 0; i < hyperlinks.length; i++) {
            url = hyperlinks[i] instanceof HTMLAnchorElement
                ? hyperlinks[i].getAttribute('href')
                : hyperlinks[i];

            if (url) {
                urls.push(_removeSSL(url.trim()));
            }
        }

        return urls;
    },

    /**
     * Parses table data into an object. First table column is used as object key, second column as value.
     *
     * @param {HTMLTableElement} tableElement
     * @return {{}}
     */
    parseTableData(tableElement) {
        if (!(tableElement instanceof HTMLTableElement)) {
            throw new TypeError(`Invalid argument "tableElement". Expected type of HTMLTableElement, but got "${typeof tableElement}".`);
        }

        let data = {},
            rows = tableElement.rows,
            cells,
            key;

        for (let i = 0; i < rows.length; i++) {
            cells = rows[i].cells;
            key = cells[0].textContent.replace(/[^\w]/, '').toLowerCase();

            data[key] = cells[1].textContent.trim();
            data[key + 'Element'] = cells[1];
        }

        return data;
    },

    /**
     * @param {string|HTMLElement} html
     * @returns {{}}
     */
    getBrListData: function (html) {
        if (html === typeof HTMLElement) {
            // Replace <br/> into "\n"
            html.innerHTML = html.innerHTML.replace(/<\s*br\s*\/?\s*>/gi, "\n");
            html = html.textContent;
        }

        var items = {},
            parts,
            nodes = html.split(/\n/);

        for (var i = 0; i < nodes.length; i++) {
            if (!/:/.test(nodes[i])) {
                continue;
            }
            parts = nodes[i].split(': ');
            if (!parts[1]) {
                continue;
            }

            items[parts[0].replace(/[^\w]/, '').toLowerCase()] = parts[1].trim();
        }

        return items;
    },

    /**
     * @param {Node} node
     *
     * @returns {[]}
     */
    getTextNodes: function (node) {
        var textNodes = [],
            childNode;

        for (var i = 0; i < node.childNodes.length; i++) {
            childNode = node.childNodes[i];

            if (childNode.nodeName === "#text") {
                textNodes.push(childNode);
            } else if ($.inArray(childNode.nodeName, ['B', 'STRONG', 'I', 'EM', 'U']) !== -1) {
                textNodes[textNodes.length - 1].textContent += ' ' + childNode.textContent;
            }
        }
        return textNodes;
    },

    /**
     * Gets option value from select element for option with label.
     *
     * @param {HTMLElement} select Select element
     * @param {string}      label  Option label
     *
     * @returns {*|string|int}
     */
    getSelectOptionValueByLabel: function (select, label) {
        const options = select.getElementsByTagName('option');

        label = label.toLowerCase();

        for (let option of options) {
            if (label === option.textContent.toLowerCase()) {
                let value = option.value;

                return isNaN(value) ? value.trim() : parseInt(value.value);
            }
        }
        return null;
    },

    /**
     * @todo To improve.
     *
     * @param {jQuery} imageElement
     *
     * @return {Image} with src attribute filled by an element css property "background-image".
     */
    getBackgroundImage: function (imageElement) {
        let image = new Image();
        image.src = imageElement.css('background-image').replace(/url\(|\)$|"/ig, '');

        return image;
    }
}