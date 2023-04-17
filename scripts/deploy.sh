#!/usr/bin/env sh

yarn build storybook ./&&
cd storybook-static &&
git init &&
git add . &&
git commit -m deploy &&
git remote add origin git@gitee.com:yilunyuwan/RUI.git &&
git push -uf origin master:gh-pages &&
cd -;
