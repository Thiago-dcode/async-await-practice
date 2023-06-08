import { htmlElementsFactory } from "../elementsFactory";

describe("htmlElementsFactory function", () => {
  const data = [
    {
      title: "hello world",
      body: "hello all people of this world",
      comments: [
        { title: "Comment title ", body: "Comment body " },
        { title: "Comment title ", body: "Comment body " },
        { title: "Comment title ", body: "Comment body " },
      ],
    },
    {
      title: "hello world 1",
      body: "hello all people of this world 1",
      comments: [
        { title: "Comment title 1", body: "Comment body 1" },
        { title: "Comment title 1", body: "Comment body 1" },
        { title: "Comment title 1", body: "Comment body 1" },
      ],
    },
    {
      title: "hello world 2",
      body: "hello all people of this world 2",
      comments: [
        { title: "Comment title 2", body: "Comment body 2" },
        { title: "Comment title 2", body: "Comment body 2" },
        { title: "Comment title 2", body: "Comment body 2" },
      ],
    },
  ];
  const parentStyle = {
    backgroundColor: "red",
  };

  const dataElements = htmlElementsFactory(
    data,
    { element: "article", props: {}, styleProps: parentStyle },
    {
      title: {
        element: "h1",
        props: { className: "style" },
        styleProps: {
          color: "yellow",
        },
      },
      body: {
        element: "p",
        props: { className: "style1" },
        styleProps: {
          color: "blue",
        },
      },
      comments: [{element:'div',props:{},styleProps:{'backgroundColor':'black'}}, {
        'title': {element: 'h3', props:{className: 'commentTitleClass'},styleProps:{'fontSize':'25px'}},
        'body': {element: 'p', props:{className: 'commentBodyClass'},styleProps:{'fontSize':'15px'}}
      
       
      },{element:'section',props:{innerHTML: '<h2>Comment section: </h2>'},styleProps:{'backgroundColor':'black'}}]
    }
  );
  test('Should render correctly the array property of the object',()=>{

    expect(dataElements[0].children[2].tagName).toBe('SECTION')

  })

  test("Should return a empty array with wrong first argument", () => {
    const dataElements = htmlElementsFactory(
      [],
      { element: "article", props: {}, styleProps: parentStyle },
      {
        title: {
          element: "h1",
          props: { className: "style" },
          styleProps: {
            color: "yellow",
          },
        },
        body: {
          element: "p",
          props: { className: "style1" },
          styleProps: {
            color: "blue",
          },
        },
      }
    );

    expect(dataElements).toStrictEqual([]);
  });

  test("Should return a empty array with wrong second argument", () => {
    const dataElements = htmlElementsFactory(
      [],
      { element: "fdf", props: {}, styleProps: parentStyle },
      {
        title: {
          element: "h1",
          props: { className: "style" },
          styleProps: {
            color: "yellow",
          },
        },
        body: {
          element: "p",
          props: { className: "style1" },
          styleProps: {
            color: "blue",
          },
        },
      }
    );

    expect(dataElements).toStrictEqual([]);
  });
  test("should return an array of htmlElements", () => {
    if (Array.isArray(dataElements)) {
      expect(dataElements[0].tagName).toBe("ARTICLE");
      expect(dataElements[1].tagName).toBe("ARTICLE");
    }
  });
  test("The parent element given, should have the child element given", () => {
    if (Array.isArray(dataElements)) {
      expect(dataElements[0].children[0].tagName).toBe("H1");
      expect(dataElements[1].children[0].tagName).toBe("H1");
    }
  });
  test("Should return a Html Element with a wrapper parent given in a string format", () => {
    const dataElementsWithWrapper = htmlElementsFactory(
      data,
      { element: "article", props: {}, styleProps: parentStyle },
      {
        title: {
          element: "h1",
          props: { className: "style" },
          styleProps: {
            color: "yellow",
          },
        },
        body: {
          element: "p",
          props: { className: "style1" },
          styleProps: {
            color: "blue",
          },
        },
      },
      "main"
    );
    expect(dataElementsWithWrapper[0] instanceof HTMLElement).toBe(true);
  });
  test("Should return an array with one position with a Html Element with a wrapper parent given in element format ", () => {
    const dataElementsWithWrapper = htmlElementsFactory(
      data,
      { element: "article", props: {}, styleProps: parentStyle },
      {
        title: {
          element: "h1",
          props: { className: "style" },
          styleProps: {
            color: "yellow",
          },
        },
        body: {
          element: "p",
          props: { className: "style1" },
          styleProps: {
            color: "blue",
          },
        },
      },
      {
        element: "main",
        props: { className: "mainClass" },
        styleProps: { backgroundColor: "red" },
      }
    );
    expect(dataElementsWithWrapper[0] instanceof HTMLElement).toBe(true);
  });
  test("Should return a Html Element with a wrapper parent given in html element format ", () => {
    const dataElementsWithWrapper = htmlElementsFactory(
      data,
      { element: "article", props: {}, styleProps: parentStyle },
      {
        title: {
          element: "h1",
          props: { className: "style" },
          styleProps: {
            color: "yellow",
          },
        },
        body: {
          element: "p",
          props: { className: "style1" },
          styleProps: {
            color: "blue",
          },
        },
      },
      document.createElement("main")
    );
    expect(dataElementsWithWrapper[0] instanceof HTMLElement).toBe(true);
  });
});
