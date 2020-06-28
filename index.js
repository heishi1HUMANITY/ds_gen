const {MDCSlider} = require('@material/slider');

const change_col_blur = (color, val) => {
    val = val.toFixed(1);
    color = color.replace(/\#/, '');
    let rgb = [];
    for(let i = 0; i < 6; i += 2){
        rgb.push(color[i] + color[i + 1]);
    }
    for(let i of rgb){
        if(parseInt(i, 16) < (255 / 2)){
            color_div.setAttribute('style', 'color: #ffffff');
            blur_div.setAttribute('style', 'color: #ffffff');
            mdc_slider.setAttribute('style', '--mdc-theme-secondary: #ffffff;');
            break;
        }
        if(parseInt(i, 16) > (255 / 2)){
            color_div.setAttribute('style', 'color: rgba(0, 0, 0, 0.87)');
            blur_div.setAttribute('style', 'color: rgba(0, 0, 0, 0.87)');
            mdc_slider.setAttribute('style', '--mdc-theme-secondary: #000000;');
        }
    }
    let shadow = [];
    for(let i of rgb){
        let tmp = parseInt(i, 16) - parseInt(77, 16);
        if(tmp <= 0){
            tmp = 0;
        }
        shadow.push(('00' + tmp.toString(16)).slice(-2));
    }
    for(let i = 0; i < 3; i++){
        rgb[i] = parseInt(rgb[i], 16);
    }
    if(rgb.reduce((p, c) => p + c) <= 15) shadow = ['88', '88', '88'];
    color = '#' + color;
    shadow = '#' + shadow.join('');
    color_input_map.value = color;
    color_div_map.setAttribute('style', `background-color: ${color}; filter: drop-shadow(0px 0px ${val}px ${shadow})`);
    color_input_hex.value = color;
    code_color_bg.innerText = color;
    code_color_ds.innerText = shadow;
    code_blur.innerText = `${val}px`;
    container.setAttribute('style', `background-color: ${color}`);
    target.setAttribute('style', `background-color: ${color}; filter: drop-shadow(0px 0px ${val}px ${shadow})`);
    controller.setAttribute('style', `background-color: ${color}; filter: drop-shadow(0px 0px ${val}px ${shadow})`);
};

const slider = new MDCSlider(document.querySelector('.mdc-slider'));
slider.listen('MDCSlider:input', () => {
    console.log('hoge');
    change_col_blur(color_input_hex.value, slider.value);
});

color_input_map.addEventListener('input', () => {
    change_col_blur(color_input_map.value, slider.value);
});

color_input_hex.addEventListener('change', () => {
    change_col_blur(color_input_hex.value, slider.value);
});

const init = () => {
    change_col_blur('627fd5', slider.value);
};
init();