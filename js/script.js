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
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log(linkHTML);

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








