'use strict';

function titleClickHandler(event){
  event.preventDefault(); // [DONE] blokuje domyślne zachowanie linków (np. przewijanie)
  const clickedElement = this;
  console.log('Link was clicked!');
  console.log('clickedElement:', clickedElement);

  /* [DONE] remove class 'active' from all article links */
  const activeLinks = document.querySelectorAll('.titles a.active');
  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */
  clickedElement.classList.add('active');

  /* [IN PROGRESS] remove class 'active' from all articles */

  /* get 'href' attribute from the clicked link */

  /* find the correct article using the selector (value of 'href' attribute) */

  /* add class 'active' to the correct article */
}

const links = document.querySelectorAll('.titles a');
for(let link of links){
  link.addEventListener('click', titleClickHandler);
}





