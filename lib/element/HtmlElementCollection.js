/*
 * (c) Artur Doruch <arturdoruch@interia.pl>
 */

import HtmlElement from './HtmlElement.js';

export default class HtmlElementCollection {

    constructor() {
        this._collection = {};
    }

    /**
     * Adds HtmlElement to the collection.
     *
     * @param {string} name The element custom name e.g. "message_container".
     * @param {HtmlElement|string|HTMLElement|jQuery} element Tag name, HtmlElement, HTMLElement or jQuery object of the HTML element.
     * @param {object} [attr] Element attributes.
     * @param {object} [css] Element css styles.
     *
     * @returns {HtmlElementCollection}
     */
    add(name, element, attr, css) {
        if (!(element instanceof HtmlElement)) {
            element = new HtmlElement(element, attr, css);
        }

        this._collection[name] = element;

        return this;
    }

    /**
     * Gets collection HtmlElement objects.
     *
     * @returns {object}
     */
    all() {
        return this._collection;
    }

    /**
     * @param {string} name
     *
     * @returns {HtmlElement}
     * @throws TypeError
     */
    get(name) {
        if (!this.has(name)) {
            throw new TypeError(`The HtmlElement with name ${name} does not exits.`);
        }

        return this._collection[name];
    }

    /**
     * @param {string} name
     *
     * @returns {boolean}
     */
    has(name) {
        return this._collection.hasOwnProperty(name);
    }

    /**
     * Removes HtmlElement form collection.
     *
     * @param {string} name
     *
     * @returns {HtmlElementCollection}
     */
    remove(name) {
        if (this.has(name)) {
            this._collection[name] = null;
            delete this._collection[name];
        }

        return this;
    }
}