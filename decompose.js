const d3 = require('d3');
const fs = require('fs');
const svgson = require('svgson');
const jsdom = require("jsdom").jsdom;


module.exports = function(parsedData){

/*fs.readFile(`${__dirname}/public/uploads/${fileName}`, 'utf-8',
    function(err, data) {
        svgson(data, {svgo: true},

    function(result) {
        let tower = result.childs[1].attrs.d;
        let towerColor = result.childs[1].attrs.fill;

        generateSvg(tower, towerColor);

      /!*  let arr =[];
        result.childs.forEach((item, i) => {
            if(item[i].attrs.d == undefined) {i++}
            arr.push(item[i].attrs.d);
        });
        console.log(arr);*!/

    });
});*/

let body = d3.select(jsdom("<html><body></body></html>").documentElement).select("body");

    parsedData.forEach(function(elem){
/*        body.append("svg")
            .attr("version", 1.1)
            .attr("xmlns", 'http://www.w3.org/2000/svg')
            .attr("viewBox", `0 0 1190.6 1683.8`)
            .append("g")
            .data(elem.code)
        */

        fs.writeFileSync(`${__dirname}/public/decomposed/${elem.id}.svg`,
            `<?xml version=\"1.0\"?>
               <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1190.6 1683.8" style="background: black">
               ${elem.code}
            </svg>`);
    });




};
