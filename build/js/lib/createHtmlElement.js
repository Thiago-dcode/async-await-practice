"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHtmlElement = void 0;
function createHtmlElement(element, properties) {
    const htmlElement = document.createElement(element);
    if (properties) {
        const propsToArray = Object.entries(properties);
        propsToArray.forEach((prop) => {
            const [key, value] = prop;
            Object.defineProperty(htmlElement, key, { value: value, writable: true });
        });
    }
    return htmlElement;
}
exports.createHtmlElement = createHtmlElement;
