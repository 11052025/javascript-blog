// ======================
// SETTINGS / CONSTANTS
// ======================

// Selectors for DOM elements
const optArticleSelector = '.post',
      optTitleSelector = '.post-title',
      optTitleListSelector = '.titles',
      optArticleTagsSelector = '.post-tags .list',
      optArticleAuthorSelector = '.post-author',
      optTagsListSelector = '.tags.list'; // Sidebar tag list selector

// Constants for tag cloud classes
const optCloudClassCount = 5,          // Number of tag-size classes
      optCloudClassPrefix = 'tag-size-'; // Class prefix for tag in cloud

// ======================
// HELPER FUNCTIONS
// ======================

// Function to calculate min and max number of tag occurrences
function calculateTagsParams(tags) {
  const params = { max: 0, min: 999999 };
  for (let tag in tags) {
    console.log(tag + ' is used ' + tags[tag] + ' times');
    params.max = Math.max(tags[tag], params.max);
    params.min = Math.min(tags[tag], params.min);
  }
  return params;
}

// Function to calculate class for a tag in tag cloud
function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  let classNumber = 1;

  if (normalizedMax > 0) {
    classNumber = Math.floor(normalizedCount / normalizedMax * (optCloudClassCount - 1) + 1);
  }

  return optCloudClassPrefix + classNumber;
}

// ======================
// MAIN FUNCTION: GENERATE TITLE LINKS
// ======================

function generateTitleLinks(customSelector = '') {
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  let html = '';

  for (let article of articles) {
    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    const linkHTML = `<li><a href="#${articleId}"><span>${articleTitle}</span></a></li>`;
    html += linkHTML;
  }

  titleList.innerHTML = html;

  // Add click event listeners to each article link
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

// Call function to generate title links on page load
generateTitleLinks();

// ======================
// MAIN FUNCTION: GENERATE TAGS AND TAG CLOUD
// ======================

function generateTags() {
  let allTags = {};
  const articles = document.querySelectorAll(optArticleSelector);

  for (let article of articles) {
    const tagWrapper = article.querySelector(optArticleTagsSelector);
    let html = '';

    const articleTags = article.getAttribute('data-tags');
    const tagsArray = articleTags.split(' ');

    for (let tag of tagsArray) {
      const linkHTML = `<li><a href="#tag-${tag}">${tag}</a></li>`;
      html += linkHTML;

      if (!allTags[tag]) allTags[tag] = 1;
      else allTags[tag]++;
    }

    tagWrapper.innerHTML = html;
  }

  const tagsParams = calculateTagsParams(allTags);
  let allTagsHTML = '';

  for (let tag in allTags) {
    const tagClass = calculateTagClass(allTags[tag], tagsParams);
    allTagsHTML += `<li><a href="#tag-${tag}" class="${tagClass}">${tag} (${allTags[tag]})</a></li>`;
  }

  const tagList = document.querySelector(optTagsListSelector);
  tagList.innerHTML = allTagsHTML;
}

// Call function to generate tags
generateTags();

// ======================
// TAG EVENT HANDLER
// ======================

function tagClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;

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

// Add click listeners to all tag links
function addClickListenersToTags() {
  const links = document.querySelectorAll('a[href^="#tag-"]');
  for (let link of links) {
    link.addEventListener('click', tagClickHandler);
  }
}

// Call function to add tag listeners
addClickListenersToTags();

// ======================
// GENERATE AUTHORS
// ======================

function generateAuthors() {
  const articles = document.querySelectorAll(optArticleSelector);

  for (let article of articles) {
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    const author = article.getAttribute('data-author');
    const authorHTML = `<a href="#author-${author}">${author}</a>`;
    authorWrapper.innerHTML = authorHTML;
  }
}

// Call function to generate authors
generateAuthors();

// ======================
// AUTHOR EVENT HANDLER
// ======================

function authorClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;

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

// Add click listeners to all author links
function addClickListenersToAuthors() {
  const authorLinks = document.querySelectorAll('a[href^="#author-"]');
  for (let link of authorLinks) {
    link.addEventListener('click', authorClickHandler);
  }
}

// Call function to add author listeners
addClickListenersToAuthors();


















