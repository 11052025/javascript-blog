'use strict';

function titleClickHandler(event){
  console.log('Link was clicked!');

  /* remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');
  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* add class 'active' to the clicked link */
  event.preventDefault(); // zapobiega domyślnemu zachowaniu linka (skok do elementu)
  const clickedLink = event.currentTarget;
  clickedLink.classList.add('active');

  /* remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('article.active');
  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */
  const articleSelector = clickedLink.getAttribute('href');

  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);

  /* add class 'active' to the correct article */
  if(targetArticle){
    targetArticle.classList.add('active');
  }
}

const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}



