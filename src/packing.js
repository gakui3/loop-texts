function rect_wh(w, h) {
  this.w = w | 0;
  this.h = h | 0;
}
rect_wh.prototype = {
  area: function () {
    return this.w * this.h;
  },
};

function rect_ltrb(l, t, r, b) {
  this.l = l | 0;
  this.t = t | 0;
  this.r = r | 0;
  this.b = b | 0;
}
rect_ltrb.prototype = {
  w: function () {
    return (this.r - this.l) | 0;
  },
  h: function () {
    return (this.b - this.t) | 0;
  },
};

function rect_xywh(x, y, w, h) {
  this.x = x | 0;
  this.y = y | 0;
  this.w = w | 0;
  this.h = h | 0;
}
rect_xywh.prototype = {
  r: function () {
    return (this.x + this.w) | 0;
  },
  b: function () {
    return (this.y + this.h) | 0;
  },

  fits: function (spaceRectWH) {
    return this.w <= spaceRectWH.w && this.h <= spaceRectWH.h;
  },
};

function node(rc_ltrb) {
  this.rc = rc_ltrb;
  this.filled = false;
  this.c0 = null;
  this.c1 = null;
}

node.prototype = {
  insert: function (rxywh) {
    // 既に子があれば子に試す
    if (this.c0 && this.c1) {
      var newn = this.c0.insert(rxywh); // まず下へ
      if (newn) return newn;
      return this.c1.insert(rxywh); // ダメなら右へ
    }
    // 埋まっているノードは不可
    if (this.filled) return null;

    // ノードの幅・高さ
    var nodeW = this.rc.w();
    var nodeH = this.rc.h();

    if (rxywh.w > nodeW || rxywh.h > nodeH) {
      return null;
    }

    this.filled = true;
    rxywh.x = this.rc.l;
    rxywh.y = this.rc.t;

    // 残り領域を「下→右」で分割
    this.c0 = new node(
      new rect_ltrb(this.rc.l, this.rc.t + rxywh.h, this.rc.r, this.rc.b)
    );
    this.c1 = new node(
      new rect_ltrb(
        this.rc.l + rxywh.w,
        this.rc.t,
        this.rc.r,
        this.rc.t + rxywh.h
      )
    );
    return this;
  },
};

function bin(width, height) {
  this.root = new node(new rect_ltrb(0, 0, width, height));
  this.size = new rect_wh(width, height);
}

/**************************************************
  ギロチン分割でパッキング
 **************************************************/
function packFixedHeight(items, fixedH) {
  var myBin = new bin(1, fixedH);

  items.sort(function (a, b) {
    return b.w * b.h - a.w * a.h;
  });

  // すべて挿入トライ
  for (var i = 0; i < items.length; i++) {
    var inserted = myBin.root.insert(items[i]);
    if (!inserted) {
      // 入らない場合は拡張
      myBin.size.w += items[i].w;
      myBin.root = new node(new rect_ltrb(0, 0, myBin.size.w, myBin.size.h));

      // やり直し
      for (var j = 0; j <= i; j++) {
        var retry = myBin.root.insert(items[j]);
        if (!retry) {
          myBin.size.w += 50;
          myBin.root = new node(
            new rect_ltrb(0, 0, myBin.size.w, myBin.size.h)
          );
          j = -1;
        }
      }
    }
  }

  return myBin;
}

export { rect_xywh, packFixedHeight };
