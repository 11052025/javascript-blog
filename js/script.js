// Selectors for DOM elements
const optArticleSelector = '.post';
const optTitleSelector = '.post-title';
const optTitleListSelector = '.titles';
const optArticleTagsSelector = '.post-tags .list';
const optArticleAuthorSelector = '.post-author';
const optTagsListSelector = '.tags.list';

// Tag cloud settings
const optCloudClassCount = 5;
const optCloudClassPrefix = 'tag-size-';

// Calculate min and max tag counts
function calculateTagsParams(tags) {
  const params = { max: 0, min: 999999 };
  for (let tag in tags) {
    params.max = Math.max(tags[tag], params.max);
    params.min = Math.min(tags[tag], params.min);
  }
  return params;
}

// Calculate tag class for tag cloud
function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  let classNumber = 1;

  if (normalizedMax > 0) {
    classNumber = Math.floor(normalizedCount / normalizedMax * (optCloudClassCount - 1) + 1);
  }

  return optCloudClassPrefix + classNumber;
}

// Generate list of article titles
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

// Generate tags for each article and tag cloud
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
    allTagsHTML += `<li><a href="#tag-${tag}" class="${tagClass}">${tag}</a></li>`;
  }

  const tagList = document.querySelector(optTagsListSelector);
  tagList.innerHTML = allTagsHTML;
}

generateTags();

// Handle tag click
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

// Add click listeners to tags
function addClickListenersToTags() {
  const links = document.querySelectorAll('a[href^="#tag-"]');
  for (let link of links) {
    link.addEventListener('click', tagClickHandler);
  }
}

addClickListenersToTags();

// Generate authors for each article
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

// Handle author click
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

// Add click listeners to authors
function addClickListenersToAuthors() {
  const authorLinks = document.querySelectorAll('a[href^="#author-"]');
  for (let link of authorLinks) {
    link.addEventListener('click', authorClickHandler);
  }
}

addClickListenersToAuthors();




















