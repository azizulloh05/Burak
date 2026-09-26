 // Task N 
// Shunday function yozing, u string qabul qilsin va string palindrom yani togri 
// oqilganda ham, orqasidan oqilganda ham bir hil oqiladigan soz ekanligini aniqlab boolean qiymat qaytarsin.

// MASALAN: polindromCheck("dad") return true, polindromCheck("hello") return false

function polindromCheck(str: string): boolean {
    const reversed = str.split("").reverse().join("")
    return str === reversed
}
const result = polindromCheck("dad");
console.log("result:", result)

 
 // TASK M: 

// Shunday function yozing, u raqamlardan tashkil topgan array qabul qilsin 
// va array ichidagi har bir raqam uchun raqamni ozi va hamda osha raqamni 
// kvadratidan tashkil topgan object hosil qilib, hosil bolgan objectlarni array ichida qaytarsin.
// MASALAN: getSquareNumbers([1, 2, 3]) return [{number: 1, square: 1}, {number: 2, square: 4}, {number: 3, square: 9}];

// interface Raqam {
//   son: number
//   kvadrat: number
// }

// function getSquareNumbers(ary: number[]): Raqam[] {
//   return ary.map((code) => {
//     return {
//       son: code,
//       kvadrat: code ** 2
//     };
//   });
// }

// console.log(getSquareNumbers([1, 2, 3]));



