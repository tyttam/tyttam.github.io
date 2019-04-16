//клятая табуляция
var tab = '&nbsp;&nbsp;&nbsp;&nbsp';
var type_host = 'apache';

var copy = new Clipboard('.line');

copy.on('success', function(e){
    window.setTimeout(function(){e.clearSelection();}, 10);
});

M.AutoInit();

function checkInput(host, directory) {
    if (host == '') {
        M.toast({html: 'Нужно ввести адрес сайта', classes: 'rounded'});
        return false;
    } else if (!(host.match(/^(http\:\/\/|https\:\/\/)?([a-z0-9][a-z0-9\-]*\.)+[a-z0-9][a-z0-9\-]*$/i)))
    {
        M.toast({html: 'Введен некорректный Url', classes: 'rounded'});
        return false;
    }
    if (directory == '') {
        M.toast({html: 'Нужно прописать путь к файлам сайта', classes: 'rounded'});
        return false;
    } else if(!(directory.match(/^[^<>а-я]+$/i)))
    {
        M.toast({html: 'Вы вводите недопустимые символы', classes: 'rounded'});
        return false;
    }
    return true;
}

$(document).ready(function(){
    $('.sidenav').sidenav();

    $("#apache, #nginx").change(function () {
        if ($("#apache").is(":checked")) {
            $('.apache').removeClass('filter-gray');
            $('.nginx').removeClass('filter-gray-off');
            $('.apache').addClass('filter-gray-off');
            $('.nginx').addClass('filter-gray');
            type_host = 'apache';
        }
        else if ($("#nginx").is(":checked")) {
            $('.nginx').removeClass('filter-gray');
            $('.apache').removeClass('filter-gray-off');
            $('.nginx').addClass('filter-gray-off');
            $('.apache').addClass('filter-gray');
            type_host = 'nginx';
        };
    });
    $('#generate').click(function(){
        hostCheck = $('#hostName').val();
        // проверяем юрл, если есть [http,https,/,-, ], то отбрасываем эти части
        host = hostCheck.replace( /^(http:\/\/|https:\/\/)|[\/\- ]+$/g, "");
        directoryCheck = $('#dirName').val();
        // Убираем часть с ненужными элементами
        directory = directoryCheck.replace(/(index|index.php|index.html|index.htm)+$/gi, "");
        // Переменная возвращает true or false
        // Проверяем корректность вводимых данных
        checkInputs = checkInput(host,directory);

        if (checkInputs) {
            var modalContent = '';
            var vh = new VirtHost(host, directory);
            var i = 0;
            var content = type_host == 'apache' ? vh.getApache() : vh.getNginx();
            for (key in content) {
                i++;
                modalContent += "<div id=\"copyme" + i + "\" class=\"line\" data-clipboard-action=\"copy\" data-clipboard-target=\"#copyme" + i + "\">" + content[key] + "</div>";
            }
            $('.card').removeClass('hide');
            $('#text').html(modalContent);

            $('#generate').attr('href', '#text');

            var el = $('#generate');
            var dest = el.attr('href');
            if(dest !== undefined && dest !== '') {
                $('html').animate({scrollTop: $(dest).offset().top}, 1000);
            }
        } else {
            $('.card').addClass('hide');
        }
    });
});
if (!getCookie('chanchelog=2.0.0')) {
    setCookie('chanchelog', '2.0.0', {expires : 36000000, path : '/'});
}
// deleteCookie(name);
