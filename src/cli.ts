#!/usr/bin/env node

import { program } from 'commander';
// @ts-ignore
import { version } from '../package.json';
import translate from './main'
program
  .version( version )
  .name( 't' )
  .requiredOption( '-l, --lang <string>', 'choose target language', 'zh' )
  .action((option) => {
    const { args } = option

    args.length ? translate( option ) : giveDestExamples()
  });

program.on('--help', () => {
  giveDestExamples()
});

const giveDestExamples = () => {
  console.info( '-------------------' )
  console.info( 'Example:' )
  console.info( '  $ t hello' )
  console.info( '  $ t 你好 --lang en' )
  console.info( '-------------------' )
  console.info( '-l -lang 可用列表' )
  console.info( {
    '中文（默认）': 'zh',
    '英文'    : 'en',
    '繁体中文'  : 'cht',
    '粤语'    : 'yue',
    '文言文'   : 'wyw',
    '日语'    : 'jp',
    '含义'    : 'kor',
    '法语'    : 'fra',
    '意大利语'  : 'it'
  } )
}

program.parse(process.argv);
