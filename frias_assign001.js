function numToWords(number) {
	var result = [];
	var counter = 0;												//variable that increments if there are non-zero thousands
	var i;
	
	if(number > 1000000 || number < 0) { return "Invalid input! (Out of Range)"; }
	if(number == "") { return "Invalid input! (null)"; }			// return this if input is null
	if(number == 0) { return "zero"; }				//MIN number -> zero
	if(number == 1000000) {	return "one million"; }	//MAX number -> one million

	for(i=100000; i>=1; i/=10) {					//determines the maximum divisor to be used (i.e. 1000000, 100000, 10000, 1000, 100, 10, 1)
		if(parseInt(number/i, 0) == 0) {
		} else break;
	}
	var quotient = parseInt(number/i, 0);							//stores the next base value to quotient
	if(i == 100000) {	//HUNDRED THOUSANDS DIGIT
		result += translateHundreds(quotient);						//function for getting the hundred thousands' result
		if(quotient != 0) { counter+=1; }							//if hundred thousands' digit is a non-zero value, increment counter
		number -= (quotient * i);									//decrement number to get its updated value
		i /= 10;													//decrement i to get the next base divisor
		quotient = parseInt(number/i, 0);							//stores the next base value to quotient
	}

	if(i == 10000) {	//TEN THOUSANDS DIGIT
		if(	quotient == 1) { 
			if(quotient != 0) { counter+=1; }						//if ten thousands' digit is a non-zero value, increment counter
			number -= (quotient * i);								//decrement number to get its updated value
			i /= 10;												//decrement i to get the next base divisor
			quotient = parseInt(number/i, 0);						//stores the next base value to quotient
			result += translateTensSpecialCase(quotient);			//SPECIAL CASE: if ten thousands digit is one, it outputs eleven, ...
			if(quotient != 0) { counter+=1; }						//if thousands' digit is a non-zero value, increment counter
		} else { result += translateTens(quotient); }				//function for getting the ten thousands' result
				
		if(i == 10000 && quotient != 0) { counter+=1; }				//if ten thousands' digit is a non-zero value, increment counter
		number -= (quotient * i);									//decrement number to get its updated value
		i /= 10;													//decrement i to get its next base divisor
		quotient = parseInt(number/i, 0);							//stores the next base value to quotient
	}

	if(i == 1000) {		//THOUSANDS DIGIT
		result += translateOnes(quotient);							//function for getting the thousands' result
		if(quotient != 0) { counter+=1; }							//if thousands' digit is a non-zero value, increment counter
		number -= (quotient * i);									//decrement number to get its updated value
		i /= 10;													//decrement i to get its next base divisor
		quotient = parseInt(number/i, 0);							//stores the next base value to quotient
	}	

	if(counter != 0) {	//checks if there is/are atleast 1 counter(s), concatenates "thousands" to the result
		result += "thousand ";
	}

	if(i == 100) {		//HUNDREDS DIGIT
		result += translateHundreds(quotient);						//function for getting the hundreds' result
		number -= (quotient * i);									//decrement number to get its updated value
		i /= 10;													//decrement i to get the next base divisor
		quotient = parseInt(number/i, 0);							//stores the next base value to quotient
	}

	if(i == 10) {		//TENS DIGIT
		if(	quotient == 1) { 
			number -= (quotient * i);								//decrement number to get its updated value
			i /= 10;												//decrement i to get the next base divisor
			quotient = parseInt(number/i, 0);						//stores the next base value to quotient
			result += translateTensSpecialCase(quotient);			//SPECIAL CASE: if tens digit is one, it outputs eleven, ...
		} else { result += translateTens(quotient); }				//function for getting the ten thousands' result
				
		number -= (quotient * i);									//decrement number to get its updated value
		i /= 10;													//decrement i to get its next base divisor
		quotient = parseInt(number/i, 0);							//stores the next base value to quotient
	}

	if(i == 1) {		//ONES DIGIT
		result += translateOnes(quotient);							//function for getting the ones' result
		number -= (quotient * i);									//decrement number to get its updated value
		i /= 10;													//decrement i to get its next base divisor
	}
	return result;

	function translateHundreds(quotient) {
		switch(quotient) {
			case 0: return "";
			case 1: return "one hundred ";
			case 2: return "two hundred ";
			case 3: return "three hundred ";
			case 4: return "four hundred ";
			case 5: return "five hundred ";
			case 6: return "six hundred ";
			case 7: return "seven hundred ";
			case 8: return "eight hundred ";
			case 9: return "nine hundred ";
		}
	}

	function translateTensSpecialCase(quotient) {
		switch(quotient) {
			case 0: return "ten ";
			case 1: return "eleven ";
			case 2: return "twelve ";
			case 3: return "thirteen ";
			case 4: return "fourteen ";
			case 5: return "fifteen ";
			case 6: return "sixteen ";
			case 7: return "seventeen ";
			case 8: return "eighteen ";
			case 9: return "nineteen ";
		}
	}

	function translateTens(quotient) {
		switch(quotient) {
			case 0: return "";
			case 2: return "twenty ";
			case 3: return "thirty ";
			case 4: return "forty ";
			case 5: return "fifty ";
			case 6: return "sixty ";
			case 7: return "seventy ";
			case 8: return "eighty ";
			case 9: return "ninety ";
		}	
	}

	function translateOnes(quotient) {
		switch(quotient) {
			case 0: return "";
			case 1: return "one ";
			case 2: return "two ";
			case 3: return "three ";
			case 4: return "four ";
			case 5: return "five ";
			case 6: return "six ";
			case 7: return "seven ";
			case 8: return "eight ";
			case 9: return "nine ";
		}
	}
}

function wordsToNum(words) {
	var result = 0;
	var thousands = 0;									//temporary variable for future operations
	var isThousand;										//1 if in thousands place, 0 if not
	
	if(/one[ ]million(\w|\s)+/.test(words)) { return "Invalid Input! (Out of Range)"; }
	if(/^one[ ]million$/.test(words)) { return 1000000; }//MAX number -> 1000000
	if(/^zero$/.test(words)) { return 0; }				//MIN number -> 0
	if(words == "") { return "Invalid Input! (null)" ; }// return this if input is null

	if(/thousand/.test(words)) {						//checks first if there's "thousand" in the input
		isThousand = 1; 								// 1 if "thousand" is found
	} else { isThousand = 0; }							// 0 if not
	translateToNumber(isThousand);						//function for getting the thousands part's results

	if(/^thousand[ ]?/.test(words)) {					//check if there's a thousand, do the ff:
		words = words.replace(/thousand[ ]?/, "");
		result += (thousands * 1000);					//multiply thousands to 1000
		isThousand = 0;									//turn off the thousands places (non-thousands places)
		translateToNumber(isThousand);					//function for getting the non-thousands part's results
	}
	return result;

	function translateToNumber(isThousand) {
		if(/^one[ ]hundred[ ]?/.test(words)) {			//HUNDRED THOUSANDS | HUNDREDS DIGIT
			words = words.replace(/^one[ ]hundred[ ]?/, "");
			if(isThousand == 1) { thousands += 100; } else { result += 100; }
		} else if(/^two[ ]hundred[ ]?/.test(words)) {
			words = words.replace(/^two[ ]hundred[ ]?/, "");
			if(isThousand == 1) { thousands += 200; } else { result += 200; }
		} else if(/^three[ ]hundred[ ]?/.test(words)) {
			words = words.replace(/^three[ ]hundred[ ]?/, "");
			if(isThousand == 1) { thousands += 300; } else { result += 300; }
		} else if(/^four[ ]hundred[ ]?/.test(words)) {
			words = words.replace(/^four[ ]hundred[ ]?/, "");
			if(isThousand == 1) { thousands += 400; } else { result += 400; }
		} else if(/^five[ ]hundred[ ]?/.test(words)) {
			words = words.replace(/^five[ ]hundred[ ]?/, "");
			if(isThousand == 1) { thousands += 500; } else { result += 500; }
		} else if(/^six[ ]hundred[ ]?/.test(words)) {
			words = words.replace(/^six[ ]hundred[ ]?/, "");
			if(isThousand == 1) { thousands += 600; } else { result += 600; }
		} else if(/^seven[ ]hundred[ ]?/.test(words)) {
			words = words.replace(/^seven[ ]hundred[ ]?/, "");
			if(isThousand == 1) { thousands += 700; } else { result += 700; }
		} else if(/^eight[ ]hundred[ ]?/.test(words)) {
			words = words.replace(/^eight[ ]hundred[ ]?/, "");
			if(isThousand == 1) { thousands += 800; } else { result += 800; }
		} else if(/^nine[ ]hundred[ ]?/.test(words)) {
			words = words.replace(/^nine[ ]hundred[ ]?/, "");
			if(isThousand == 1) { thousands += 900; } else { result += 900; }
		}

		if(/^ten[ ]?/.test(words)) {					//TEN THOUSANDS | TENS DIGIT											
			words = words.replace(/^ten[ ]?/, "");
			if(isThousand == 1) { thousands += 10; } else { result += 10; }
		} else if(/^eleven[ ]?/.test(words)) {														
			words = words.replace(/^eleven[ ]?/, "");
			if(isThousand == 1) { thousands += 11; } else { result += 11; }
		} else if(/^twelve[ ]?/.test(words)) {														
			words = words.replace(/^twelve[ ]?/, "");
			if(isThousand == 1) { thousands += 12; } else { result += 12; }
		} else if(/^thirteen[ ]?/.test(words)) {														
			words = words.replace(/^thirteen[ ]?/, "");
			if(isThousand == 1) { thousands += 13; } else { result += 13; }
		} else if(/^fourteen[ ]?/.test(words)) {														
			words = words.replace(/^fourteen[ ]?/, "");
			if(isThousand == 1) { thousands += 14; } else { result += 14; }
		} else if(/^fifteen[ ]?/.test(words)) {														
			words = words.replace(/^fifteen[ ]?/, "");
			if(isThousand == 1) { thousands += 15; } else { result += 15; }
		} else if(/^sixteen[ ]?/.test(words)) {														
			words = words.replace(/^sixteen[ ]?/, "");
			if(isThousand == 1) { thousands += 16; } else { result += 16; }
		} else if(/^seventeen[ ]?/.test(words)) {														
			words = words.replace(/^seventeen[ ]?/, "");
			if(isThousand == 1) { thousands += 17; } else { result += 17; }
		} else if(/^eighteen[ ]?/.test(words)) {														
			words = words.replace(/^eighteen[ ]?/, "");
			if(isThousand == 1) { thousands += 18; } else { result += 18; }
		} else if(/^nineteen[ ]?/.test(words)) {														
			words = words.replace(/^nineteen[ ]?/, "");
			if(isThousand == 1) { thousands += 19; } else { result += 19; }
		} else if(/^twenty[ ]?/.test(words)) {														
			words = words.replace(/^twenty[ ]?/, "");
			if(isThousand == 1) { thousands += 20; } else { result += 20; }
		} else if(/^thirty[ ]?/.test(words)) {														
			words = words.replace(/^thirty[ ]?/, "");
			if(isThousand == 1) { thousands += 30; } else { result += 30; }
		} else if(/^forty[ ]?/.test(words)) {														
			words = words.replace(/^forty[ ]?/, "");
			if(isThousand == 1) { thousands += 40; } else { result += 40; }
		} else if(/^fifty[ ]?/.test(words)) {														
			words = words.replace(/^fifty[ ]?/, "");
			if(isThousand == 1) { thousands += 50; } else { result += 50; }
		} else if(/^sixty[ ]?/.test(words)) {														
			words = words.replace(/^sixty[ ]?/, "");
			if(isThousand == 1) { thousands += 60; } else { result += 60; }
		} else if(/^seventy[ ]?/.test(words)) {														
			words = words.replace(/^seventy[ ]?/, "");
			if(isThousand == 1) { thousands += 70; } else { result += 70; }
		} else if(/^eighty[ ]?/.test(words)) {														
			words = words.replace(/^eighty[ ]?/, "");
			if(isThousand == 1) { thousands += 80; } else { result += 80; }
		} else if(/^ninety[ ]?/.test(words)) {														
			words = words.replace(/^ninety[ ]?/, "");
			if(isThousand == 1) { thousands += 90; } else { result += 90; }
		}

		if(/^one[ ]?/.test(words)) {					//THOUSANDS | ONES DIGIT										
			words = words.replace(/^one[ ]?/, "");
			if(isThousand == 1) { thousands += 1; } else { result += 1; }
		} else if(/^two[ ]?/.test(words)) {														
			words = words.replace(/^two[ ]?/, "");
			if(isThousand == 1) { thousands += 2; } else { result += 2; }
		} else if(/^three[ ]?/.test(words)) {														
			words = words.replace(/^three[ ]?/, "");
			if(isThousand == 1) { thousands += 3; } else { result += 3; }
		} else if(/^four[ ]?/.test(words)) {														
			words = words.replace(/^four[ ]?/, "");
			if(isThousand == 1) { thousands += 4; } else { result += 4; }
		} else if(/^five[ ]?/.test(words)) {														
			words = words.replace(/^five[ ]?/, "");
			if(isThousand == 1) { thousands += 5; } else { result += 5; }
		} else if(/^six[ ]?/.test(words)) {														
			words = words.replace(/^six[ ]?/, "");
			if(isThousand == 1) { thousands += 6; } else { result += 6; }
		} else if(/^seven[ ]?/.test(words)) {														
			words = words.replace(/^seven[ ]?/, "");
			if(isThousand == 1) { thousands += 7; } else { result += 7; }
		} else if(/^eight[ ]?/.test(words)) {														
			words = words.replace(/^eight[ ]?/, "");
			if(isThousand == 1) { thousands += 8; } else { result += 8; }
		} else if(/^nine[ ]?/.test(words)) {														
			words = words.replace(/^nine[ ]?/, "");
			if(isThousand == 1) { thousands += 9; } else { result += 9; }
		}
	}
}

function wordsToCurrency(words, currency) {
	if(currency == "JPY" || currency == "PHP" || currency == "USD" ) {		//checks if currency is on the list
		return currency += wordsToNum(words);								//outputs the currency concatenated with number
	} else {
		return "Invalid Input! (currency not found on the list)";
	}
}

function numberDelimited(number, delimiter, jumps) {
	if(delimiter.length > 1) { 
		return "Invalid Input! (delimiter should be a single character only)"; 
	} else if(number > 1000000 || number < 0) { 
		return "Invalid input! (Out of Range)"; 
	} else {
		
	}
}