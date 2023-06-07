import { addPropsHtmlElement } from "../elementsFactory";
describe('AddPropsHtmlElement function', () => {
    test('should assing and return a prop to html element given', () => {
        const h1 = document.createElement('h1');
        addPropsHtmlElement(h1, {
            'textContent': 'hello world',
            'className': 'class'
        });
        expect(h1.textContent).toBe('hello world');
        expect(h1.className).toBe('class');
    });
});
