const path = require('path');
const express = require('express');
const router = express.Router();

module.exports = router;

router.get('/', (__, res) => {
    console.log('This is the homepage\n');
    res.sendFile(path.join(__dirname, '/../public/html/index.html'));
});

router.get('/20ItemsOrLess', (__, res) => {
    console.log('items with 20 units or less\n');
    res.sendFile(path.join(__dirname, '/../public/html/20ItemsOrLess.html'));
});

router.get('/newItem', (__, res) => {
    console.log('add a new item page\n');
    res.sendFile(path.join(__dirname, '/../public/html/newItem.html'));
});

router.get('/addUnits', (__, res) => {
    console.log('add units to a item\n');
    res.sendFile(path.join(__dirname, '/../public/html/addUnits.html'));
});

router.get('/newitemsuccess', (__, res) => {
    console.log('new item added success page\n');
    res.sendFile(path.join(__dirname, '/../public/html/newItemSuccess.html'));
});

router.get('/addinventorysuccess', (__, res) => {
    console.log('added inventory success page\n');
    res.sendFile(path.join(__dirname, '/../public/html/addinventorysuccess.html'));
});

router.get('/deleteitem', (__, res) => {
    console.log('delete item page\n');
    res.sendFile(path.join(__dirname, '/../public/html/deleteitem.html'));
});

router.get('/error', (__, res) => {
    console.log('error page\n');
    res.sendFile(path.join(__dirname, '/../public/html/error.html'));
});