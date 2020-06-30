const {MDCSlider} = require('@material/slider');

const change_col_blur_offset = (color, blur, x, y) => {
    blur = blur.toFixed(1);
    x = x.toFixed(1);
    y = y.toFixed(1);
    color = color.replace(/\#/, '');
    let rgb = [];
    for(let i = 0; i < 6; i += 2){
        rgb.push(color[i] + color[i + 1]);
    }
    let contrast_flag = false;
    for(let i of rgb){
        if(parseInt(i, 16) > 255 - 255 / 3) contrast_flag = true;
    }
    if(!contrast_flag){
        wrapper_div.forEach(c => c.setAttribute('style', 'color: #ffffff'));
        color_input_hex.setAttribute('style', 'border-bottom: 1px solid #ffffff');
        sizing_input.forEach(c => c.setAttribute('style', 'border-bottom: 1px solid #ffffff'));
        lighting_select.setAttribute('style', '--mdc-theme-primary: #ffffff')
        lighting_select_icon.setAttribute('style', 'fill: #ffffff')
        lighting_selected_text.setAttribute('style', 'color: #ffffff');
        lighting_ripple_before.innerHTML = '#controller #light .mdc-line-ripple::before{border-bottom-color: #ffffff;}';
        mdc_slider.forEach(c => c.setAttribute('style', '--mdc-theme-secondary: #ffffff;'));
    }else{
        wrapper_div.forEach(c => c.setAttribute('style', 'color: rgba(0, 0, 0, 0.87);'));
        color_input_hex.setAttribute('style', 'border-bottom: 1px solid rgba(0, 0, 0, 0.87)');
        sizing_input.forEach(c => c.setAttribute('style', 'border-bottom: 1px solid rgba(0, 0, 0, 0.87);'));
        lighting_select_icon.setAttribute('style', 'fill: rgba(0, 0, 0, 0.87);')
        lighting_select.setAttribute('style', '--mdc-theme-primary: rgba(0, 0, 0, 0.87);')
        lighting_selected_text.setAttribute('style', 'color: rgba(0, 0, 0, 0.87);');
        lighting_ripple_before.innerHTML = '#controller #light .mdc-line-ripple::before{border-bottom-color: rgba(0, 0, 0, 0.87);}';
        mdc_slider.forEach(c => c.setAttribute('style', '--mdc-theme-secondary: rgba(0, 0, 0, 0.87);'));
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
    color_div_map.setAttribute('style', `background-color: ${color}; filter: drop-shadow(${x}px ${y}px ${blur}px ${shadow})`);
    color_input_hex.value = color;
    lighting_anchor.innerHTML = `#controller #light .mdc-select__anchor{background-color: ${color};}`;
    code_color_bg.innerText = color;
    code_color_ds.innerText = shadow;
    code_blur.innerText = `${blur}px`;
    code_offset_x.innerText = `${x}px`;
    code_offset_y.innerText = `${y}px`;
    container.setAttribute('style', `background-color: ${color}`);
    target.setAttribute('style', `background-color: ${color}; filter: drop-shadow(${x}px ${y}px ${blur}px ${shadow})`);
    controller.setAttribute('style', `background-color: ${color}; filter: drop-shadow(${x}px ${y}px ${blur}px ${shadow})`);
    sizing();
    return shadow;
};

const sizing = () => {
    let x = sizing_x.value; let y = sizing_y.value;
    let tmp = target.getAttribute('style');
    target.setAttribute('style', `${tmp}; height: ${y}px; width: ${x}px;`);
    code_height.innerText = `${y}px`;
    code_width.innerText = `${x}px`;
};

const blur_slider = new MDCSlider(document.querySelector('#blur_slider'));
const offset_x_slider = new MDCSlider(document.querySelector('#offset_x_slider'));
const offset_y_slider = new MDCSlider(document.querySelector('#offset_y_slider'));
const lighting_scale_slider = new MDCSlider(document.querySelector('#lighting_scale_slider'))

blur_slider.listen('MDCSlider:input', () => {
    change_col_blur_offset(color_input_hex.value, blur_slider.value, offset_x_slider.value * lighting_scale_slider.value.toFixed(1), offset_y_slider.value * lighting_scale_slider.value.toFixed(1));
});

offset_x_slider.listen('MDCSlider:input', () => {
    change_col_blur_offset(color_input_hex.value, blur_slider.value, offset_x_slider.value * lighting_scale_slider.value.toFixed(1), offset_y_slider.value * lighting_scale_slider.value.toFixed(1));
});

offset_y_slider.listen('MDCSlider:input', () => {
    change_col_blur_offset(color_input_hex.value, blur_slider.value, offset_x_slider.value * lighting_scale_slider.value.toFixed(1), offset_y_slider.value * lighting_scale_slider.value.toFixed(1));
});

lighting_scale_slider.listen('MDCSlider:input', () => {
    let y = offset_y_slider.value * lighting_scale_slider.value.toFixed(1);
    let x = offset_x_slider.value * lighting_scale_slider.value.toFixed(1);
    change_col_blur_offset(color_input_hex.value, blur_slider.value, x, y);
});

color_input_map.addEventListener('input', () => {
    change_col_blur_offset(color_input_map.value, blur_slider.value, offset_x_slider.value * lighting_scale_slider.value.toFixed(1), offset_y_slider.value * lighting_scale_slider.value.toFixed(1));
});

color_input_hex.addEventListener('input', () => {
    change_col_blur_offset(color_input_hex.value, blur_slider.value, offset_x_slider.value * lighting_scale_slider.value.toFixed(1), offset_y_slider.value * lighting_scale_slider.value.toFixed(1));
});

sizing_x.addEventListener('input', () => {
    sizing();
});

sizing_y.addEventListener('input', () => {
    sizing();
});

const {MDCSelect} = require('@material/select');
const lighting_select_handler = new MDCSelect(document.querySelector('#lighting_mdc_select'));
lighting_select_handler.listen('MDCSelect:change', () => {
    // alert(`Selected option at index ${select.selectedIndex} with value "${select.value}"`);
    let x, y;
    switch(lighting_select_handler.value){
        case 'top left':
            x = 10; y = 10;
            break;
        case 'top center':
            x = 0; y = 10;
            break;
        case 'top right':
            x = -10; y = 10;
            break;
        case 'center left':
            x = 10; y = 0;
            break;  
        case 'center':
            x = 0; y = 0;
            break;
        case 'center right':
            x = -10; y = 0;
            break;
        case 'bottom left':
            x = 10; y = -10;
            break;
        case 'bottom center':
            x = 0; y = -10;
            break;
        case 'bottom right':
            x = -10; y = -10;
            break;
    }
    lighting_scale_slider.value = 1;
    offset_x_slider.value = x; offset_y_slider.value = y;
    change_col_blur_offset(color_input_hex.value, blur_slider.value, x, y);
});

copy.addEventListener('click', () => {
    let tmp = document.createElement('textarea');
    tmp.innerHTML = code.innerText.replace(/content_copy/, '').replace(/\n/g, '').replace(/;/g, ';\n');
    document.body.appendChild(tmp);
    tmp.select();
    document.execCommand('copy');
    document.body.removeChild(tmp);
});

const init = () => {
    change_col_blur_offset("627fd5", blur_slider.value, offset_x_slider.value * lighting_scale_slider.value.toFixed(1), offset_y_slider.value * lighting_scale_slider.value.toFixed(1));
};
init();
