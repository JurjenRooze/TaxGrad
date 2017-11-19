//global vars
var deduction, exemption, taxable, total_taxes, net_income, increase;

//function from stackoverflow to convert number to currency
Number.prototype.formatMoney = function(c, d, t) {
  var n = this, 
  c = isNaN(c = Math.abs(c)) ? 2 : c, 
  d = d == undefined ? "." : d, 
  t = t == undefined ? "," : t, 
  s = n < 0 ? "-" : "", 
  i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),          j = (j = i.length) > 3 ? j % 3 : 0;
  return s + '$' + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};   

function calcTaxableIncome() {
  var a = parseFloat(document.getElementById("tuition").value) +
            parseFloat(document.getElementById("fees").value) +
              parseFloat(document.getElementById("stipend").value);
  var b = deduction + exemption;
  taxable = Math.max(0, a-b);
  document.getElementById("taxable").value = taxable.formatMoney(0, '.', ',');
}

function calcExemption() {
  exemption = 0;
  document.getElementById("exemption").value = (0).formatMoney(0, '.', ','); 
}

function calcDeduction() {
  deduction = 12000;
  document.getElementById("standard_deduction").value = (12000).formatMoney(0, '.', ','); ;
}

function calc_taxes() {
  var amount_brack1 = Math.min(taxable, 45000);
  var amount_brack2 = Math.max(0, taxable - amount_brack1);
  var brack1 = 0.12 * amount_brack1;
  var brack2 = 0.25 * amount_brack2;
  document.getElementById("perc12").value = brack1.formatMoney(0, '.', ','); 
  document.getElementById("perc25").value = brack2.formatMoney(0, '.', ',');   
  total_taxes = brack1 + brack2;
  document.getElementById("total_tax").value = total_taxes.formatMoney(0, '.', ','); 
}

function calc_netincome() {
  net_income = parseFloat(document.getElementById("stipend").value) - total_taxes;
  document.getElementById("net_income").value = net_income.formatMoney(0, '.', ','); 
}

function calc_tax_increase() {
  var a = parseFloat(document.getElementById("stipend").value);
  var taxable_old = Math.max(0, a - 6350 - 4050);
  var amount_brack1 = Math.min(taxable_old, 9325);
  var amount_brack2 = Math.min(taxable_old - amount_brack1, 37950 - amount_brack1);
  var amount_brack3 = Math.max(0, taxable_old - amount_brack1 - amount_brack2);
  var brack1 = 0.1 * amount_brack1;
  var brack2 = 0.15 * amount_brack2;
  var brack3 = 0.25 * amount_brack3;
  var tot_old = brack1 + brack2 + brack3;
  increase = total_taxes - tot_old;          
  document.getElementById("increase").value = increase.formatMoney(0, '.', ',');
}

function calc_relative_change() {
  document.getElementById("rel_increase").value = Math.round(increase / parseFloat(document.getElementById("stipend").value) * 100) + "%";
}

function calcAll() {
  calcExemption();
  calcDeduction();
  calcTaxableIncome();
  calc_taxes();
  calc_netincome();
  calc_tax_increase();
  calc_relative_change();
}
