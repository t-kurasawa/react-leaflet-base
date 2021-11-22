# OpenStreetMap は地図の Wikipedia です

OpenStreetMap は、2004年に始まりました。
オープンライセンスの下で誰でも自由に地図を使えるよう、みんなで作る地図です。
まさに現代の伊能忠敬とも言えるプロジェクトですね。

商用・非商用を問わずにデータの自由な利用と再配布なオープンデータベースライセンス (ODbL) 1.0 で運営されています。

https://www.openstreetmap.org/

# Web 地図の選択肢

Web サイトで地図情報を提供してくれるサービスは数多くあります。
代表的なものを３つほど比較すると以下のようになります。

| 地図 | 認知度 | 情報量 | 利便性 | ライセンス | 料金 |
|:-|:-:|:-:|:-:|:-:|:-:|
| Google マップ  | ◎ | ◎ | ◎ | △ | △ |
| OpenStreetMap | △ | ◯ | ◯ | ◎ | ◎ |
| 国土地理院  | △ | ◯ | ◯ | ◎ | ◎ |


地図は著作物なので、著作権ライセンスや料金に関してはご自身の利用用途に合わせてご確認頂くのがよいでしょう。例えば Google マップの地図を印刷して配布する場合にもライセンス上の注意事項があります。

> 印刷物での使用
Google マップと Google Earth には、印刷機能または（Earth Studio への）書き出し機能が備わっています。商用目的でなければコンテンツを印刷し、拡大する（地図に道順を表示するなど）ことができます。コンテンツを含む印刷物を配布する場合は、最初に上記の一般的なガイドラインをお読みになり、特にフェアユースと権利帰属に関する規約にご留意ください。
[Google マップ & Google Earth ガイドライン](https://www.google.com/intl/ja/permissions/geoguidelines/)

OpenStreetMap のライセンスに関しては OpenStreetMap Foundation Japan の坂ノ下さんの資料にてわかりやすく書かれているのでご一読ください。

https://speakerdeck.com/barsaka2/not-a-map-openstreetmap?slide=6

このように Google マップや OpenStreetMap をはじめとした地図サービスにも一長一短があります。ビジネスの場と、公（研究・行政）の場では使い分けることが多いのかと思います。

# オープンデータ である OpenStreetMap の活用方法

OpenStreetMap には大きく「使う」と「作る」という２つの活用方法があります。
地図を使いたいときはスマホやパソコンで以下のサイトを訪れてみてください。すぐにでも使い始めることが出来ます。

https://www.openstreetmap.org/

地図を作るときの様子については、青山学院大学の古橋大地教授の説明動画を見て頂くとわかりやすいかと思います。このような形で世界中のマッパーと言われる有志が日々オープンデータの地図を更新していっています。

https://www.youtube.com/watch?v=kPu5w-uVmrE

https://www.youtube.com/watch?v=sWN_BTxXsQQ


# OpenStreetMap の活用事例

ポケモンGO や Instagram といった身近なアプリや Tesla のカーナビの地図データにも OpenStreetMap のデータが活用されています。
また、地図というと２次元をイメージしますが、東京都では OpenStreetMap のデータを活用してデジタルツイン実現プロジェクトに取り組み始めています。

https://info.tokyo-digitaltwin.metro.tokyo.lg.jp/

このようにオープンなデータであるからこそ様々な領域で活用され、そしてその活用データが再び蓄積されていく。そういった好循環が生まれていくのがオープンな世界なのでしょう。

# OpenStreetMap のデータを扱うための API 

[Overpass API](https://wiki.openstreetmap.org/wiki/JA:Overpass_API) は [OpenStreetMap に登録されているデータ](https://wiki.openstreetmap.org/wiki/JA:Map_Features)なら何でも扱うことができる API です。
データを得るためには XML や[Overpass QL](https://wiki.openstreetmap.org/wiki/JA:Overpass_API/Overpass_QL) 形式のクエリを投げて結果を取得します。[Overpass turbo](https://overpass-turbo.eu/) というサイトでクエリを試すことが出来ます。ちょっとクエリが面倒だと感じたかと思います。私もそうです。そんな時は Leaflet という Web 地図のための JavaScript ライブラリを利用すると楽に実装出来ます。

https://www.npmjs.com/package/leaflet

Leaflet + OpenStreetMap の[公式チュートリアル](https://leafletjs.com/examples/quick-start/)を見て頂くのがよいでしょう。Leaflet 自体は地図を表示するためのライブラリ（CSS,JS）で、地図データ自体は OpenStreetMap や Google マップ や国土地理院から呼び出します。

# React Leaflet 

Leaflet だけでも十分便利なのですが、モダンな Javascript 環境に慣れている人は React で開発がしたいと思います。そんな方は React と Leaflet を繋いでくれる React Leaflet を使うのが良いでしょう。

https://www.npmjs.com/package/react-leaflet

![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/127260/66152b2e-2f77-8f92-467d-34db359a35db.png)

# 実装

それでは、React + Leaflet + Typescript で OpenStreetMap 地図データを表示するサンプルを実装してみます。

まずは環境を作り、必要なライブラリを入れます。

```
npx create-react-app react-leaflet-prac --template typescript
cd react-leaflet-prac

yarn add leaflet react-leaflet
yarn add -D @types/leaflet @types/react-leaflet
```

アプリを実装します。

```App.tsx
import React from 'react';
import { MapContainer, TileLayer,Marker,Popup  } from "react-leaflet";
import Leaflet, { LatLng } from "leaflet";
import "leaflet/dist/leaflet.css";
import './App.css';

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

function App() {
  const position = new LatLng(35.688408, 139.692005)

  const DefaultIcon = Leaflet.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
  });
  Leaflet.Marker.prototype.options.icon = DefaultIcon;

  return (
    <div className="App">
      <MapContainer center={position} zoom={15} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default App;
```


```App.css
.App {
  text-align: center;
  height: 100vh;
}

.leaflet-container {
  width: 100vw;
  height: 100vh;
}
```

```package.json
{
  "name": "react-leaflet-prac",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@testing-library/jest-dom": "^5.11.4",
    "@testing-library/react": "^11.1.0",
    "@testing-library/user-event": "^12.1.10",
    "@types/jest": "^26.0.15",
    "@types/node": "^12.0.0",
    "@types/react": "^17.0.0",
    "@types/react-dom": "^17.0.0",
    "leaflet": "^1.7.1",
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "react-leaflet": "^3.2.2",
    "react-scripts": "4.0.3",
    "typescript": "^4.1.2",
    "web-vitals": "^1.0.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": [
      ">0.2%",
      "not dead",
      "not op_mini all"
  ],
  "devDependencies": {
    "@types/leaflet": "^1.7.6",
    "@types/react-leaflet": "^2.8.2"
  }
}
```

以下サイトでも言及されていますが、いくつか注意点があります。
・CSS やマーカーアイコンを明示的に読み込みしないと表示されません。
・browserslist を変更し、トランスパイルの対象とするブラウザを変えることでビルドのエラーを回避する必要があります。

https://qiita.com/honda28/items/e4c73c916e4d9b2ec279

https://zenn.dev/tris/articles/2021-10-react-leaflet-ts-gsi#%E5%AE%9F%E8%A1%8C%E3%81%A8%E3%82%B3%E3%83%B3%E3%83%91%E3%82%A4%E3%83%AB%E3%82%A8%E3%83%A9%E3%83%BC%E3%81%AE%E8%A7%A3%E6%B6%88

このようにして React で OpenStreetMap を表示することが出来ました。

![image.png](https://camo.qiitausercontent.com/325d887e6888023a16f630654c8b9eed051d973f/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e61702d6e6f727468656173742d312e616d617a6f6e6177732e636f6d2f302f3132373236302f62656561313164662d393664392d363434382d626131662d3336663338353762373064662e706e67)

# Github にサンプルコードを公開しましたのでご活用ください

https://github.com/t-kurasawa/react-leaflet-base

```
git clone https://github.com/t-kurasawa/react-leaflet-base.git
yarn install
yarn start
```

# Qiita にも同様の解説記事を掲載しています

https://qiita.com/t-kurasawa/items/03e5bc9c9a07d8ff99b7
