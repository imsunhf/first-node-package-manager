#! /usr/bin/env node
const commander = require('commander')
const prompts = require('prompts')
commander
  .option('-s, --ss', 'output s')
  .option('-h, --hh', 'output h')
  .option('-f, --ff', 'output f')
commander.parse(process.argv)
if (commander.ss) {
  prompts({
    type: 'text',
    name: 'name',
    message: 'input your name',
  }).then((res) => {
    console.log(res)
  })
}