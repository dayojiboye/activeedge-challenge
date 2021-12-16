# About the challenge

## Demo

[Demo version](https://activedge-challenge.netlify.app/)

## Tools

Tools used include - Axios and React Loader Spinner

## Description

In the home page, the arstistes are being fetched as soon as the page is mounted and stored in the component's state. No general state management is used i.e no Redux or no Flux. The artiste's card holds a link to the Albums page and the Comments page.

In the albums page, the albums are fetched on page load and also stored in a state, along with the albums, the photos are fetched as well and I sort of merged the each photo with an album.

In the comments page, the user/artiste can create new comments and also delete or update an existing comments. Because the api is a fake rest api and doesn't really update or delete these posts, I manually had to delete from the state and also update corresponding comment manually.

# Exercise 2

## Solution

let firstMissingPositive = function(nums) {
let swap = function(i, j) {
let tmp = nums[i];
nums[i] = nums[j];
nums[j] = tmp;
};

    for (let i = 0; i < nums.length; i++) {
        while (0 < nums[i] && nums[i] - 1 < nums.length
                && nums[i] != i + 1
                && nums[i] != nums[nums[i] - 1]) {
            swap(i, nums[i] - 1);
        }
    }

    for (let i = 0; i < nums.length; i++) {
        if (nums[i] != i + 1) {
            return i + 1;
        }
    }
    return nums.length + 1;

};

console.log(firstMissingPositive([5, -1, -3])) // output 1
