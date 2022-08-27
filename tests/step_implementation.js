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
    toLeftOf,
    link,
    text,
    into,
    textBox,
    image,
    button,
    evaluate
} = require('taiko');
const assert = require("assert");
const { Console } = require('console');
const headless = process.env.headless_chrome.toLowerCase() === 'true';

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

step("Add task <item>", async (item) => {
    await write(item, into(textBox("What needs to be done?")));
    await press('Enter');
});

step("View <type> tasks", async function (type) {
    await click(link(type));
});

step("Complete tasks <table>", async function (table) {
    for (var row of table.rows) {
        await click(checkBox(toLeftOf(row.cells[0])));
    }
});

step("Clear all tasks", async function () {
    await evaluate(() => localStorage.clear());
});

step("Open todo application", async function () {
    await goto("todo.taiko.dev");
});

step("Open Web application", async function () {
    await goto("https://mop-code-webapp-e5xbpzcnea-ts.a.run.app/");
});

step("Must not have <table>", async function (table) {
    for (var row of table.rows) {
        assert.ok(!await text(row.cells[0]).exists(0, 0));
    }
});

step("Confirm item in navigation bar <message>", async function (message) {
        assert.ok(await text(message.toString()).exists(0, 0));
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

step("Confirm search bar"), async function(){
    await evaluate($("/html/body/div[3]/section[2]/div[1]/div/input"), (element, args) =>{
        element.querySelector(args[0]).innerText = 'Search use cases...';
    })
}

step("Must display <message>", async function (message) {
    assert.ok(await text(message).exists(0, 0));
});

step("Add tasks <table>", async function (table) {
    for (var row of table.rows) {
        await write(row.cells[0]);
        await press('Enter');
    }
});

step("Must have <table>", async function (table) {
    for (var row of table.rows) {
        assert.ok(await text(row.cells[0]).exists());
    }
});