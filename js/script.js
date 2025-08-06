const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list';

function generateTitleLinks() {
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  const articles = document.querySelectorAll(optArticleSelector);

  let html = '';

  for (let article of articles) {
    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    html = html + linkHTML;
  }

  titleList.innerHTML = html;

  // Dopiero teraz dodajemy event listenery do świeżo wygenerowanych linków
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

// Wywołujemy funkcję generującą linki wraz z przypięciem event listenerów
generateTitleLinks();

function generateTags() {
  /* find all articles */
  const articles = document.querySelectorAll('.post');

  /* START LOOP: for every article: */
  for (let article of articles) {

    /* find tags wrapper */
    const tagWrapper = article.querySelector(optArticleTagsSelector);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const tags = article.getAttribute('data-tags');

    /* split tags into array */
    const tagsArray = tags.split(' ');

    /* START LOOP: for each tag */
    for (let tag of tagsArray) {

      /* generate HTML of the link */
      const linkHTML = `<li><a href="#tag-${tag}">${tag}</a></li>`;

      /* add generated code to html variable */
      html += linkHTML;
    }
    /* END LOOP: for each tag */

    /* insert HTML of all the links into the tags wrapper */
    tagWrapper.innerHTML = html;
  }
  /* END LOOP: for every article: */
}

generateTags();











