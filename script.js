const posts = [
  { img: "posts/1.jpg", id: "1" },
  { img: "posts/2.jpg", id: "2" },
  { img: "posts/3.png", id: "3" },
  // add as many as you want
];

let current = 0;
let votes = JSON.parse(localStorage.getItem('schizoVotes') || '{}');

function loadPost() {
  const post = posts[current];
  document.getElementById('screenshot').src = post.img;
  document.querySelectorAll('.options button').forEach(b => {
    b.onclick = () => vote(post.id, b.dataset.vote);
  });
}

function vote(postId, choice) {
  votes[postId] = choice;
  localStorage.setItem('schizoVotes', JSON.stringify(votes));
  next();
}

function next() {
  current++;
  if (current >= posts.length) showResults();
  else loadPost();
}

function showResults() {
  document.getElementById('poll').classList.add('hidden');
  document.getElementById('results').classList.remove('hidden');
  const list = document.getElementById('results-list');
  list.innerHTML = '';
  posts.forEach(p => {
    const v = votes[p.id] || '—no votes yet—';
    const div = document.createElement('div');
    div.className = 'result-item';
    div.innerHTML = `<img src="${p.img}" style="max-height:200px;margin:10px auto;display:block;"><br><strong>${v}</strong>`;
    list.appendChild(div);
  });
}

document.getElementById('next').onclick = next;
document.getElementById('new-poll').onclick = () => {
  current = 0;
  document.getElementById('results').classList.add('hidden');
  document.getElementById('poll').classList.remove('hidden');
  loadPost();
};

// start
loadPost();
if (Object.keys(votes).length === posts.length) showResults();