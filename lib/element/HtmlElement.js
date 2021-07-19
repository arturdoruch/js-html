/*
 * (c) Artur Doruch <arturdoruch@interia.pl>
 */

import $ from 'jquery';
import stringUtils from '@arturdoruch/util/lib/string-utils.js';
import htmlUtils from './../html-utils.js';

/**
 * HTMLElement object wrapper. Provides common functions to manipulate HTML element.
 */
export default class HtmlElement {
    /**
     * @todo Allow to set attribute multiple values from array.
     *
     * @param {string|HTMLElement|jQuery} element Tag name, HTMLElement or jQuery object of the HTML element.
     * @param {object} [attr] HTML element attributes.
     * @param {object} [css] HTML element CSS styles.
     */
    constructor(element, attr = {}, css = {}) {
        this.el = prepareElement(element);
        this.$el = $(this.el);

        setAttr(this.el, attr);
        setCss(this.el, css);
        this._displayStyle = this.el.style.display;
    }

    /**
     * Gets HTML element attributes.
     *
     * @param {HTMLElement} element The HTML element.
     *
     * @return {{}} Object with pairs "attr: value".
     */
    static getAttributes(element) {
        let attributes = element.attributes,
            output = {};

        for (let attribute of attributes) {
            output[attribute.nodeName] = attribute.nodeValue.trim();
        }

        return output;
    }

    /**
     * Sets HTML element attribute.
     *
     * @param {string} name The attribute name.
     * @param {string|array} value The attribute value or values.
     * @param {boolean} [overwrite = true] Whether to override existing attribute value.
     *
     * @returns {HtmlElement}
     */
    setAttr(name, value, overwrite) {
        if (overwrite === false && this.el.hasAttribute(name)) {
            return this;
        }

        setAttr(this.el, {[name]: value});

        return this;
    }

    /**
     * Sets CSS style.
     *
     * @param {string} property The css property name.
     * @param {string} value The css property value.
     * @param {boolean} [overwrite = true] Whether to override existing property value with a new value.
     *
     * @returns {HtmlElement}
     */
    setCss(property, value, overwrite) {
        let cssStyles = htmlUtils.parseCssStyles(this.el.getAttribute('style'));

        if (overwrite === false && cssStyles.hasOwnProperty(property)) {
            return this;
        }

        setCss(this.el, {[property]: value});
        this._displayStyle = this.el.style.display;

        return this;
    }

    /**
     * Appends this element to the "parent" element.
     *
     * @param {HtmlElement|HTMLElement|jQuery} [parent = document.body]
     */
    appendTo(parent) {
        if (!parent) {
            parent = document.body;
        } else if (parent instanceof HtmlElement) {
            parent = parent.el;
        } else if (parent instanceof jQuery && parent.length > 0) {
            parent = parent[0];
        } else if (!(parent instanceof HTMLElement)) {
            throw new TypeError(`Invalid value ${parent} of "parent" argument.`);
        }

        parent.appendChild(this.el);

        return this;
    }

    /**
     * @returns {HtmlElement}
     */
    hide() {
        this.el.style.display = 'none';

        return this;
    }

    /**
     * Makes element visible. Sets CSS "display" property to value different then "none".
     * If an element before calling hide() function has specified CSS "display" property
     * then will be used, otherwise will be set empty value.
     *
     * @returns {HtmlElement}
     */
    show() {
        this.el.style.display = this._displayStyle !== 'none' ? this._displayStyle : '';

        return this;
    }

    empty() {
        this.$el.empty();
    }

    /**
     * Removes this element from DOM document.
     */
    remove() {
        this.$el.remove();
    }
}

/**
 * @param {*} element
 *
 * @returns {HTMLElement}
 */
function prepareElement(element) {
    if (element.length === 0) {
        throw new TypeError('Missing constructor argument "element".');
    }

    if (typeof element === 'string') {
        return document.createElement(element);
    }

    if (element instanceof jQuery) {
        return element[0];
    }

    if (element instanceof HTMLElement) {
        return element;
    }

    throw new TypeError(`The constructor argument "element" must be tag name, "HTMLElement" or "jQuery" object. ${element} given.`);
}

/**
 * @param {HTMLElement} element
 * @param {object} attributes
 */
function setAttr(element, attributes) {
    for (let name in attributes) {
        let value = prepareAttrValue(attributes[name]);

        if (value !== null) {
            element.setAttribute(name, value);
        }
    }
}

/**
 * @param {HTMLElement} element
 * @param {object} styles
 */
function setCss(element, styles) {
    for (let property in styles) {
        let value = prepareAttrValue(styles[property]);

        if (value !== null) {
            element.style[stringUtils.camelize(property)] = value;
        }
    }
}

/**
 * @param {*} value
 * @return {string|null}
 */
function prepareAttrValue(value) {
    if (value === undefined || value === null) {
        return null;
    }

    if (Array.isArray(value)) {
        value = value.join(' ');
    }

    return value.trim();
}
