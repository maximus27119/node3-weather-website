const getTodaysDate = () => {
    let d1 = new Date();
    return d1.getDate() + '-' + (d1.getMonth() + 1) + '-' + d1.getFullYear();
}

module.exports = getTodaysDate;