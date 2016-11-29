const d3 = require('d3');
const fs = require('fs');
const svgson = require('svgson');
const jsdom = require("jsdom").jsdom;


module.exports = function(){

fs.readFile(`${__dirname}/public/uploads/paris_test.svg`, 'utf-8',
    function(err, data) {
        svgson(data, {svgo: true},

    function(result) {
        let tower = result.childs[3].attrs.d;
        let towerColor = result.childs[3].attrs.fill;

        generateSvg(tower, towerColor);

/*        let arr =[];
        result.childs.forEach((item, i) => {
            arr.push(item[i].attrs.d);
        });
        console.log(arr);*/

    });
});

function generateSvg(d, fill){
let body = d3.select(jsdom("<html><body></body></html>").documentElement).select("body");

    body.append("svg")
        .attr("version", 1.1)
        .attr("xmlns", 'http://www.w3.org/2000/svg')
        .attr("viewBox", `0 0 1190.6 1683.8`)
        .append("path")
        .attr('d', d)
        .style("fill", fill);

   fs.writeFileSync(`${__dirname}/public/decomposed/tower.svg`, `<?xml version=\"1.0\"?>${body.node().innerHTML}`);
 }
};
