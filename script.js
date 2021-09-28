function getReversedString(str) {
    let strChars = str.split(''); // it wil make array of char of strings  ["p", "r", "a", "n", "i", "t"]
    let resversedString = strChars.reverse().join(''); //  reverse() it will reverse array and join(" ") it will join the all char of array and make string
    return resversedString;
    
    // console.log(resversedString);
    // console.log(resverArray);
    // console.log(strChars);

}

function CheckStringPalindrome(str) {
    let resversedString = getReversedString(str);
    // console.log(resversedString === str);
    return resversedString === str;
   
};

function NowConvertDateToString(date) {
    let dateStringObj = {
        day: "",
        month: "",
        year: "",

    };

    if (date.day < 10) {
        dateStringObj.day = "0" + date.day;

    } else {
        dateStringObj.day = date.day.toString();
    };

    if (date.month < 10) {
        dateStringObj.month = "0" + date.month;

    } else {
        dateStringObj.month = date.month.toString();
    };

    dateStringObj.year = date.year.toString();

    return dateStringObj;

};

function getAllDateFormats(date) {
    let dateStringObj = NowConvertDateToString(date);

    let ddmmyyyy = dateStringObj.day + dateStringObj.month + dateStringObj.year;
    let mmddyyyy = dateStringObj.month +dateStringObj.day + dateStringObj.year;
    let yyyymmdd = dateStringObj.year + dateStringObj.month + dateStringObj.day;
    let ddmmyy = dateStringObj.day + dateStringObj.month + dateStringObj.year.slice(-2);
    let mmddyy = dateStringObj.month + dateStringObj.day + dateStringObj.year.slice(-2);
    let yymmdd = dateStringObj.year.slice(-2) + dateStringObj.month + dateStringObj.day;
    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllDateFormats(date) {
    let listOfPalindromes = getAllDateFormats(date);
    let flag = false;

    for (let i = 0; i < listOfPalindromes.length; i++) {
        if (CheckStringPalindrome(listOfPalindromes[i])) {
            flag = true;
            break;
        }
    }
   
    return flag;
}

function leapYear(year) {
     
    if (year % 4 === 0) {

        return true;
    }
    
    if (year % 100 === 0) {

        return false;
    }

    if (year % 400 === 0) {

       return true;     
    }
        

    return false;
    
}

function forNextDate(date) {
    let day = date.day + 1;
    let month = date.month;
    let year = date.year;

    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 2) {
        if (leapYear(year)) {
            if (day > 29) {
                day = 1;
                month = 3;
            }
        } else {
            if (day > 28) {
                day = 1;
                month = 3;
            }
        }
    } else {
        if (day > daysInMonth[month - 1]) {
            day = 1;
            month++;
        }
    }

    if (month > 12) {
        month = 1;
        year++;
    }

    return {
        day: day,
        month: month,
        year: year,
    }
}


function getNextPalindromeDate(date) {
    let counter = 0;
    let nextDate = forNextDate(date);

    while(1) {
        counter++;
        var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
        if(isPalindrome) {
            break;
        }

        nextDate = forNextDate(nextDate);
    }

    return [counter, nextDate]
}


// forNextDate(date)

const birthdayd = document.querySelector("#birth-date");
const btnshow = document.querySelector("#birth-submit-btn");
const container = document.querySelector("#container")
    



function clickhand(e) {
    let bdstr = birthdayd.value;
    if (bdstr !== "") {
        let listofdate = bdstr.split("-");
        var date = {
            day:Number( listofdate[2]),
            month:Number(listofdate[1]),
            year:Number(listofdate[0]),
        };
        let palindrom = checkPalindromeForAllDateFormats(date)
        if (palindrom) {
            container.innerText = "yay...😅 your birthday is plaindrome"
        } else {

            let [counter, nextDate] = getNextPalindromeDate(date)
            container.innerText = `No your birth date is not palindrome. Next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}. you missed it by ${counter} days.`
      }
    }
}

btnshow.addEventListener("click", clickhand);



// console.log(getNextPalindromeDate(date))

// console.log(CheckStringPalindrome("racecar"));