const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/exi2EvSOpqviiSdzwI4O"));

selectFiles.addEventListener('click', () => {
	selectFiles.value = null;
})

selectFiles.addEventListener('change', () => {
	if(selectFiles.files.length <= 0) {
		window.alert('Please choose a file');
		return;
	}

	var filename = selectFiles.value.split('.');

	if(filename[filename.length - 1].toLowerCase() != 'json') {
		window.alert('Please choose a JSON file');
		return;
	}

	var fr = new FileReader();
	fr.onload = (e) => {
		keyIm.value = e.target.result;
		keyIm.innerHTML = e.target.result;
	}

	fr.readAsText(selectFiles.files.item(0));
});

passIm.addEventListener('keyup', (e) => {
	e.preventDefault();

	if(e.keyCode == 13) {
		unlock.click();
	}
});

unlock.addEventListener('click', () => {
	if(keyIm.value == '') {
		window.alert('Please enter your keystore file');
		keyIm.value = '';
		return;
	}

	if(passIm.value == '') {
		window.alert('Please enter your password');
		passIm.value = '';
		return;
	}

	try {
		wallet = web3.eth.accounts.wallet.decrypt(JSON.parse(keyIm.value), passIm.value);
		accounts.options.length = 0;

		for(var i = 0; i < wallet.length; i++) {
			accounts.options[accounts.options.length] = new Option(wallet[i].address, i);
		}

		web3.eth.getBalance(accounts.options[accounts.selectedIndex].text, (err, res) => {
			if(err) {
				return console.error(err);
			}

			window.alert('Wallet successfully imported!');

			var bal = web3.utils.fromWei(res, 'ether');

			console.log(bal);
			balance.innerHTML = bal + ' ETH'; 
		});
	} catch (error) {
		window.alert('Error decrypting! Please check your keystore and passphrase.');
		console.log(error);
	}

	keyIm.value = '';
	passIm.value = '';
});