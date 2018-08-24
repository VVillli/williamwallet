const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/exi2EvSOpqviiSdzwI4O"));
console.log(web3.currentProvider);
console.log(web3.version);

wallet = web3.eth.accounts.wallet;

accounts.addEventListener('change', () => {
	var currentAddress = accounts.options[accounts.selectedIndex].text;

	web3.eth.getBalance(currentAddress, (err, res) => {
		if(err) {
			return console.error(err);
		}

		var bal = web3.utils.fromWei(res, 'ether');

		console.log(bal);
		balance.innerHTML = bal + ' ETH'; 
	});

	/*web3.eth.getBlockNumber((err, curr) => {
		if(err) {
			return console.error(err);
		}

		var currentBlock = curr;

		web3.eth.getTransactionCount(currentAddress, currentBlock, (err, transCount) => {
			if(err) {
				return console.error(err);
			}

			var count = transCount;

			console.log(currentBlock + " " + count);

			for(var i = currentBlock; i >= 0 && count > 0; i--) {
				try {
					console.log(i + " " + count);

					web3.eth.getBlock(i, true, (err, block) => {
						if(err) {
							return console.error(err);
						}

						console.log(block);

						if(block && block.transactions) {
							block.transactions.forEach((res) => {
								if(currentAddress == res.from && res.from != res.to) {
									trans.innerHTML += "<tr><td>" + res.from + "</td><td>" + res.to + "</td><td>" + res.value.toString(10) + "</td></tr>";
									count--;
								}
								if(currentAddress == res.to && res.from != res.to) {
									trans.innerHTML += "<tr><td>" + res.from + "</td><td>" + res.to + "</td><td>" + res.value.toString(10) + "</td></tr>";
									count--;
								}
							});
						}
					});
				} catch (e) {
					console.error("Error in block " + i, e);
				}
			}
		});
	});*/
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

