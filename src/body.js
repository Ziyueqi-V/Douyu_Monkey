(function () {
  'use strict';

  // Your code here...
  const cssText = `
  /* CSS_PLACEHOLDER */
  `;
  GM_addStyle(cssText);

  const style = document.createElement('style')
  const hides = [
    // 导航栏 - 分类 - 视频 - 游戏
    '.public-DropMenu.Category',
    '.public-DropMenu.Video',
    '.public-DropMenu.Game',
    // 鱼乐盛典
    '.HeaderNav',
    // 付费礼物区
    // 'div.PlayerToolbar:first-child',
    // 房间活动
    '#js-room-activity',
    // 粉丝榜
    '.layout-Player-rank',
    // 友邻动态
    '.AnchorLike-ItemBox',
    // 底部
    '.layout-Bottom',
    // 房间信息, 活动
    '#js-player-title > div.Title > div.Title-roomInfo > div:nth-child(3)',
    // 房间信息, 热度
    '.Title-anchorHot',
    // 房间信息, 友邻
    '.Title-anchorFriendWrapper',
    // 房间信息, 商品橱窗
    '.Title-anchorLocation',
    // 房间信息, 成就点
    '.Title-sharkWeight',
    // 房间信息, 工会
    '.SociatyLabel',
    // 礼物栏
    '#js-player-toolbar .ToolbarActivityArea',
    '#js-player-toolbar .PlayerToolbar-GiftWrap',
    // '#js-player-toolbar .',
    // '#js-player-toolbar .',
    '#js-player-toolbar div:nth-child(2) div.PlayerToolbar-ContentCell.is-full div.PlayerToolbar-couponInfo',
    '#js-player-toolbar div:nth-child(2) div.PlayerToolbar-ContentCell.is-full div.PlayerToolbar-ywInfo',
    '#js-player-toolbar div:nth-child(2) div.PlayerToolbar-ContentCell.is-full div.PlayerToolbar-ycInfo',
    '#js-player-toolbar div:nth-child(2) div.PlayerToolbar-ContentCell.is-full div.PlayerToolbar-getYCArea',


  ].filter(Boolean)

  style.innerHTML = [
    `${hides.join(',')}{ display: none !important; }`,
  ].join('')

  document.body.appendChild(style)



  const cookies = document.cookie;
  // 可配多个主播房间号 每个房间每次送1个
  const roomarr = [156277];

  function send_ygb(roomid) {
    let myHeaders = new Headers();
    myHeaders.append("cookie", cookies);
    myHeaders.append("referer", "https://www.douyu.com/" + roomid);

    let requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("https://www.douyu.com/japi/prop/backpack/web/v1?rid=" + roomid, requestOptions)
      .then(response => response.json()).then(function (json) {
        console.log(`roomid = ${roomid} 礼物种数: ${json.data.list.length}`);
        if (json.data.list.length > 0) {
          send_gifts(json.data.list, roomid);
        }
      })

  }

  function send_gifts(gifts, roomid) {
    for (const gift of gifts) {
      if (gift.id == 268) {
        let myHeaders = new Headers();
        myHeaders.append("cookie", cookies);
        myHeaders.append("referer", "https://www.douyu.com/" + roomid);
        let urlencoded = new URLSearchParams();
        urlencoded.append("propId", "268");
        console.log('荧光棒个数:', gift.count);
        urlencoded.append("propCount", gift.count - 5); // 送1个, // gift.count);
        urlencoded.append("roomId", roomid);
        urlencoded.append("bizExt", "{\"yzxq\":{}}");
        let requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: urlencoded,
          redirect: 'follow'
        };
        fetch("https://www.douyu.com/japi/prop/donate/mainsite/v1", requestOptions)
          .then(response => response.text())
          .then(console.log)
          .catch(console.error);
      }
    }
  }

  (function () {
    'use strict';
    console.log('script loaded');
    roomarr.map(roomid => send_ygb(roomid));
  })();
})();