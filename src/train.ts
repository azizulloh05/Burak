
//=========
 // Traditional FD => BSSR (Admin) => backend server side rendering
 // Modern FD  => spa (user app) => React
//==========
// TASK P:

// Parametr sifatida yagona object qabul qiladigan function yozing.
// Qabul qilingan objectni nested array sifatida convert qilib qaytarsin

// MASALAN: objectToArray( {a: 10, b: 20}) return [['a', 10], ['b', 20]]

// function objectToArray(obj: any) {
//     let newObj: any[] = [];
//     for(let key in obj) {
//         newObj.push([key, obj[key]]);
//     }
//     return newObj
// }
// const result = objectToArray({a: 10, b: 20});
// console.log(result);




// TASK O:
// Shunday function yozing va u har xil qiymatlardan iborat array qabul qilsin.
// Va array ichidagi sonlar yig'indisini hisoblab chiqgan javobni qaytarsin

// MASALAN: calculateSumOfNumbers([10, "10", {son: 10}, true, 35]); return 45

// Yuqoridagi misolda array tarkibida faqatgina ikkita
//  yagona son mavjud bular 10 hamda 35
// Qolganlari nested bo'lib yoki type'lari number emas.

// function calculateSumOfNumbers(array: any[]): number {
//   let sum = 0;
//   for (let i = 0; i < array.length; i++) {
//     if (typeof array[i] === "number") {
//       const a: string = (sum += array[i]);
//     }
//   }
//   return sum;
// }

// console.log(calculateSumOfNumbers([10, "10", { son: 10 }, true, 35]));




/* Project Standards:
    -Logging standards
    -Naming standards:
        function, method, variable => camelCase
        class => PascalCase
        folder => kebab-case
        css => snake-case
-Error handling standards

*/ 

/* 
 Traditional API
 Rest API
 GraphQL API
 ...
*/


// Task N 
// Shunday function yozing, u string qabul qilsin va string palindrom yani togri 
// oqilganda ham, orqasidan oqilganda ham bir hil oqiladigan soz ekanligini aniqlab boolean qiymat qaytarsin.

// MASALAN: polindromCheck("dad") return true, polindromCheck("hello") return false

// function polindromCheck(str: string): boolean {
//     const reversed = str.split("").reverse().join("")
//     return str === reversed
// }
// const result = polindromCheck("dad");
// console.log("result:", result)

 
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



