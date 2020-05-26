#!/usr/bin/env node

import { program } from 'commander';
// @ts-ignore
import { version } from '../package.json';
import translate from './main'
program
  .version(version)
  .name('to')
  .option('-d --dest <string>', "choose the language you want to translate")
  .action((option) => {
    const {args} = option
    if (!args.length) {
      giveDestExamples()
    } else {
      translate(option)
    }
  });

program.on('--help', () => {
  giveDestExamples()
});

const giveDestExamples = () => {
  console.info('-------------------');
  console.info('Example:');
  console.info('  $ to 你好');
  console.info('  $ to hello -d zh');
  console.info('-------------------');
  console.info('-d 可用列表');
  console.info({
    en: '英文（默认）',
    zh: '中文',
    cht: '繁体中文',
    yue: '粤语',
    wyw: '文言文',
    jp: '日语',
    kor: '含义',
    fra: '法语',
    it: '意大利语',
  });
}

program.parse(process.argv);
