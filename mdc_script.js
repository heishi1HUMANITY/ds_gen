const {MDCSlider} = require('./node_modules/@material/slider/dist/mdc.slider');

const slider = new MDCSlider(document.querySelector('.mdc-slider'));
slider.lister('MDCSlider:change', () => console.log(`Value changed to ${slider.value}`));