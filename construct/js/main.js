const BLOCK_H = {name: null, p: 'ЗАГОЛОВОК | h1'};
const BLOCK_P = {name: null, p: 'КОНТЕНТ | p'};
const BLOCK_A = {name: null, p: 'ССЫЛКА | a'};
const BLOCK_IMG = {name: null, p: 'КАРТИНКА | img'};

// window.onload=function(){
    // const MAIN = document.getElementById('sortable');

    // var new_elem = document.getElementById('btn-h');
    // new_elem.addEventListener('click', createBlockH)

    function createBlockH(){
        console.log(evn);
        var div = document.createElement('div');
        div.className = 'text_block';
        var p = document.createElement('p');
        p.innerHTML = BLOCK_H.p;
        div.appendChild(p);
        var textarea = document.createElement('textarea');
        div.appendChild(textarea);

        document.getElementById('sortable').appendChild(div);
    }

// }
