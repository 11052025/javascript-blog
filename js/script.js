const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks() {
  console.log('generateTitleLinks działa');
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  const articles = document.querySelectorAll(optArticleSelector);

  for (let article of articles) {
    const articleId = article.getAttribute('id');
    const titleElement = article.querySelector(optTitleSelector);
    const articleTitle = titleElement.innerHTML;

    const linkHTML = `<li><a href="#${articleId}"><span>${articleTitle}</span></a></li>`;
    titleList.innerHTML += linkHTML;
  }
}

function addClickListenersToTitleLinks() {
  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', function(event) {
      event.preventDefault();

      // Usuwamy active z obecnie aktywnego artykułu i linku
      const activeArticle = document.querySelector('.post.active');
      if (activeArticle) activeArticle.classList.remove('active');

      const activeLink = document.querySelector('.titles a.active');
      if (activeLink) activeLink.classList.remove('active');

      // Dodajemy active do klikniętego linku
      this.classList.add('active');

      // Pobieramy ID artykułu z href
      const articleId = this.getAttribute('href').substring(1);
      const targetArticle = document.getElementById(articleId);

      if (targetArticle) targetArticle.classList.add('active');
    });
  }
}

// Wywołujemy najpierw generowanie linków, potem dodajemy obsługę kliknięć
generateTitleLinks();
addClickListenersToTitleLinks();

function processArticleById(id) {
  const articleId = id;
  const article = document.getElementById(articleId);

  if (article) {
    console.log('Przetwarzam artykuł o ID:', articleId);
    // inne operacje
  } else {
    console.log('Nie znaleziono artykułu o ID:', articleId);
  }
}

// Przykładowe wywołanie
processArticleById('article-1');






