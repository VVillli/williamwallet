const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/exi2EvSOpqviiSdzwI4O"));

create.addEventListener('click', () => {
	var acc = web3.eth.accounts.create();
	wallet.add(acc);

	console.log(acc.address);

	newAddress.innerHTML = acc.address;
	newPrivate.innerHTML = acc.privateKey;

	window.alert('Make sure to save the private key for future use in a secure location');

	accounts.options[accounts.options.length] = new Option(acc.address, accounts.options.length);
	accounts.selectedIndex = accounts.options.length - 1;

	web3.eth.getBalance(accounts.options[accounts.selectedIndex].text, (err, res) => {
		if(err) {
			return console.error(err);
		}

		var bal = web3.utils.fromWei(res, 'ether');

		console.log(bal);
		balance.innerHTML = bal + ' ETH'; 
	});
});