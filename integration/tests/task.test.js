describe('Task snapshot test', () => {
  it('Is Not Done, visually looks correct', async () => {
    // APIs from jest-puppeteer
    await page.goto(
      'http://localhost:6006/iframe.html?args=&id=todolists-task--is-not-done&viewMode=story',
      { waitUntil: 'networkidle2' }
    )

    const image = await page.screenshot()

    // API from jest-image-snapshot
    expect(image).toMatchImageSnapshot()
  })
  it('Is Done, visually looks correct', async () => {
    // APIs from jest-puppeteer
    await page.goto(
      'http://localhost:6006/iframe.html?args=&id=todolists-task--is-done&viewMode=story',
      { waitUntil: 'networkidle2' }
    )

    const image = await page.screenshot()

    // API from jest-image-snapshot
    expect(image).toMatchImageSnapshot()
  })
  it('Base example, visually looks correct', async () => {
    // APIs from jest-puppeteer
    await page.goto(
      'http://localhost:6006/iframe.html?args=&id=todolists-task--base&viewMode=story',
      { waitUntil: 'networkidle2' }
    )

    const image = await page.screenshot()

    // API from jest-image-snapshot
    expect(image).toMatchImageSnapshot()
  })
})
