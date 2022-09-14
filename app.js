// fetch fake data
// prettier-ignore
const fetchTabsData = () => new Promise(resolve => {
  setTimeout(() => resolve([
    {
      title: 'HTML',
      content: `HTML(HyperText Markup Language) is the most basic building block of the Web. It describes and defines the content of a webpage along with the basic layout of the webpage. Other technologies besides HTML are generally used to describe a web page's appearance/presentation(CSS) or functionality/ behavior(JavaScript).`,
    },
    {
      title: 'CSS',
      content: `Cascading Style Sheets(CSS) is a stylesheet language used to describe the presentation of a document written in HTML or XML (including XML dialects such as SVG, MathML or XHTML). CSS describes how elements should be rendered on screen, on paper, in speech, or on other media.`,
    },
    {
      title: 'JavaScript',
      content: `JavaScript(JS) is a lightweight interpreted or JIT-compiled programming language with first-class functions. While it is most well-known as the scripting language for Web pages, many non-browser environments also use it, such as Node.js, Apache CouchDB and Adobe Acrobat. JavaScript is a prototype-based, multi-paradigm, dynamic language, supporting object-oriented, imperative, and declarative (e.g. functional programming) styles.`,
    },
  ]), 1000);
});

// Do something!
document.querySelector('.tabs').innerHTML = `<nav></nav>`;

fetchTabsData()
  .then(tabsData => {
    tabsData.forEach((tabData, i) => {
      document.querySelector('nav').innerHTML += `<div class="tab" data-index="${i}">${tabData.title}</div>`;
      document.querySelector('.tabs').innerHTML += `
      <div class="tab-content ${i === 0 ? 'active' : ''}">${tabData.content}</div>
      `;
    });
    document.querySelector('nav').innerHTML += `<span class="glider"></span>`;
    document.querySelector('.spinner').style.display = 'none';
    document.querySelector('.tabs').style.setProperty('--tabs-length', tabsData.length);
    document.querySelector('nav').addEventListener('click', e => {
      [...document.querySelectorAll('.tab-content')].forEach((tabContent, i) =>
        tabContent.classList.toggle('active', +e.target.dataset.index === i)
      );
      document.querySelector('.glider').style.left = `${
        getComputedStyle(document.querySelector('.tabs')).getPropertyValue('--tab-width') * +e.target.dataset.index
      }px`;
    });
  })
  .catch(e => console.log(e));
