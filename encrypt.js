const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/exi2EvSOpqviiSdzwI4O"));

passEx.addEventListener('keyup', (e) => {
	e.preventDefault();

	if(e.keyCode == 13) {
		encrypt.click();
	}
});

encrypt.addEventListener('click', () => {
	if(passEx.value == '') {
		window.alert('Please enter a password');
		return;
	}

	var keyStore = wallet.encrypt(passEx.value);
	keyEx.innerHTML = JSON.stringify(keyStore);
	dl('keystore.json', keyEx.innerHTML);
});

function dl(filename, text) {
	var link = document.createElement('a');
	link.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	link.setAttribute('download', filename);

	link.style.display = 'none';
	document.body.appendChild(link);

	link.click();

	document.body.removeChild(link);
}