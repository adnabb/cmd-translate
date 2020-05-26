# 命令行翻译器

```
Usage: to [options]

Options:
  -V, --version       output the version number
  -d --dest <string>  choose the language you want to translate
  -h, --help          display help for command
-------------------
Example:
  $ to 你好
  $ to hello -d zh
-------------------
-d 可用列表
{
  en: '英文（默认）',
  zh: '中文',
  cht: '繁体中文',
  yue: '粤语',
  wyw: '文言文',
  jp: '日语',
  kor: '含义',
  fra: '法语',
  it: '意大利语'
}
```