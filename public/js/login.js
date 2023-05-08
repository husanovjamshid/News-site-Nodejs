let elForm = document.querySelector('.js-form');
let elName = document.querySelector('.js-email');
let elPassword = document.querySelector('.js-password');

async function postLogin() {
	const res = await fetch('http://localhost:5000/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			username: elName.value,
			password: elPassword.value,
		}),
	});
	const data = await res.json();
	if (data.status === 200) {
        localStorage.setItem('token', data.token)
		location.replace('/admin');
	}
}

elForm.addEventListener('submit', (e) => {
	e.preventDefault();

	postLogin();

	// console.log(elName.value);
	// console.log(elPassword.value);
});
