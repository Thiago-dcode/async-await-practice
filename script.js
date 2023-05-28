const appDiv = document.getElementById("app");
const url = "https://jsonplaceholder.typicode.com/";

//Create elements

const app = () => {
  const createPostElements = (data,parentElement, childElements) => {
    const childElementsArr = Object.entries(childElements)
    let elements = []
      for (let i = 0; i < data.length; i++) {

          const parent = document.createElement(parentElement)

          childElementsArr.forEach(child =>{
            const [element, att] = child

            const childElement = document.createElement(element) 
            childElement.textContent = data[i][att]
            parent.appendChild(childElement)

        })
        elements.push(parent)
        
      }

      printElements('main',elements)

  };

  //Fetch data
  const fetchData = async (query) => {
    const res = await fetch(url + query);
    const data = await res.json();

    return data;
  };
  const getPosts = async () => {
    const [posts, comments] = await Promise.all([
      fetchData("posts"),
      fetchData("comments"),
    ]);

    const postWithComments = posts.reduce((acc, post) => {
      let commentsPost = [];

      for (let i = 0; i < comments.length; i++) {
        if (post.id === comments[i].postId) {
          commentsPost.push(comments[i]);
        }
      }

      return [
        ...acc,
        {
          ...post,
          ["comments"]: commentsPost,
        },
      ];
    }, []);



    createPostElements(postWithComments,'article',{

        'h1': 'title',
        'p': 'body'

    })

    console.log(postWithComments);
  };

  const printElements = (parent,elements) => {
    const main = document.createElement(parent);

    elements.forEach((element) => {
      main.appendChild(element);
    });

    appDiv.appendChild(main);
  };

  getPosts();
};

app();
