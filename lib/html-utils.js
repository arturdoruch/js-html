/*
 * (c) Artur Doruch <arturdoruch@interia.pl>
 */

import stringUtils from '@arturdoruch/util/lib/string-utils.js';

const selfClosingTags =  {
    area: '', base: '', br: '', col: '', command: '', embed: '', hr: '', img: '', input: '',
    keygen: '', link: '', meta: '', param: '', source: '', track: '', wbr: ''
};

export default {
    /**
     * Checks if HTML tag is self-closing.
     *
     * @param {string} tagName
     *
     * @returns {boolean}
     */
    isTagSelfClosing(tagName) {
        return selfClosingTags.hasOwnProperty(tagName.toLowerCase());
    },

    /**
     * Parses CSS styles.
     *
     * @param {string} styles CSS styles to parse, like "width: 100px; height: 30px".
     * @param {boolean} [jsFormat = true] Whether to format CSS property name to camelcase notation (used by JavaScript).
     *
     * @returns {{}} Object with pairs "property: value".
     */
    parseCssStyles: function (styles, jsFormat = true) {
        let output = {},
            property,
            styleParts;

        if (!styles) {
            return output;
        }

        styles = styles.split(';');

        for (let style of styles) {
            styleParts = style.split(':');
            property = styleParts[0].trim();

            if (!style[1]) {
                continue;
            }

            if (jsFormat !== false) {
                property = stringUtils.camelize(property);
            }

            output[property] = styleParts[1].trim();
        }

        return output;
    }
}
