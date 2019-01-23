const BLOCKS = {
    btn_h : {p: 'h1'},
    btn_p : {p: 'p'},
    btn_a : {p: 'a'},
    btn_img : {p: 'img'}
};

    // const MAIN = document.getElementById('sortable');

    // var new_elem = document.getElementById('btn-h');
    // new_elem.addEventListener('click', createBlockH)

    function createBlock(){
        var evt = event.target;
        var evt_id = evt.getAttribute('id');

        // <div class='text_block'>
        var div = document.createElement('div');
        div.className = 'text_block';
        // <p>BLOCKS.btn_h.p</p>
        var p = document.createElement('p');
        p.className = 'tag';
        for (var name_block in BLOCKS) {
            if (name_block == evt_id) {
                p.innerHTML = BLOCKS[name_block].p;
            }
        }
        div.appendChild(p);

        var textarea = document.createElement('textarea');
        div.appendChild(textarea);

        document.getElementById('sortable').appendChild(div);
    }
