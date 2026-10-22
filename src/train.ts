/**TASK X

Shunday function yozing, uni object va string parametrlari bo'lsin.
Bu function, birinchi object parametri tarkibida, kalit sifatida ikkinchi string parametri
necha marotaba takrorlanganlini sanab qaytarsin.

Eslatma => Nested object'lar ham sanalsin

MASALAN: countOccurrences({model: 'Bugatti', steer: {model: 'HANKOOK', size: 30}}, 'model') return 2

Yuqoridagi misolda, birinchi argument object, ikkinchi argument 'model'.
Funktsiya, shu ikkinchi argument 'model', birinchi argument object
tarkibida kalit sifatida 2 marotaba takrorlanganligi uchun 2 soni return qilmoqda
*/

function countOccurrences(obj: object, key: string): number {
	let count = 0
	for (let i in obj) {
		if (i === key) {
			count++
		}
	}
	return count
}

console.log(
	countOccurrences(
		{ model: 'Bugatti', steer: { model: 'HANKOOK', size: 30 } },
		'model',
	),
) // 2

/**TASK W

Shunday function yozing, u o'ziga parametr sifatida
yagona array va number qabul qilsin. Siz tuzgan function
arrayni numberda berilgan uzunlikda kesib bo'laklarga
ajratgan holatida qaytarsin.
MASALAN: chunkArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3);
return [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]];

Yuqoridagi namunada berilayotgan array ikkinchi parametr 3'ga
asoslanib 3 bo'lakga bo'linib qaytmoqda. Qolgani esa o'z holati qolyapt */

// 
// Shunday function yozing, uni string parametri bo'lsin Va bu function stringdagi har bir harfni o'zi bilan
// necha marotaba taktorlanganligini ko'rsatuvchi object qaytarsin.MASALAN: countChars("hello") return {h: 1, e: 1, l: 2, o: 1}
// Yuqoridagi misolda, 'hello' so'zi tarkibida qatnashgan harflar necha marotaba takrorlangini bilan
// object sifatida qaytarilmoqda. */
// function chunkArray(arr: number[], size: number): number[][] {
//   const result: number[][] = [];

//   for (let i = 0; i < arr.length; i += size) {
//     result.push(arr.slice(i, i + size));
//   }

//   return result;
// }

// console.log(chunkArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 4));

// /**TASK V

// function countChars(s: string): Record<string, number> {
// 	const result: Record<string, number> = {}

// 	for (const char of s) {
// 		if (char in result) {
// 			result[char]++
// 		} else {
// 			result[char] = 1
// 		}
// 	}
// 	return result
// }
// console.log(countChars('engineering'))



// // TASK T

// // Shunday function tuzing, u sonlardan tashkil topgan 2'ta array qabul qilsin.
// // Va ikkala arraydagi sonlarni tartiblab bir arrayda qaytarsin.

// // MASALAN: mergeSortedArrays([0, 3, 4, 31], [4, 6, 30]); return [0, 3, 4, 4, 6, 30, 31];

// // Yuqoridagi misolda, ikkala arrayni birlashtirib, tartib raqam bo'yicha tartiblab qaytarmoqda.
// // function mergeSortedArrays(list1: number[], list2: number[]): number[] {
// //   return list1.concat(list2).sort((a, b) => a - b);
// // }

// // const result = mergeSortedArrays([0, 3, 4, 31], [4, 6, 30]);

// // console.log(result);

// // /**TASK S:

// // Shunday function yozing, u numberlardan tashkil topgan array qabul qilsin va osha numberlar orasidagi tushib qolgan sonni topib uni return qilsin
// // MASALAN: missingNumber([3, 0, 1]) return 2 */

// // // function missingNumber(arr: number[]): number {
// // 	let sum = 0
// // 	let sum2 = arr.length // n dan boshlaymiz

// // 	for (let i = 0; i < arr.length; i++) {
// // 		sum += arr[i]
// // 		sum2 += i
// // 	}

// // 	return sum2 - sum
// // }



// // console.log(missingNumber([0, 1, 3, 2, 5])) // 4

// // // TASK R

// // Shunday function yozing, u string parametrga ega bo'lsin.
// // Agar argument sifatida berilayotgan string, "1 + 2" bo'lsa,
// // string ichidagi sonlarin yig'indisni hisoblab, number holatida qaytarsin

// // MASALAN: calculate("1 + 3"); return 4;
// // 1 + 3 = 4, shu sababli 4 natijani qaytarmoqda. 

// // function calculate(ele: string): number{
// //   const a = ele.split(" ")
// //   .filter((item) => !isNaN(Number(item)))
// //   .reduce((sum, item) => sum + Number(item), 0);
// // return a
// // }
// // console.log(calculate("4 + 3"));




// /* Project Standards:
//     -Logging standards
//     -Naming standards:
//         function, method, variable => camelCase
//         class => PascalCase
//         folder => kebab-case
//         css => snake-case
// -Error handling standards

// */ 

// /* Requests:
//  Traditional API (form POST)
//  Rest API
//  GraphQL API
//  ...
// */

// /* Frontend Development:
//     TRADITIONAL FD =>  SSR  => EJS
//      MODERN FD.   => SPA  => React
//      */

//      /* Cookies
//      request join
//      self destroy
//      */
//     /* Validation:
//     Frontend validation
    // Backend Validation
    // Database Validation
    // */