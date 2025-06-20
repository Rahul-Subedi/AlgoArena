const mongoose = require("mongoose");
const Problem = require("./models/problem"); // adjust path

mongoose.connect("mongodb+srv://rahulsubedi20004:Rahool%402004@cluster0.l6f72va.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

const newProblems = [
  // ⭐ Easy (10)
  {
    title: "Binary Search",
    description: "Given a sorted array nums and a target, return the index if found; otherwise return -1.",
    difficulty: "Easy",
    inputFormat: "nums = [-1,0,3,5,9,12], target = 9",
    outputFormat: "4",
    sampleInput: "nums = [-1,0,3,5,9,12], target = 9",
    sampleOutput: "4",
    testCases: [
      { input: "nums = [-1,0,3,5,9,12], target = 2", output: "-1" },
      { input: "nums = [5], target = 5", output: "0" }
    ],
    timeLimit: 1000,
    memoryLimit: 128
  },
  {
    title: "Best Time to Buy and Sell Stock",
    description: "Given prices, maximize profit by choosing a single buy-sell transaction.",
    difficulty: "Easy",
    inputFormat: "prices = [7,1,5,3,6,4]",
    outputFormat: "5",
    sampleInput: "prices = [7,1,5,3,6,4]",
    sampleOutput: "5",
    testCases: [
      { input: "prices = [7,6,4,3,1]", output: "0" },
      { input: "prices = [1,2]", output: "1" }
    ],
    timeLimit: 1000,
    memoryLimit: 128
  },
  {
    title: "Single Number",
    description: "Every element appears twice except one. Find that single one.",
    difficulty: "Easy",
    inputFormat: "nums = [2,2,1]",
    outputFormat: "1",
    sampleInput: "nums = [2,2,1]",
    sampleOutput: "1",
    testCases: [
      { input: "nums = [4,1,2,1,2]", output: "4" },
      { input: "nums = [1]", output: "1" }
    ],
    timeLimit: 1000,
    memoryLimit: 128
  },
  {
    title: "Intersection of Two Arrays II",
    description: "Return the intersection of two arrays including duplicates.",
    difficulty: "Easy",
    inputFormat: "nums1 = [1,2,2,1], nums2 = [2,2]",
    outputFormat: "[2,2]",
    sampleInput: "nums1 = [1,2,2,1], nums2 = [2,2]",
    sampleOutput: "[2,2]",
    testCases: [
      { input: "nums1 = [4,9,5], nums2 = [9,4,9,8,4]", output: "[4,9]" },
      { input: "nums1 = [], nums2 = [1,2]", output: "[]" }
    ],
    timeLimit: 1000,
    memoryLimit: 128
  },
  {
    title: "Pascal's Triangle",
    description: "Generate the first numRows of Pascal's triangle.",
    difficulty: "Easy",
    inputFormat: "numRows = 5",
    outputFormat: "[[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]",
    sampleInput: "numRows = 5",
    sampleOutput: "[[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]",
    testCases: [
      { input: "numRows = 1", output: "[[1]]" },
      { input: "numRows = 2", output: "[[1],[1,1]]" }
    ],
    timeLimit: 1000,
    memoryLimit: 128
  },
  {
    title: "Valid Palindrome",
    description: "Determine if a string is a palindrome, ignoring non-alphanumerics and case.",
    difficulty: "Easy",
    inputFormat: "s = \"A man, a plan, a canal: Panama\"",
    outputFormat: "true",
    sampleInput: "s = \"race a car\"",
    sampleOutput: "false",
    testCases: [
      { input: "s = \" \"", output: "true" },
      { input: "s = \"0P\"", output: "false" }
    ],
    timeLimit: 1000,
    memoryLimit: 128
  },
  {
    title: "Merge Sorted Array",
    description: "Merge two sorted arrays nums1 and nums2 into nums1 as one sorted array.",
    difficulty: "Easy",
    inputFormat: "nums1 = [1,2,3,0,0,0], m=3, nums2=[2,5,6], n=3",
    outputFormat: "[1,2,2,3,5,6]",
    sampleInput: "nums1 = [1], m=1, nums2=[], n=0",
    sampleOutput: "[1]",
    testCases: [
      { input: "nums1 = [0], m=0, nums2=[1], n=1", output: "[1]" },
      { input: "nums1 = [1], m=1, nums2=[2], n=1", output: "[1,2]" }
    ],
    timeLimit: 1000,
    memoryLimit: 128
  },
  {
    title: "Remove Duplicates from Sorted Array",
    description: "Remove duplicates in-place and return new length.",
    difficulty: "Easy",
    inputFormat: "nums = [1,1,2]",
    outputFormat: "2",
    sampleInput: "nums = [0,0,1,1,1,2,2,3,3,4]",
    sampleOutput: "5",
    testCases: [
      { input: "nums = []", output: "0" },
      { input: "nums = [1,1,1]", output: "2" }
    ],
    timeLimit: 1000,
    memoryLimit: 128
  },
  {
    title: "Plus One",
    description: "Given a non-empty array of digits representing a non-negative integer, add one to the integer.",
    difficulty: "Easy",
    inputFormat: "digits = [1,2,3]",
    outputFormat: "[1,2,4]",
    sampleInput: "digits = [4,3,2,1]",
    sampleOutput: "[4,3,2,2]",
    testCases: [
      { input: "digits = [9]", output: "[1,0]" },
      { input: "digits = [9,9]", output: "[1,0,0]" }
    ],
    timeLimit: 1000,
    memoryLimit: 128
  },
  {
    title: "Sqrt(x)",
    description: "Implement int sqrt(int x). Return floor of √x.",
    difficulty: "Easy",
    inputFormat: "x = 4",
    outputFormat: "2",
    sampleInput: "x = 8",
    sampleOutput: "2",
    testCases: [
      { input: "x = 0", output: "0" },
      { input: "x = 1", output: "1" }
    ],
    timeLimit: 1000,
    memoryLimit: 128
  },

  // 👇 Medium (10)
  {
    title: "Top K Frequent Elements",
    description: "Return the k most frequent elements in nums.",
    difficulty: "Medium",
    inputFormat: "nums = [1,1,1,2,2,3], k = 2",
    outputFormat: "[1,2]",
    sampleInput: "nums = [1], k = 1",
    sampleOutput: "[1]",
    testCases: [
      { input: "nums = [3,0,1,0], k = 1", output: "[0]" },
      { input: "nums = [1,2], k = 2", output: "[1,2]" }
    ],
    timeLimit: 2000,
    memoryLimit: 256
  },
  {
    title: "Product of Array Except Self",
    description: "Return array where each index is product of all others.",
    difficulty: "Medium",
    inputFormat: "nums = [1,2,3,4]",
    outputFormat: "[24,12,8,6]",
    sampleInput: "nums = [-1,1,0,-3,3]",
    sampleOutput: "[0,0,0,0]",
    testCases: [
      { input: "nums = [2,3,4]", output: "[12,8,6]" },
      { input: "nums = [1,1,1,1]", output: "[1,1,1,1]" }
    ],
    timeLimit: 2000,
    memoryLimit: 256
  },
  {
    title: "Valid Sudoku",
    description: "Determine if a 9x9 Sudoku board is valid.",
    difficulty: "Medium",
    inputFormat: "board = [[...9x9]]",
    outputFormat: "true",
    sampleInput: "board with duplicate in row",
    sampleOutput: "false",
    testCases: [
      { input: "board with duplicate in column", output: "false" },
      { input: "board with duplicate in sub-box", output: "false" }
    ],
    timeLimit: 2000,
    memoryLimit: 256
  },
  {
    title: "Search in Rotated Sorted Array",
    description: "Search target in rotated sorted array; return index or -1.",
    difficulty: "Medium",
    inputFormat: "nums = [4,5,6,7,0,1,2], target = 0",
    outputFormat: "4",
    sampleInput: "nums = [4,5,6,7,0,1,2], target = 3",
    sampleOutput: "-1",
    testCases: [
      { input: "nums = [1], target = 0", output: "-1" },
      { input: "nums = [1], target = 1", output: "0" }
    ],
    timeLimit: 2000,
    memoryLimit: 256
  },
  {
    title: "Longest Increasing Subsequence",
    description: "Return length of LIS in an integer array.",
    difficulty: "Medium",
    inputFormat: "nums = [10,9,2,5,3,7,101,18]",
    outputFormat: "4",
    sampleInput: "nums = [0,1,0,3,2,3]",
    sampleOutput: "4",
    testCases: [
      { input: "nums = [7,7,7,7]", output: "1" },
      { input: "nums = [1,3,6,7,9,4,10,5,6]", output: "6" }
    ],
    timeLimit: 2000,
    memoryLimit: 256
  },
  {
    title: "Word Ladder",
    description: "Return the length of shortest transformation sequence from beginWord to endWord.",
    difficulty: "Medium",
    inputFormat: "beginWord = \"hit\", endWord = \"cog\", wordList = [...]",
    outputFormat: "5",
    sampleInput: "beginWord=\"hit\", endWord=\"hot\", wordList=[\"hot\",\"dot\"]",
    sampleOutput: "2",
    testCases: [
      { input: "beginWord=\"a\", endWord=\"c\", wordList=[\"a\",\"b\",\"c\"]", output: "2" },
      { input: "no valid path", output: "0" }
    ],
    timeLimit: 2000,
    memoryLimit: 256
  },
  {
    title: "Combination Sum",
    description: "Find all unique combinations in candidates where numbers sum to target.",
    difficulty: "Medium",
    inputFormat: "candidates = [2,3,6,7], target = 7",
    outputFormat: "[[7],[2,2,3]]",
    sampleInput: "candidates = [2], target = 1",
    sampleOutput: "[]",
    testCases: [
      { input: "candidates = [2,3,5], target = 8", output: "[[2,2,2,2],[2,3,3]]" },
      { input: "[], target=0", output: "[[]]" }
    ],
    timeLimit: 2000,
    memoryLimit: 256
  },
  {
    title: "Number of Islands",
    description: "Count islands (1s) in 2D grid.",
    difficulty: "Medium",
    inputFormat: "grid = [[\"1\",\"1\",\"0\",\"0\"],[...]]",
    outputFormat: "1",
    sampleInput: "grid with two separate islands",
    sampleOutput: "2",
    testCases: [
      { input: "all water grid", output: "0" },
      { input: "single cell island", output: "1" }
    ],
    timeLimit: 2000,
    memoryLimit: 256
  },
  {
    title: "Course Schedule",
    description: "Determine if you can finish all courses given prerequisites (cycle detection in graph).",
    difficulty: "Medium",
    inputFormat: "numCourses = 2, prerequisites = [[1,0]]",
    outputFormat: "true",
    sampleInput: "numCourses = 2, prerequisites = [[1,0],[0,1]]",
    sampleOutput: "false",
    testCases: [
      { input: "no prerequisites", output: "true" },
      { input: "simple cycle", output: "false" }
    ],
    timeLimit: 2000,
    memoryLimit: 256
  },
  {
    title: "Pow(x, n)",
    description: "Implement pow(x, n) to calculate x raised to n.",
    difficulty: "Medium",
    inputFormat: "x = 2.00000, n = 10",
    outputFormat: "1024.00000",
    sampleInput: "x = 2.10000, n = 3",
    sampleOutput: "9.26100",
    testCases: [
      { input: "x = 2.00000, n = -2", output: "0.25000" },
      { input: "x = 0.00001, n = 2147483647", output: "0.00000" }
    ],
    timeLimit: 2000,
    memoryLimit: 128
  },

  // 👇 Hard (10)
  {
    title: "Merge k Sorted Lists",
    description: "Merge k sorted linked lists and return it as one sorted list.",
    difficulty: "Hard",
    inputFormat: "lists = [[1,4,5],[1,3,4],[2,6]]",
    outputFormat: "[1,1,2,3,4,4,5,6]",
    sampleInput: "lists = []",
    sampleOutput: "[]",
    testCases: [
      { input: "one empty list", output: "list" },
      { input: "lists with nulls", output: "merged list" }
    ],
    timeLimit: 2000,
    memoryLimit: 256
  },
  {
    title: "Binary Tree Maximum Path Sum",
    description: "Find maximum path sum in binary tree, path can start/end anywhere.",
    difficulty: "Hard",
    inputFormat: "root = [1,2,3]",
    outputFormat: "6",
    sampleInput: "root = [-10,9,20,null,null,15,7]",
    sampleOutput: "42",
    testCases: [
      { input: "single node", output: "node value" },
      { input: "negative values only", output: "max node" }
    ],
    timeLimit: 2000,
    memoryLimit: 256
  },
  {
    title: "Median of Two Sorted Arrays",
    description: "Find median of two sorted arrays in O(log(m+n)).",
    difficulty: "Hard",
    inputFormat: "nums1 = [1,3], nums2 = [2]",
    outputFormat: "2.00000",
    sampleInput: "nums1 = [1,2], nums2 = [3,4]",
    sampleOutput: "2.50000",
    testCases: [
      { input: "empty+single array", output: "value" },
      { input: "odd total length", output: "median" }
    ],
    timeLimit: 2000,
    memoryLimit: 256
  },
  {
    title: "Word Search",
    description: "Given board and word, return true if word exists in the grid.",
    difficulty: "Hard",
    inputFormat: "board = [[...]], word = \"ABCCED\"",
    outputFormat: "true",
    sampleInput: "word = \"SEE\"",
    sampleOutput: "true",
    testCases: [
      { input: "word = \"ABCB\"", output: "false" },
      { input: "1x1 grid matches", output: "true" }
    ],
    timeLimit: 2000,
    memoryLimit: 256
  },
  {
    title: "N-Queens",
    description: "Return all distinct solutions to the N-Queen puzzle.",
    difficulty: "Hard",
    inputFormat: "n = 4",
    outputFormat: "[[\".Q..\",\"...Q\",\"Q...\",\"..Q.\"]]",
    sampleInput: "n = 1",
    sampleOutput: "[[\"Q\"]]",
    testCases: [
      { input: "n = 2", output: "[]" },
      { input: "n = 3", output: "[]" }
    ],
    timeLimit: 2000,
    memoryLimit: 256
  },
  {
    title: "Trapping Rain Water",
    description: "Given heights, compute trapped rain water.",
    difficulty: "Hard",
    inputFormat: "height = [0,1,0,2,1,0,1,3,2,1,2,1]",
    outputFormat: "6",
    sampleInput: "height = [4,2,0,3,2,5]",
    sampleOutput: "9",
    testCases: [
      { input: "flat area", output: "0" },
      { input: "descending bars", output: "0" }
    ],
    timeLimit: 2000,
    memoryLimit: 256
  },
  {
    title: "Word Ladder II",
    description: "Return all shortest transformation sequences from beginWord to endWord.",
    difficulty: "Hard",
    inputFormat: "beginWord=\"hit\", endWord=\"cog\", wordList=[...]",
    outputFormat: "[[\"hit\",\"hot\",\"dot\",\"dog\",\"cog\"]]",
    sampleInput: "simple path",
    sampleOutput: "sequence",
    testCases: [
      { input: "no path", output: "[]" },
      { input: "multiple answers", output: "all sequences" }
    ],
    timeLimit: 2000,
    memoryLimit: 256
  },
  {
    title: "Minimum Window Substring",
    description: "Given s and t, find min window in s which will contain all chars in t.",
    difficulty: "Hard",
    inputFormat: "s = \"ADOBECODEBANC\", t = \"ABC\"",
    outputFormat: "\"BANC\"",
    sampleInput: "s=\"a\", t=\"a\"",
    sampleOutput: "\"a\"",
    testCases: [
      { input: "no window", output: "\"\"" },
      { input: "multiple minimum windows", output: "first min window" }
    ],
    timeLimit: 2000,
    memoryLimit: 256
  },
  {
    title: "Serialize and Deserialize Binary Tree",
    description: "Design codec to serialize and deserialize a binary tree.",
    difficulty: "Hard",
    inputFormat: "root = [1,2,3,null,null,4,5]",
    outputFormat: "reconstructed tree",
    sampleInput: "empty tree",
    sampleOutput: "null",
    testCases: [
      { input: "single node", output: "node" },
      { input: "complex tree", output: "same structure" }
    ],
    timeLimit: 2000,
    memoryLimit: 256
  },
  {
    title: "Sliding Window Maximum",
    description: "Return max value in each sliding window of size k.",
    difficulty: "Hard",
    inputFormat: "nums = [1,3,-1,-3,5,3,6,7], k = 3",
    outputFormat: "[3,3,5,5,6,7]",
    sampleInput: "nums=[1], k=1",
    sampleOutput: "[1]",
    testCases: [
      { input: "k equal n", output: "max of array" },  
      { input: "all elements same", output: "same outputs" }
    ],
    timeLimit: 2000,
    memoryLimit: 256
  },
];

async function seed() {
  try {
    await Problem.insertMany(newProblems);
    console.log("✅ Inserted 30 new real DSA problems");
  } catch (e) {
    console.error("❌ Seed failed", e);
  } finally {
    mongoose.connection.close();
  }
}

seed();
