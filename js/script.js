// Selectors for DOM elements
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list'; // Sidebar tag list selector

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

    // Create HTML for the article link
    const linkHTML = `<li><a href="#${articleId}"><span>${articleTitle}</span></a></li>`;
    html += linkHTML;
  }

  // Insert links into the title list
  titleList.innerHTML = html;

  // Add click listeners for each article link
  const links = document.querySelectorAll('.titles a');
  for (let link of links) {
    link.addEventListener('click', function(event) {
      event.preventDefault();

      // Remove active class from currently active article
      const activeArticle = document.querySelector('.post.active');
      if (activeArticle) activeArticle.classList.remove('active');

      // Remove active class from currently active link
      const activeLink = document.querySelector('.titles a.active');
      if (activeLink) activeLink.classList.remove('active');

      // Add active class to clicked link
      this.classList.add('active');

      // Show the corresponding article
      const articleId = this.getAttribute('href').substring(1);
      const targetArticle = document.getElementById(articleId);
      if (targetArticle) targetArticle.classList.add('active');
    });
  }
}

generateTitleLinks();

// Function: generate tags for each article and count tag occurrences
function generateTags() {
  /* Create a new object allTags to store tag counts */
  let allTags = {};

  // Loop through each article
  const articles = document.querySelectorAll(optArticleSelector);
  for (let article of articles) {
    const tagWrapper = article.querySelector(optArticleTagsSelector);
    let html = '';

    // Get tags from data-tags attribute
    const articleTags = article.getAttribute('data-tags');
    const tagsArray = articleTags.split(' ');

    // Loop through each tag
    for (let tag of tagsArray) {
      const linkHTML = `<li><a href="#tag-${tag}">${tag}</a></li>`;
      html += linkHTML;

      // Count tag occurrences in allTags object
      if (!allTags[tag]) {
        allTags[tag] = 1; // If tag does not exist yet, set count to 1
      } else {
        allTags[tag]++;   // If tag exists, increment its count
      }
    }

    // Insert tags HTML into the article
    tagWrapper.innerHTML = html;
  }

  // Temporarily disable inserting tags into sidebar
  // tagList.innerHTML = allTags.join(' ');

  // Log object to check tag counts
  console.log(allTags);
}

generateTags();

// Event handler: when a tag link is clicked
function tagClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;

  // Get tag name from href
  const href = clickedElement.getAttribute('href');
  const tag = href.replace('#tag-', '');

  // Remove active class from all active tag links
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
  for (let activeTag of activeTags) {
    activeTag.classList.remove('active');
  }

  // Add active class to all matching tag links
  const tagLinks = document.querySelectorAll(`a[href="${href}"]`);
  for (let tagLink of tagLinks) {
    tagLink.classList.add('active');
  }

  // Filter articles by selected tag
  generateTitleLinks(`[data-tags~="${tag}"]`);
}

// Function: add click listeners to all tag links
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

// Event handler: when an author link is clicked
function authorClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;

  // Get author name from href
  const href = clickedElement.getAttribute('href');
  const author = href.replace('#author-', '');

  // Remove active class from all active author links
  const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');
  for (let link of activeAuthorLinks) {
    link.classList.remove('active');
  }

  // Add active class to all matching author links
  const authorLinks = document.querySelectorAll(`a[href="${href}"]`);
  for (let link of authorLinks) {
    link.classList.add('active');
  }

  // Filter articles by selected author
  generateTitleLinks(`[data-author="${author}"]`);
}

// Function: add click listeners to all author links
function addClickListenersToAuthors() {
  const authorLinks = document.querySelectorAll('a[href^="#author-"]');
  for (let link of authorLinks) {
    link.addEventListener('click', authorClickHandler);
  }
}

addClickListenersToAuthors();















