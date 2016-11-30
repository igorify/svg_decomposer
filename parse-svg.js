const phantom = require("phantom");
let decompose = require('./decompose');
let _ph, _page, _outObj;

module.exports = function(fileName){

    phantom.create().then(ph => {
        _ph = ph;
        return _ph.createPage();

    }).then(page => {
        _page = page;
        return _page.open(`${__dirname}/public/uploads/${fileName}`);

    }).then(function(status)  {
        console.log(status);
        return _page.evaluate(function() {
        var arr = ['Moon', 'Tour', 'Star','Badge'];
        var parsedData = [];
            arr.forEach(function(id){
                var el = document.getElementById(id);
/*                var elWidth = el.getBoundingClientRect().width;
                var elHeight = el.getBoundingClientRect().height;*/
                parsedData.push({
                    code: new XMLSerializer().serializeToString(el),
                    id:id.toLowerCase(),
/*                    width: serialEl1,
                    height: serialEl2*/
                });
            });
        return parsedData;
        });
    }).then(parsedData => {
        console.log(parsedData);
        decompose(parsedData);

        _page.close();

    }).catch(e => {
        console.log(e);
        _ph.exit();
    });

};

