 let openpro = document.querySelectorAll('.pro-card');


    openpro.forEach(card => {

      card.addEventListener('click', (e) => {

        if (!(e.target.classList.contains('pro-img') || e.target.classList.contains('shop'))) return;

        let img = card.querySelector('.pro-img').src;
        let title = card.querySelector('.pro-title').textContent;
        let des = card.querySelector('.pro-des').textContent;
        let star = card.querySelector('.pro-star').src;
        let rat = card.querySelector('.pro-rat').textContent;
        let price = card.querySelector('.pro-price').textContent.replace('$', '');

        localStorage.setItem('selected', JSON.stringify({ img, title, des, star, rat, price }));

        location.href = 'pro.html';
      });
    });