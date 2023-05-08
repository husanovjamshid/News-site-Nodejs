const elList = document.querySelector('.hero__list');
const elItem = document.querySelector('.hero__item');

async function getNews() {
	const res = await fetch('http://localhost:5000/news');
	const data = await res.json();
	console.log(data);

	data.map((item) => {
    
		const elItem = document.createElement('div');
		elItem.className = 'col-md-4 hero__item "';
		elItem.innerHTML = `
                   
        <a href='/single/${item.id}' class="card">
            <div class="card-body">
                <h5 class="card-title">
                    ${item.title}
                </h5>
                <p class="card-text">
                    ${item.desc}
                </p>
                <div class="blog-article__date mt-3">
                    <time class="blog-article__time" 
                >${new Date(item.date).getDate()}-0${new Date(item.date).getMonth()}-${new Date(
			item.date,
		).getFullYear()}</time
                    ><span class="blog-article__view-count">93</span>
                </div>
            </div>
        </a>
						
                    `;

		elList.appendChild(elItem);
	});
}

getNews();
