const config = {
    title: "turbine-scaffold", // define your website's title
    keyword: "", // define your website's keywords
    description: "", // define your website's description
};

module.exports = Object.assign({
    templateParameters: {
        useRem: false, // use rem unit as default css unit;
        remConfig: {
            baseSize: false,
            designSize: false
        }
    }
}, config);