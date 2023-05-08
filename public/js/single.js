const elList1 = document.querySelector('.hero__list__single');
const elItem1 = document.querySelector('.hero__item__single');


async function getNew() {
	const res = await fetch(`http://localhost:5000/news/`);
	const data = await res.json();
	console.log(data);

	data.map((item) => {
		console.log(item);
		const elItem1 = document.createElement('div');
		elItem1.className = 'col-md-4 hero__item__single"';
		elItem1.innerHTML = `
                   
			<div class="card">
				<div class="card-body">
					<h5 class="card-title">
						${item.title}
					</h5>
					<p class="card-text">
						${item.desc}
					</p>
					<div class="blog-article__date mt-3">
						<time class="blog-article__time" datetime="2008-02-14"
							>19-aprel, 2023</time
						><span class="blog-article__view-count">93</span>
					</div>
				</div>
			</div>
						
                    `;

		elList1.appendChild(elItem1);
	});
}

getNew();
