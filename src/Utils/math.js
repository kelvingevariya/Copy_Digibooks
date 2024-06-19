export function toIndianCommaFormat(number) {
    // Convert the number to a string with 2 decimal places
    let numStr = Math.ceil(number) + ""
  
    // Split the number into integer and decimal parts
    let [integerPart, decimalPart] = numStr.split('.');
  
    // Use regex to format the integer part as per Indian numbering system
    let lastThreeDigits = integerPart.slice(-3);
    let otherDigits = integerPart.slice(0, -3);
  
    if (otherDigits !== '') {
      lastThreeDigits = ',' + lastThreeDigits;
    }
  
    // Add commas to the other digits part
    let formattedInteger = otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
  
    // Combine the parts
    let formattedNumber = formattedInteger + lastThreeDigits;
  
    // Add the decimal part
  
    return formattedNumber;
  }
  