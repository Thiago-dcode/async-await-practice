import { createHtmlElement } from "../elementsFactory";
describe('CreateHtmlElement function', () => {
    test('should return a html element', () => {
        const tag = 'div';
        const htmlElement = createHtmlElement(tag);
        expect(htmlElement.tagName).toBe(tag.toUpperCase());
        expect(htmlElement instanceof HTMLElement).toBe(true);
    });
    test('should return the prop passed to the html element ', () => {
        const tag = 'div';
        const htmlElement = createHtmlElement(tag, {
            'textContent': 'hello world'
        });
        expect(htmlElement.textContent).toBe('hello world');
    });
    test('should return the props passed to the html element ', () => {
        const tag = 'div';
        const htmlElement = createHtmlElement(tag, {
            'textContent': 'hello world',
            'className': 'className'
        });
        expect(htmlElement.textContent).toBe('hello world');
        expect(htmlElement.className).toBe('className');
    });
    test('Should style the html element given', () => {
        const style = {
            'backgroundColor': 'red',
            'fontSize': '20px'
        };
        const h1 = createHtmlElement('h1', {}, style);
        expect(h1.style.backgroundColor).toBe(style.backgroundColor);
        expect(h1.style.fontSize).toBe(style.fontSize);
    });
});
