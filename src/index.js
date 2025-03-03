import { sample01, sample02, sample03 } from "./word.js";
import { rect_xywh, packFixedHeight } from "./packing.js";

const heightsProb = [
  { height: 20, prob: 0.85 },
  { height: 40, prob: 0.1 },
  { height: 60, prob: 0.05 },
];

function getWeightedHeight() {
  const r = Math.random();
  let cumulative = 0;

  for (let i = 0; i < heightsProb.length; i++) {
    cumulative += heightsProb[i].prob;
    if (r < cumulative) {
      return heightsProb[i].height;
    }
  }
  return heightsProb[heightsProb.length - 1].height;
}

/************************************************
  タイル作成関数
 ************************************************/
function createLoopTile(items, parent, offsetX, tileWidth, tileHeight) {
  const tileDiv = document.createElement("div");
  tileDiv.style.position = "absolute";
  tileDiv.style.left = offsetX + "px";
  tileDiv.style.top = "0px";
  tileDiv.style.width = tileWidth + "px";
  tileDiv.style.height = tileHeight + "px";

  items.forEach((it) => {
    const el = document.createElement("span");
    el.classList.add("loop-text");

    el.style.position = "absolute";
    el.style.left = it.x + "px";
    el.style.top = it.y + "px";
    el.style.width = it.w + "px";
    el.style.height = it.h + "px";
    el.textContent = it.text;

    // ★ 高さに応じてフォントサイズ & ボールド
    if (it.h === 20) {
      el.style.fontSize = "1em";
      el.style.fontWeight = "normal";
    } else if (it.h === 40) {
      el.style.fontSize = "1.75em";
      el.style.fontWeight = "normal";
    } else if (it.h === 60) {
      el.style.fontSize = "2em";
      el.style.fontWeight = "bold";
    }

    tileDiv.appendChild(el);
  });

  parent.appendChild(tileDiv);

  return {
    tileDiv,
    offset: offsetX,
    width: tileWidth,
    items,
  };
}

/************************************************
  ランダムアイテム生成
 ************************************************/
function getRandomItems(count) {
  let arr = [];
  for (let i = 0; i < count; i++) {
    //textはsample01, 02, 03からランダムに選ぶようにする
    const inx = Math.floor(Math.random() * 3);
    let text = "";
    if (inx === 0) text = sample01[Math.floor(Math.random() * sample01.length)];
    if (inx === 1) text = sample02[Math.floor(Math.random() * sample02.length)];
    if (inx === 2) text = sample03[Math.floor(Math.random() * sample03.length)];

    let h = getWeightedHeight();

    let scale = 1.0;
    if (h === 40) scale = 1.5;
    if (h === 60) scale = 1.75;

    let w = text.length * 20 * scale;

    let it = new rect_xywh(0, 0, w, h);
    it.text = text;
    arr.push(it);
  }
  return arr;
}

/************************************************
  メインスクリプト
 ************************************************/
const container = document.getElementById("loop-container");

let tileHeight = 180;

let itemsA = getRandomItems(30);
packFixedHeight(itemsA, tileHeight);
let widthA = itemsA.reduce((mx, it) => Math.max(mx, it.x + it.w), 0);
let tileA = createLoopTile(itemsA, container, 0, widthA, tileHeight);

let itemsB = getRandomItems(30);
packFixedHeight(itemsB, tileHeight);
let widthB = itemsB.reduce((mx, it) => Math.max(mx, it.x + it.w), 0);
let tileB = createLoopTile(itemsB, container, widthA, widthB, tileHeight);

let tiles = [tileA, tileB];

let speed = 1;
function animate() {
  requestAnimationFrame(animate);

  for (let i = 0; i < 2; i++) {
    let tile = tiles[i];
    tile.offset -= speed;
    tile.tileDiv.style.left = tile.offset + "px";

    // もし左端を消えたら -> 新タイル作って右へ回す
    if (tile.offset + tile.width < 0) {
      // 古いタイル削除
      container.removeChild(tile.tileDiv);

      // 新アイテム
      let newItems = getRandomItems(20);
      packFixedHeight(newItems, tileHeight);
      let newW = newItems.reduce((mx, it) => Math.max(mx, it.x + it.w), 0);

      // 相手タイル
      let other = tiles[1 - i];
      let newOffset = other.offset + other.width;

      // 新タイル作成
      tiles[i] = createLoopTile(
        newItems,
        container,
        newOffset,
        newW,
        tileHeight
      );
    }
  }
}
animate();
