// Selectors for DOM elements
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list'; // Selector for tag list in sidebar

// Function: generate list of article titles (with optional filtering)
function generateTitleLinks(customSelector = '') {
  console.log('customSelector:', customSelector);
  console.log('Combined selector:', optArticleSelector + customSelector);

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  // Find all articles matching the combined selector
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  let html = '';

  for (let article of articles) {
    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    const linkHTML = `<li><a href="#${articleId}"><span>${articleTitle}</span></a></li>`;
    html += linkHTML;
  }

  titleList.innerHTML = html;

  // Add click listeners for article title links
  const links = document.querySelectorAll('.titles a');
  for (let link of links) {
    link.addEventListener('click', function(event) {
      event.preventDefault();

      const activeArticle = document.querySelector('.post.active');
      if (activeArticle) activeArticle.classList.remove('active');

      const activeLink = document.querySelector('.titles a.active');
      if (activeLink) activeLink.classList.remove('active');

      this.classList.add('active');

      const articleId = this.getAttribute('href').substring(1);
      const targetArticle = document.getElementById(articleId);
      if (targetArticle) targetArticle.classList.add('active');
    });
  }
}

generateTitleLinks();

// Function: generate tags for each article and collect unique tags
function generateTags() {
  let allTags = [];

  const articles = document.querySelectorAll(optArticleSelector);
  for (let article of articles) {
    const tagWrapper = article.querySelector(optArticleTagsSelector);
    let html = '';

    const articleTags = article.getAttribute('data-tags');
    const tagsArray = articleTags.split(' ');

    for (let tag of tagsArray) {
      const linkHTML = `<li><a href="#tag-${tag}">${tag}</a></li>`;
      html += linkHTML;

      if (allTags.indexOf(linkHTML) === -1) {
        allTags.push(linkHTML);
      }
    }

    tagWrapper.innerHTML = html;
  }

  // Insert unique tags into sidebar
  const tagList = document.querySelector(optTagsListSelector);
  tagList.innerHTML = allTags.join(' ');
}

generateTags();

// Event handler: click on tag link
function tagClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;

  const href = clickedElement.getAttribute('href');
  const tag = href.replace('#tag-', '');

  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
  for (let activeTag of activeTags) {
    activeTag.classList.remove('active');
  }

  const tagLinks = document.querySelectorAll(`a[href="${href}"]`);
  for (let tagLink of tagLinks) {
    tagLink.classList.add('active');
  }

  generateTitleLinks(`[data-tags~="${tag}"]`);
}

// Add event listeners to all tag links
function addClickListenersToTags() {
  const links = document.querySelectorAll('a[href^="#tag-"]');
  for (let link of links) {
    link.addEventListener('click', tagClickHandler);
  }
}

addClickListenersToTags();

// Function: generate author link for each article
function generateAuthors() {
  const articles = document.querySelectorAll(optArticleSelector);

  for (let article of articles) {
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    const author = article.getAttribute('data-author');
    const authorHTML = `<a href="#author-${author}">${author}</a>`;
    authorWrapper.innerHTML = authorHTML;
  }
}

generateAuthors();

// Event handler: click on author link
function authorClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;

  const href = clickedElement.getAttribute('href');
  const author = href.replace('#author-', '');

  const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');
  for (let link of activeAuthorLinks) {
    link.classList.remove('active');
  }

  const authorLinks = document.querySelectorAll(`a[href="${href}"]`);
  for (let link of authorLinks) {
    link.classList.add('active');
  }

  generateTitleLinks(`[data-author="${author}"]`);
}

// Add event listeners to all author links
function addClickListenersToAuthors() {
  const authorLinks = document.querySelectorAll('a[href^="#author-"]');
  for (let link of authorLinks) {
    link.addEventListener('click', authorClickHandler);
  }
}

addClickListenersToAuthors();














