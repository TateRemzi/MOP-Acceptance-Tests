/* globals gauge*/
"use strict";
const path = require('path');
const {
    openBrowser,
    write,
    closeBrowser,
    goto,
    press,
    screenshot,
    above,
    click,
    checkBox,
    listItem,
    waitFor,
    toLeftOf,
    link,
    text,
    into,
    textBox,
    image,
    goBack,
    setConfig,
    button,
    querySelector,
    evaluate
} = require('taiko');
const assert = require("assert");
const { Console } = require('console');
const headless = process.env.headless_chrome.toLowerCase() === 'true';
const endpoint = process.env.staging_endpoint;

beforeSuite(async () => {

    await openBrowser({
        headless: headless
    })
});

afterSuite(async () => {
    await closeBrowser();
});

// Return a screenshot file name
gauge.customScreenshotWriter = async function () {
    const screenshotFilePath = path.join(process.env['gauge_screenshots_dir'],
        `screenshot-${process.hrtime.bigint()}.png`);

    await screenshot({
        path: screenshotFilePath
    });
    return path.basename(screenshotFilePath);
};

step("Add search <item>", async (item) => {
    console.log("Typing search " + item)
    await write(item, into(textBox("Search use cases...")));
    await press('Enter');
});

step("Click <message>", async function (message) {
        await click(message);
});

step("GoBack", async function () {
    await goBack();
});

step("Open Web application",  function () {
    console.log("Open "+ endpoint)
     goto(endpoint);
});

step("Must not have <table>", async function (table) {
    for (var row of table.rows) {
        console.log("Verifing use case " + row.cells[0] + " don't exists")
        assert.ok(!await text(row.cells[0]).exists(0, 0));
    }
});

step("Confirm items in navigation bar <table>", async function (table) {
    for (var row of table.rows) {
        console.log("Verifing element " + row.cells[0])
        assert.ok(await text(row.cells[0]).exists(0, 0));
    }
});

step("Confirm image in navigation bar <message>", async function (message) {
    console.log("Verifing image " + message)
        assert.ok(await image({src:message}).exists(0, 0));
});

step("Confirm button in navigation bar <message>", async function (message) {
    console.log("Verifing button " + message)
        assert.ok(await link({href:message}).exists(0, 0));
});

step("Must display <message>", async function (message) {
    assert.ok(await text(message).exists(0, 0));
});

step("Must have Use cases <table>", async function (table) {
    for (var row of table.rows) {
        console.log("Verifying use case " + row.cells[0] + " exists")
        assert.ok(await text(row.cells[0]).exists());
    }
}); 

step("Must have <table>", async function (table) {
    for (var row of table.rows) {
        console.log("Verifying element " + row.cells[0] + " exists") 
        assert.ok(await text(row.cells[0]).exists());
    }
});

step('Wait for <time> second', async (time) => { 
    console.log("Waiting for " + time + " Seconds") 
    let ms = time * 1000
    await waitFor(ms);
});