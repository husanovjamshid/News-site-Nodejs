const token = localStorage.getItem('token');
console.log(token);
if (!token) {
	location.replace('/login');
}

// async function postLogin() {
// 	const res = await fetch('http://localhost:5000/admin', {
// 		method: 'GET',
// 		headers: {
// 			'Content-Type': 'application/json',
// 			Authorization: token,
// 		},
// 	});
// 	const data = await res.json();
// 	console.log(data);
// }

// postLogin();

////////////////////////////////////////////////////

let openModal = document.querySelector('.open-modal');
let elModal = document.querySelector('.modals');
let closeModal = document.querySelector('.close-modal');
let closeEditModal = document.querySelector('.edit-modal-close');
let elForm = document.querySelector('.js-form');
let elEditForm = document.querySelector('.js-edit-form');
let elName = document.querySelector('.pro-name');
let elDesc = document.querySelector('.pro-desc');
let elList = document.querySelector('.js-list');
let elEditModal = document.querySelector('.editModal');
// let elTemplate = document.querySelector(".js-template").content;

// let localData = localStorage.getItem("token");

// if (!localData) {
//   location.replace("register.html");
// }

openModal.addEventListener('click', (evt) => {
	elModal.classList.remove('d-none');

	elModal.classList.add('modalOpacity');
});

closeModal.addEventListener('click', (evt) => {
	elModal.classList.add('d-none');
});

closeEditModal.addEventListener('click', (evt) => {
	elEditModal.classList.add('d-none');
});

async function render() {
	elList.innerHTML = '';
	await fetch('http://localhost:5000/news', {
		headers: {
			//   Authorization: localData,
		},
	})
		.then((res) => res.json())
		.then((data) => {
			if (data) {
				data.forEach((item) => {
					// console.log(item);
					const elItem = document.createElement('div');
					elItem.className = 'col-md-4 hero__item';
					elItem.innerHTML = `
				
					<div class="card">
						<div class="card-body">
							<h5 class="card-title">
								${item.title}
							</h5>
							<p class="card-text">
								${item.desc}
							</p>
							<div class="blog-article__date mt-3">
								<time class="blog-article__time" 
									>${new Date(item.date).getDate()}-${new Date(item.date).getMonth()}-${new Date(
						item.date,
					).getFullYear()}</time
								><span class="blog-article__view-count">93</span>
							</div>
							<div class="d-flex justify-content-center">
							<i data-product-id=${item.id} class="fa-solid edit fa-pen-to-square "></i>
							<i data-product-id=${item.id} class="fa-solid delete fa-trash ms-3"></i>
						</div>
						</div>
						
					</div>
				
				
			`;

					elList.appendChild(elItem);
				});
			}
		})
		.catch((err) => console.log(err));
	elName.value = '';
	elDesc.value = '';
}

render();

elForm.addEventListener('submit', async (evt) => {
	evt.preventDefault();

	const res = await fetch('http://localhost:5000/news', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			title: elName.value,
			desc: elDesc.value,
		}),
	});

	const data = await res.json();
	if (data.status === 201) {
		render();
	}

	render();
	elModal.classList.add('d-none');
});

async function deleteProduct(id) {
	const res = await fetch(`http://localhost:5000/news/${id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	const data = await res.json();

	if (data) {
		render();
	}
}

function EditProduct(id) {
	elEditModal.classList.remove('d-none');
	let elEditForm = document.querySelector('.js-edit-form');
	let elNameEdit = document.querySelector('.edit-name');
	let elDescEdit = document.querySelector('.edit-desc');

	elEditForm.addEventListener('submit', async (evt) => {
		evt.preventDefault();

		const res = await fetch(`http://localhost:5000/news/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				title: elNameEdit.value,
				desc: elDescEdit.value,
			}),
		});

		const data = await res.json();
		if (data) {
			render();
		}

		elEditModal.classList.add('d-none');
		elName.value = '';
		elDesc.value = '';
	});
}

elList.addEventListener('click', (evt) => {
	if (evt.target.matches('.delete')) {
		let productId = evt.target.dataset.productId;
		deleteProduct(productId);
		// location.reload();
	}

	if (evt.target.matches('.edit')) {
		evt.preventDefault();
		let productId = evt.target.dataset.productId;
		EditProduct(productId);
	}
});
