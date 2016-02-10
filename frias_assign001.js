function numToWords(number) {
	var result = [];
	var counter = 0;
	var i;
	
	if(number > 1000000) { return "Invalid input! (Number too large)";
	} else {
		if(number == "") { return "Invalid input! (null)"; }// return this if input is null
		if(number == 0) { return "zero"; }				//MIN number -> zero
		if(number == 1000000) {	return "one million"; }	//MAX number -> one million

		for(i=100000; i>=1; i/=10) {					//determines the maximum divisor to be used (i.e. 1000000, 100000, 10000, 1000, 100, 10, 1)
			if(parseInt(number/i, 0) == 0) {
			} else break;
		}
		var quotient = parseInt(number/i, 0);					//stores the next base value to quotient
		if(i == 100000) {								//HUNDRED THOUSANDS DIGIT
			switch(quotient) {
				case 1: result += "one hundred ";
					break;
				case 2: result += "two hundred ";
					break;
				case 3: result += "three hundred ";
					break;
				case 4: result += "four hundred ";
					break;
				case 5: result += "five hundred ";
					break;
				case 6: result += "six hundred ";
					break;
				case 7: result += "seven hundred ";
					break;
				case 8: result += "eight hundred ";
					break;
				case 9: result += "nine hundred ";
					break;
			}
			if(quotient != 0) { counter+=1; }					//if hundred thousands' digit is a non-zero value, increment counter
			number -= (quotient * i);							//decrement number to get its updated value
			i /= 10;									//decrement i to get the next base divisor
			quotient = parseInt(number/i, 0);					//stores the next base value to quotient
		}
		if(i == 10000) {								//TEN THOUSANDS DIGIT
			switch(quotient) {
				case 1: 								//SPECIAL CASE: if ten thousands digit is one, it outputs eleven, twelve, ...
				if(quotient != 0) { counter+=1; }				//if ten thousands' digit is a non-zero value, increment counter
					number -= (quotient * i);					//decrement number to get its updated value
					i /= 10;							//decrement i to get the next base divisor
					quotient = parseInt(number/i, 0);			//stores the next base value to quotient
					switch(quotient) {
						case 1: result += "eleven ";
							break;
						case 2: result += "twelve ";
							break;
						case 3: result += "thirteen ";
							break;
						case 4: result += "fourteen ";
							break;
						case 5: result += "fifteen ";
							break;
						case 6: result += "sixteen ";
							break;
						case 7: result += "seventeen ";
							break;
						case 8: result += "eighteen ";
							break;
						case 9: result += "nineteen ";
							break;
						default: result += "ten ";
							break;
					}
					if(quotient != 0) { counter+=1; }			//if thousands' digit is a non-zero value, increment counter
					break;
				case 2: result += "twenty ";
					break;
				case 3: result += "thirty ";
					break;
				case 4: result += "forty ";
					break;
				case 5: result += "fifty ";
					break;
				case 6: result += "sixty ";
					break;
				case 7: result += "seventy ";
					break;
				case 8: result += "eighty ";
					break;
				case 9: result += "ninety ";
					break;
				default:
					break;
			}
			if(quotient != 0) { counter+=1; }					//if ten thousands' digit is a non-zero value, increment counter
			number -= (quotient * i);							//decrement number to get its updated value
			i /= 10;									//decrement i to get its next base divisor
			quotient = parseInt(number/i, 0);					//stores the next base value to quotient
		}
		if(i == 1000) {									//THOUSANDS DIGIT
			switch(quotient) {
				case 1: result += "one ";
					break;
				case 2: result += "two ";
					break;
				case 3: result += "three ";
					break;
				case 4: result += "four ";
					break;
				case 5: result += "five ";
					break;
				case 6: result += "six ";
					break;
				case 7: result += "seven ";
					break;
				case 8: result += "eight ";
					break;
				case 9: result += "nine ";
					break;
				default:
					break;
			}
			if(quotient != 0) { counter+=1; }					//if thousands' digit is a non-zero value, increment counter
			number -= (quotient * i);							//decrement number to get its updated value
			i /= 10;									//decrement i to get its next base divisor
			quotient = parseInt(number/i, 0);					//stores the next base value to quotient
		}

		if(counter != 0) {								//checks if there is/are atleast 1 counter(s), concatenates "thousands" to the result
			result += "thousand ";
		}

		if(i == 100) {									//HUNDREDS DIGIT
			switch(quotient) {
				case 1: result += "one hundred ";
					break;
				case 2: result += "two hundred ";
					break;
				case 3: result += "three hundred ";
					break;
				case 4: result += "four hundred ";
					break;
				case 5: result += "five hundred ";
					break;
				case 6: result += "six hundred ";
					break;
				case 7: result += "seven hundred ";
					break;
				case 8: result += "eight hundred ";
					break;
				case 9: result += "nine hundred ";
					break;
			}
			number -= (quotient * i);							//decrement number to get its updated value
			i /= 10;									//decrement i to get its next base divisor
			quotient = parseInt(number/i, 0);					//stores the next base value to quotient
		}
		if(i == 10) {									//TENS DIGIT
			switch(quotient) {
				case 1: 								//SPECIAL CASE: if tens digit is one, it outputs eleven, twelve, ...
					number -= (quotient * i);					//decrement number to get its updated value
					i /= 10;							//decrement i to get its next base divisor
					quotient = parseInt(number/i, 0);			//stores the next base value to quotient
					switch(quotient) {
						case 1: result += "eleven";
							break;
						case 2: result += "twelve";
							break;
						case 3: result += "thirteen";
							break;
						case 4: result += "fourteen";
							break;
						case 5: result += "fifteen";
							break;
						case 6: result += "sixteen";
							break;
						case 7: result += "seventeen";
							break;
						case 8: result += "eighteen";
							break;
						case 9: result += "nineteen";
							break;
						default: result += "ten";
							break;
					}
					break;
				case 2: result += "twenty ";
					break;
				case 3: result += "thirty ";
					break;
				case 4: result += "forty ";
					break;
				case 5: result += "fifty ";
					break;
				case 6: result += "sixty ";
					break;
				case 7: result += "seventy ";
					break;
				case 8: result += "eighty ";
					break;
				case 9: result += "ninety ";
					break;
				default:
					break;
			}
			number -= (quotient * i);							//decrement number to get its updated numberber
			i /= 10;									//decrement i to get its next base divisor
			quotient = parseInt(number/i, 0);					//stores the next base value to quotient
		}
		if(i == 1) {									//ONES DIGIT
			switch(quotient) {
				case 1: result += "one";
					break;
				case 2: result += "two";
					break;
				case 3: result += "three";
					break;
				case 4: result += "four";
					break;
				case 5: result += "five";
					break;
				case 6: result += "six";
					break;
				case 7: result += "seven";
					break;
				case 8: result += "eight";
					break;
				case 9: result += "nine";
					break;
				default:
					break;
			}
			number -= (quotient * i);							//decrement number to get its updated value
			i /= 10;									//decrement i to get its next base divisor
		}
		return result;
	}
}