
// const http = require('http')
// http.createServer((req, res) => {
//   console.log(req.method);
//   res.write('welcome from server');
//   res.end()
// }).listen(7501, () => {
//   console.log('listening on 7501');
// })


const express = require('express')
const app = express()



app.get("/:op/*", (req, res) => {
  let operation = req.params.op;
  let nums = req.params[0].split('/')
  console.log(nums)
  if (operation === 'add') {
    let sum = 0;
    nums.forEach((num) => {
      sum += +num;
    })
    res.send(`sum = ${sum}`);
  } else if (operation === 'sub') {
    let sub = nums[0];
    for (let i = 1; i < nums.length; i++) {
      sub -= +(nums[i]);
    }
    res.send(`sub = ${sub}`);
  } else if (operation === 'mul') {
    let mul = 1;
    nums.forEach((num) => {
      mul *= +num;
    })
    res.send(`mul = ${mul}`);
  } else if (operation === 'div') {
    let div = nums[0];
    for (let i = 1; i < nums.length; i++) {
      div /= +(nums[i]);
    }
    res.send(`div = ${div}`);
  }
  console.log(operation)
})
app.get("*", (req, res) => {
  res.send("you can add, sub, mul and division");
})
app.listen(7500, () => { console.log('Listening on port 7500') })