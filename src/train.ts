// TASK R

// Shunday function yozing, u string parametrga ega bo'lsin.
// Agar argument sifatida berilayotgan string, "1 + 2" bo'lsa,
// string ichidagi sonlarin yig'indisni hisoblab, number holatida qaytarsin

// MASALAN: calculate("1 + 3"); return 4;
// 1 + 3 = 4, shu sababli 4 natijani qaytarmoqda. 

function calculate(ele: string): number{
  const a = ele.split(" ")
  .filter((item) => !isNaN(Number(item)))
  .reduce((sum, item) => sum + Number(item), 0);
return a
}
console.log(calculate("4 + 3"));




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

/*
    TRADITIONAL FD  => EJS
     MODERN FD => React
     */

     /*
     request join
     self destroy
     */