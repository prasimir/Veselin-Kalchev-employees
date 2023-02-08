const isDate = (d) => { 
    let date = new Date(d);
    return date instanceof Date && !isNaN(date.valueOf()) 
}

const pairs = ([x, ...xs]) => x == undefined ? [] : xs.map(y => [x, y]);

const intersection = (xs, ys) => xs.filter(x => ys.includes (x));

const getDays = (start, end) => {
    for(var arr=[], dt=new Date(start); dt<=new Date(end); dt.setDate(dt.getDate()+1)) {
        arr.push(new Date(dt));
    }
  
    return arr.map((v)=>v.toISOString().slice(0,10));
};

module.exports = {
    isDate,
    pairs,
    intersection,
    getDays
};