"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createHtmlElement_1 = require("./createHtmlElement");
describe('CreateHtmlElement function', () => {
    test('should return a html element', () => {
        const tag = 'div';
        const htmlElement = (0, createHtmlElement_1.createHtmlElement)(tag);
        expect(htmlElement.tagName).toBe(tag.toUpperCase());
        expect(htmlElement instanceof HTMLElement).toBe(true);
    });
    test('should assign the props passed to the html element ', () => {
        const tag = 'div';
        const htmlElement = (0, createHtmlElement_1.createHtmlElement)(tag, {
            'textContent': 'hello world'
        });
        expect(htmlElement.textContent).toBe('hello world');
    });
});
