// var searchRange = function(nums, target) {
//     const firstIndex = nums.indexOf(target)
//     const lastIndex = nums.lastIndexOf(target)
//     console.log(firstIndex, lastIndex)
//     return [firstIndex, lastIndex]
// };
const getIndex = function (nums, target, left) {
  let low = 0; let high = nums.length - 1; let mid = 0; let result = nums.length
  while (low <= high) {
    mid = Math.floor((low + high) / 2)
    if (nums[mid] > target || (left && nums[mid] >= target)) {
      high = mid - 1
      result = mid
    } else {
      low = mid + 1
    }
  }
  return result
}

const searchRange = function (nums, target) {
  const leftIndex = getIndex(nums, target, true) // 寻找第一个大于等于target的下标
  const rightIndex = getIndex(nums, target, false) - 1 // 寻找第一个大于target的下标
  let result = [-1, -1]
  if (nums[leftIndex] === target && nums[rightIndex] === target) {
    result = [leftIndex, rightIndex]
  }
  console.log(result)
  return result
}

searchRange([5, 7, 7, 8, 8, 10], 8)
