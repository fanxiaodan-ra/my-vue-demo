// const getMax = (arr) => {
//   const newArr = [...arr]
//   const first = Math.max(...newArr)
//   const firstIndex = newArr.indexOf(first)
//   if (first === 0) { return '' }
//   arr[firstIndex] --
//   newArr[firstIndex] = 0
//   const second = Math.max(...newArr)
//   const secondIndex = newArr.indexOf(second)
//   arr[secondIndex] --
//   return `${first > 0 ? String.fromCodePoint(firstIndex + 97) : ''}${second > 0 ? String.fromCodePoint(secondIndex + 97): ''}`
// }

// const reorganizeString = function (S) {
//   const arr = S.split('')
//   const chars = new Array(26).fill(0)
//   let result = ''
//   arr.forEach((i) => {
//     chars[Number(i.charCodeAt()) - 97] ++
//   })
//   let max = Math.max(...chars)
//   if ((S.length % 2 === 0 && max > S.length / 2) || (S.length % 2 === 1 && max > (S.length + 1) / 2)) {
//     return ''
//   }
//   let i = 0
//   while (i < S.length) {
//     result = `${result}${getMax(chars)}`
//     i = i + 2
//   }
//   return result
// }
// reorganizeString("tndsewnllhrtwsvxenkscbivijfqnysamckzoyfnapuotmdexzkkrpmppttficzerdndssuveompqkemtbwbodrhwsfpbmkafpwyedpcowruntvymxtyyejqtajkcjakghtdwmuygecjncxzcxezgecrxonnszmqmecgvqqkdagvaaucewelchsmebikscciegzoiamovdojrmmwgbxeygibxxltemfgpogjkhobmhwquizuwvhfaiavsxhiknysdghcawcrphaykyashchyomklvghkyabxatmrkmrfsppfhgrwywtlxebgzmevefcqquvhvgounldxkdzndwybxhtycmlybhaaqvodntsvfhwcuhvuccwcsxelafyzushjhfyklvghpfvknprfouevsxmcuhiiiewcluehpmzrjzffnrptwbuhnyahrbzqvirvmffbxvrmynfcnupnukayjghpusewdwrbkhvjnveuiionefmnfxao")

// var countPrimes = function(n) {
//     if (n <= 1) { return 0 }
//     let arr = new Array(n).fill(0)
//     let count = 0
//     console.log(Math.sqrt(n))
//     for (let i = 2; i < Math.sqrt(n); i ++) {
//         if (arr[i] === 0) {
//             for (let j= i * i; j < n; j += i) {
//                 arr[j] = 1
//             }
//         }
//     }
//     console.log(arr)
//     count = arr.filter((item, index) => index !== 0 && item === 0).length  - 1
//     console.log(count)
//     return count
//   }
// countPrimes(2)

const isPrime = function (i) {
  for (let j = 2; j * j <= i; j++) {
    if (i % j === 0) {
      return false
    }
  }
  return true
}
const countPrimes = function (n) {
  let count = 0
  for (let i = 2; i < Math.sqrt(n); i++) {
    if (isPrime(i, Math.sqrt(n))) {
      count++
    }
  }
  return count
}
console.log(countPrimes(10))
