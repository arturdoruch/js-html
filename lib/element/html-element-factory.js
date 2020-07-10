/*
 * (c) Artur Doruch <arturdoruch@interia.pl>
 */

export default {
    /**
     * @param {string} tagName
     * @param {string} [innerHtml]
     * @param {string|Array} [classNames]
     *
     * @return {HTMLElement}
     */
    create(tagName, innerHtml = '', classNames) {
        let element = document.createElement(tagName);

        element.innerHTML = innerHtml;

        if (classNames) {
            if (Array.isArray(classNames)) {
                classNames = classNames.join(' ');
            }

            element.className = classNames;
        }

        return element;
    }
}