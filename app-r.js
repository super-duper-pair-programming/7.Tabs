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
const $tabs = document.querySelector('.tabs');

const render = tabsData => {
  // prettier-ignore
  $tabs.innerHTML = `
  <nav>
    ${tabsData.map((tabData, i) => `<div class="tab" data-index="${i}">${tabData.title}</div>`).join('')}
    <span class="glider"></span>
  </nav>
  
  ${tabsData.map((tabData, i) => `<div class="tab-content ${i === 0 ? 'active' : ''}">${tabData.content}</div>`).join('')}
  `;

  $tabs.style.setProperty('--tabs-length', tabsData.length);
  document.querySelector('.spinner').style.display = 'none';
};

const activateTab = tabIndex => {
  [...document.querySelectorAll('.tab-content')].forEach((tabContent, i) =>
    tabContent.classList.toggle('active', tabIndex === i)
  );

  // prettier-ignore
  document.querySelector('.glider').style.left = `${getComputedStyle($tabs).getPropertyValue('--tab-width') * tabIndex}px`;
};

$tabs.addEventListener('click', e => {
  if (!e.target.matches('.tab')) return;
  activateTab(+e.target.dataset.index);
});

fetchTabsData()
  .then(render)
  .catch(e => console.log(e));

// [변동사항]
// - querySelector 사용 최소화
// - render, activeTab 함수를 분리하여 fetchTabsData 이후 then 부분 간소화
