const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/exi2EvSOpqviiSdzwI4O"));

private.addEventListener('keyup', (e) => {
	e.preventDefault();

	if(e.keyCode == 13) {
		add.click();
	}
});

add.addEventListener('click', () => {
	if(private.value == '') {
		window.alert('Please enter a private key');
		return;
	}

	if(private.value.indexOf('0x') != 0) {
		window.alert('Please enter a valid private key');
		private.value = '';
		return;
	}

	try {
		var added = wallet.add(private.value);

		console.log(added.address);
		
		accounts.options[accounts.options.length] = new Option(added.address, accounts.options.length);

		web3.eth.getBalance(accounts.options[accounts.selectedIndex].text, (err, res) => {
			if(err) {
				return console.error(err);
			}

			window.alert('Account successfully imported');

			var bal = web3.utils.fromWei(res, 'ether');

			console.log(bal);
			balance.innerHTML = bal + ' ETH'; 
		});
	} catch (error) {
		window.alert('Error importing account! Check your private key.');
	}


	private.value = '';
});