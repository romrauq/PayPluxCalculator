const prompt = require("prompt");

// Info Log:
console.log("********************************************************");
console.log(
	`[Required User Input]:
1. GHS Capital,
2. BTC/USD value (when buying),
2. BTC/USD value (when selling),
4. USD/GHS value (buying USD),
5. USD/GHS value (selling USD),
6. Transaction Fee (of transfering to cashout exchange)`
);
console.log("********************************************************");

input_array = [
	"ghs_capital",
	"btc_usd_entry",
	"btc_usd_exit",
	"cedi_to_dollar",
	"dollar_to_cedi",
	"transaction_fee",
];

(() => {
	prompt.start();
	prompt.get(input_array, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			let ghs_capital = parseFloat(result.ghs_capital);
			let btc_usd_entry = parseFloat(result.btc_usd_entry);
			let btc_usd_exit = parseFloat(result.btc_usd_exit);
			let cedi_to_dollar = parseFloat(result.cedi_to_dollar);
			let dollar_to_cedi = parseFloat(result.dollar_to_cedi);
			let transaction_fee = parseFloat(result.transaction_fee);

			const calculate = (_ghs_capital, _cedi_to_dollar, _btc_usd_entry) => {
				let usd_capital = _ghs_capital / _cedi_to_dollar;
				let btc = usd_capital / _btc_usd_entry;
				let usd = (btc - transaction_fee) * btc_usd_exit;
				let ghs_gross = usd * dollar_to_cedi;
				let profit = ghs_gross - _ghs_capital;
				let pnl = (profit / _ghs_capital) * 100;

				console.log("________________________________________________________");
				console.log(`GHS Capital: ${ghs_capital.toFixed(2)} GHS`);
				console.log(`USD Capital: ${usd_capital.toFixed(2)} USD`);
				console.log(`BTC Bought : ${btc.toFixed(8)} BTC`, "\n");

				console.log(`Exit Value (USD): ${usd.toFixed(2)} USD`);
				console.log(`Exit Value (GHS): ${ghs_gross.toFixed(2)} GHS`);
				console.log(`Exit PnL   (GHS): ${profit.toFixed(2)} GHS`);
				console.log(`PnL Percentage  : ${pnl.toFixed(2)}%`);
				console.log("________________________________________________________", "\n");
			};
			calculate(
				ghs_capital,
				cedi_to_dollar,
				btc_usd_entry,
				dollar_to_cedi,
				btc_usd_exit,
				transaction_fee
			);
		}
	});
})();
