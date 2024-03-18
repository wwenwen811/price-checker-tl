const puppeteer = require('puppeteer');

async function getTrainTicketPrice(fromStation, toStation, date) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // 进入12306网站
  await page.goto('https://www.12306.cn/index/');

  // 模拟用户输入出发站、到达站和日期
  await page.type('#fromStationText', fromStation);
  await page.type('#toStationText', toStation);
  await page.type('#train_date', date);

  // 模拟用户点击查询按钮
  await page.click('#search_one');

  // 等待查询结果加载完成
  await page.waitForSelector('.ticket-info');

  // 获取查询结果中的价格信息
  const priceElement = await page.$('.ticket-info .price');
  const price = await page.evaluate(element => element.textContent, priceElement);

  console.log('Ticket Price:', price);

  await browser.close();

  return price;
}

module.exports = {
  getTrainTicketPrice
};
