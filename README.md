# Overview
“dFund”は、NFTやSTOに対して、中央管理者を介在しない集団投資スキーム(ファンド)を提供します。  
従来のファンドは販売会社、委託会社、信託会社といった機能毎に機関が分かれているスキームが多く、多額の手数料が発生する、各機能が各金融機関で集中的に管理されているといった課題があります。  
dFundでは、コミュニティ参加者の出資を元手として様々なトークンに投資するファンドを組成するスキームをスマートコントラクト上に実装することで、上記の課題解決を目指します。
ファンドの組成を希望するコミュニティ参加者が予め投資対象（原資産）、募集期間、買付期間、満期日を設定し、以下のライフサイクルに従って自動でファンドを運用します。

1. 募集期間：出資者を募集
2. 買付期間：出資金をもとに原資産の買付を実施
    * 約定成立：本ファンドのトークンを新規に発行し、出資額に応じて配分
    * 約定不成立：手数料を除いた出資金を返金し終了
3. 取引期間：本ファンドのトークンを自由に取引
4. 満期日：原資産を売却しファンドトークン数に応じて売却金を配分

# 使用したtech stacks 
* Vue.js
* Azure static web app
* Github actions
* Solidity

# 使用したBlockchain 
* Ethereum(Goerli)

# deployしたContract
なし  
(アプリケーション内で生成されるため)

# application codeやその他のfile 
* 本リポジトリ（https://github.com/web3mini-investment/frontend）
* SmartContract開発用リポジトリ（https://github.com/web3mini-investment/contracts）

# テスト手順を含むリポジトリへのリンク 
本リポジトリ
https://github.com/web3mini-investment/frontend/blob/main/TokyoWeb3Hackathon_dFund_テスト手順.pdf

# 審査やテストのためにプロジェクトにアクセスする方法など
* アプリケーション：https://yellow-tree-00aeb2f10.2.azurestaticapps.net/
* 本リポジトリ：https://github.com/web3mini-investment/frontend
* コンセプト：https://github.com/web3mini-investment/frontend/blob/main/TokyoWeb3Hackathon_dFund_Concept.pdf
