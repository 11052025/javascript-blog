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
  const articles = document.querySelectorAll(optArticleSelector);

  for (let article of articles) {
    // Znajdź wrapper tagów (to <ul> z klasami .post-tags .list)
    const tagWrapper = article.querySelector(optArticleTagsSelector);

    // Zmienna na HTML linków do tagów
    let html = '';

    // Pobierz tagi z atrybutu data-tags i podziel na tablicę
    const articleTags = article.getAttribute('data-tags');
    const tagsArray = articleTags.split(' ');

    // Dla każdego tagu wygeneruj link i dodaj go do html
    for (let tag of tagsArray) {
      const linkHTML = `<li><a href="#tag-${tag}">${tag}</a></li>`;
      html += linkHTML;
    }

    // Wstaw wygenerowane linki do wrappera tagów
    tagWrapper.innerHTML = html;
  }
}

generateTags();









