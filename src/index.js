import Notiflix from 'notiflix';

const onImage = document.querySelector('.gallery');
const onForm = document.querySelector('.search-form');
const onInput = document.querySelector('[type = text]');
const axios = require('axios').default;
const onloadMore = document.querySelector('.load-more');
let pageMore = 1;

onloadMore.addEventListener('click', searcheImage);
onForm.addEventListener('submit', searcheImage);

// async function getUser() {
//   try {
//     const response = await axios.get('/user?ID=12345');
//     console.log(response);
//   } catch (error) {
//     console.error(error);
//   }
// }

function searcheImage(e) {
  //   onloadMore.style.display = 'none';
  e.preventDefault();
  const arrInput = onInput.value;
  fetch(
    `https://pixabay.com/api/?key=19462317-9864fc13c2867a4042c7cafcd&q=${arrInput}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${pageMore}`
  )
    .then(response => response.json())
    .then(data => {
      onImage.innerHTML = '';
      arrImage(data.hits);
    })
    .then(() => pageMore++)
    .catch(error => {
      if (error) showError();
    });
}

function cardImage({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  const createImage = `<div class="photo-card">
  <img src="${largeImageURL}" alt="" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>${likes}
    </p>
    <p class="info-item">
      <b>Views</b>${views}
    </p>
    <p class="info-item">
      <b>Comments</b>${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>${downloads}
    </p>
  </div>
</div>;
`;

  onImage.insertAdjacentHTML('beforeend', createImage);
}

function arrImage(obj) {
  for (const i of obj) {
    cardImage(i);
  }
}
function showError() {
  Notiflix.Report.failure(
    'Sorry, there are no images matching your search query.',
    'Please try again.'
  );
}
