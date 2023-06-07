import { htmlElementFactory } from "../elementsFactory";
import { htmlElementsFactory } from "../elementsFactory";
describe("htmlElementFactory", () => {
  const obj = {
    title: "hello world",
    body: "hello world people",
    comments: [{
        title: 'Comment title1',
        body: 'Comment body1'
    },{
        title: 'Comment title2',
        body: 'Comment body2'
    },{
        title: 'Comment title3',
        body: 'Comment body3'
    }],
  
  };
  test("Should render the comment prop array", () => {
    const element = htmlElementFactory(obj, "article", {
      title: {
        element: "h1",
        props: { className: "classTitle" },
        styleProps: { color: "blue" },
      },
      body: {
        element: "p",
        props: { className: "classBody" },
        styleProps: { color: "pink" },
      },
      comments: ()=>{
        
        return htmlElementsFactory(obj.comments,'div',{
            title: {element:'h3', props:{clasName: 'commentClass'}, styleProps:{fontSize:'30px'}},
            body: {element:'p', props:{clasName: 'bodyCommentClass'}, styleProps:{fontSize:'20px'}},
            
        },'section')}
    });
    if(element !== null)
    expect(element.children[2].tagName).toBe("SECTION");
  });

  test("Should return an html element given a parent in a string format", () => {
    const element = htmlElementFactory(obj, "article", {
      title: {
        element: "h1",
        props: { className: "classTitle" },
        styleProps: { color: "blue" },
      },
      body: {
        element: "p",
        props: { className: "classBody" },
        styleProps: { color: "pink" },
      },
     
    });

    expect(element?.tagName).toBe("ARTICLE");
  });
  test("Should return an html element given a parent in a element format", () => {
    const parent = {
      element: "section",
      props: { className: "ParentClass" },
      styleProps: { backgroundColor: "red" },
    };

    const element = htmlElementFactory(obj, parent, {
      title: {
        element: "h1",
        props: { className: "classTitle" },
        styleProps: { color: "blue" },
      },
      body: {
        element: "p",
        props: { className: "classBody" },
        styleProps: { color: "pink" },
      },
    });
    expect(element?.tagName).toBe("SECTION");
  });
  test("Should return an html element given a parent in a HTMLelement format", () => {
    const parent = document.createElement("section");

    const element = htmlElementFactory(obj, parent, {
      title: {
        element: "h1",
        props: { className: "classTitle" },
        styleProps: { color: "blue" },
      },
      body: {
        element: "p",
        props: { className: "classBody" },
        styleProps: { color: "pink" },
      },
    });
    expect(element?.tagName).toBe("SECTION");
  });
  test("Should return null given a wrong parent", () => {
    const parent = document.createElement("section");

    const element = htmlElementFactory({}, 'FDF', {
      title: {
        element: "h1",
        props: { className: "classTitle" },
        styleProps: { color: "blue" },
      },
      body: {
        element: "p",
        props: { className: "classBody" },
        styleProps: { color: "pink" },
      },
    });
    expect(element).toBe(null);
  });
});
