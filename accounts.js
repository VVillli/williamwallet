const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/exi2EvSOpqviiSdzwI4O"));
console.log(web3.currentProvider);
console.log(web3.version);

wallet = web3.eth.accounts.wallet;

accounts.addEventListener('change', () => {
	web3.eth.getBalance(accounts.options[accounts.selectedIndex].text, (err, res) => {
		if(err) {
			return console.error(err);
		}

		var bal = web3.utils.fromWei(res, 'ether');

		console.log(bal);
		balance.innerHTML = bal + ' ETH'; 
	});
});

clear.addEventListener('click', () => {
	var cleared = wallet.clear();
	console.log(cleared.length);
	accounts.options.length = 0;
	balance.innerHTML = '';
});

remove.addEventListener('click', () => {
	var removed = wallet.remove(accounts.options[accounts.selectedIndex].text);

	console.log(removed);

	accounts.remove(accounts.selectedIndex);

	if(accounts.options.length == 0) {
		balance.innerHTML = '';
		return;
	}

	web3.eth.getBalance(accounts.options[accounts.selectedIndex].text, (err, res) => {
		if(err) {
			return console.error(err);
		}

		var bal = web3.utils.fromWei(res, 'ether');

		console.log(bal);
		balance.innerHTML = bal + ' ETH'; 
	});
});

