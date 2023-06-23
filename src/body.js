(function () {
  'use strict';

  // Your code here...
  const cssText = `
  /* CSS_PLACEHOLDER */
  `;
  GM_addStyle(cssText);

  const style = document.createElement('style')
  const hides = [
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
})();