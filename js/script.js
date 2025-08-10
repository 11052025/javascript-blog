const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author';

// Generate list of article titles with optional custom selector
function generateTitleLinks(customSelector = '') {
  console.log('customSelector:', customSelector);
  console.log('Combined selector:', optArticleSelector + customSelector);
  
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  // Find all articles matching the selector
  const articles = document.querySelectorAll(optArticleSelector + customSelector);

  let html = '';

  // Loop: for each article
  for (let article of articles) {
    // Get article id
    const articleId = article.getAttribute('id');

    // Get article title
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    // Create HTML link
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

    // Add generated link to html variable
    html += linkHTML;
  }

  // Insert HTML into title list
  titleList.innerHTML = html;

  // Add click listeners to generated links
  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', function(event) {
      event.preventDefault();

      // Remove active class from current article
      const activeArticle = document.querySelector('.post.active');
      if (activeArticle) activeArticle.classList.remove('active');

      // Remove active class from current link
      const activeLink = document.querySelector('.titles a.active');
      if (activeLink) activeLink.classList.remove('active');

      // Add active class to clicked link
      this.classList.add('active');

      // Get target article id
      const articleId = this.getAttribute('href').substring(1);

      // Find target article by id and activate it
      const targetArticle = document.getElementById(articleId);
      if (targetArticle) targetArticle.classList.add('active');
    });
  }
}

generateTitleLinks();

// Generate tag links for each article
function generateTags() {
  const articles = document.querySelectorAll(optArticleSelector);

  for (let article of articles) {
    const tagWrapper = article.querySelector(optArticleTagsSelector);
    let html = '';

    const articleTags = article.getAttribute('data-tags');
    const tagsArray = articleTags.split(' ');

    for (let tag of tagsArray) {
      const linkHTML = `<li><a href="#tag-${tag}">${tag}</a></li>`;
      html += linkHTML;
    }

    tagWrapper.innerHTML = html;
  }
}

generateTags();

// Handle click on a tag link
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

// Add click listeners to all tag links
function addClickListenersToTags() {
  const links = document.querySelectorAll('a[href^="#tag-"]');
  for (let link of links) {
    link.addEventListener('click', tagClickHandler);
  }
}

addClickListenersToTags();

// Generate author link for each article
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

// Handle click on an author link
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

// Add click listeners to all author links
function addClickListenersToAuthors() {
  const authorLinks = document.querySelectorAll('a[href^="#author-"]');
  for (let link of authorLinks) {
    link.addEventListener('click', authorClickHandler);
  }
}

addClickListenersToAuthors();












