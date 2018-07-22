const Web3 = require('web3');
const Tx = require('ethereumjs-tx');

const web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/exi2EvSOpqviiSdzwI4O"));


submit.addEventListener('click', function() {
	if(!web3.utils.isAddress(send.value)) {
		window.alert("Please enter a valid Address");
		send.value = "";
		return;
	}

	if(amount.value == "" || amount.value <= 0) {
		window.alert('Please enter a valid Amount');
		amount.value = null;
		return;
	}

	var address = accounts.options[accounts.selectedIndex].text;

	const parameter = {
		from: address,
		to: send.value,
		value: web3.utils.toWei(amount.value, 'ether')
	};


	web3.eth.estimateGas(parameter, (err, gasLimit) => {
		if(err) {
			return console.error(err);
		}

		parameter.gasLimit = web3.utils.toHex(gasLimit);

		web3.eth.getGasPrice((err, gasPrice) => {
			if(err) {
				return console.error(err);
			}

			parameter.gasPrice = web3.utils.toHex(gasPrice);

			web3.eth.getTransactionCount(address, (err, txCount) => {
				if(err) {
					return console.error(err);
				}

				parameter.nonce = web3.utils.toHex(txCount);

				console.log(parameter);

				sendSigned(parameter, (err, result) => {
					if(err) {
						return console.error(err);
					}

					console.log('sent', result);
				});
			});
		})
	});
});

function sendSigned(txData, cb) {
	var privateKey = new Buffer(wallet[accounts.selectedIndex].privateKey.substring(2), 'hex');
	var transaction = new Tx(txData);
	transaction.sign(privateKey);
	var serializedTransaction = transaction.serialize().toString('hex');
	web3.eth.sendSignedTransaction('0x' + serializedTransaction, cb);
}