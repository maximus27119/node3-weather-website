const getTodaysDate = () => {
    let d1 = new Date();
    return d1.getDay() + '-' + d1.getMonth() + '-' + d1.getFullYear();
}

module.exports = getTodaysDate;