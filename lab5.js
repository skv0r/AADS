function maxSlidingWindow(nums, k) {
    const maxValues = [];
    const indexes = [];

    for (let i = 0; i < nums.length; i++) {
        if (indexes.length && indexes[0] < i - k + 1) {
            indexes.shift();
        }

        while (indexes.length && nums[indexes[indexes.length - 1]] < nums[i]) {
            indexes.pop();
        }

        indexes.push(i);

        if (i >= k - 1) {
            maxValues.push(nums[indexes[0]]);
        }
    }

    return maxValues;
}


const nums = [10, 5, 7, 2, 0, 3, 1, 4, 9, 6, 11, 15, 14, 13, 12, 16, 18, 20];
const n = nums.length;
const m = 21;
console.log("Array: " + nums)
console.log("Window size: " + m)
console.log(maxSlidingWindow(nums, m)); 
