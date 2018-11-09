//клятая табуляция
var tab = '&nbsp;&nbsp;&nbsp;&nbsp';

class VirtHost {
    constructor(host, directory) {
        this.host = host;
        this.directory = directory;
    }

    getContent() {
        var attribute = {
            create : `sudo cp /etc/apache2/sites-available/000-default.conf /etc/apache2/sites-available/${this.host}.conf` ,
            edit : `sudo gedit /etc/apache2/sites-available/${this.host}.conf` ,
            text : `&#60;VirtualHost *:80&#62;<br>${tab}
            ServerAdmin test@mail.com<br>${tab}
            ServerName ${this.host}<br>${tab}
            ServerAlias ${this.host}<br>${tab}
            DocumentRoot ${this.directory}<br>${tab}
            &#60;Directory \"${this.directory}\"&#62;<br>${tab}${tab}
            AllowOverride All<br>${tab}${tab}
            Require all granted<br>${tab}
            &#60;/Directory&#62;<br>${tab}
            ErrorLog \${APACHE_LOG_DIR}/error.log<br>${tab}
            CustomLog \${APACHE_LOG_DIR}/access.log combined<br>
            &#60;/VirtualHost&#62;` ,
            start : `sudo a2ensite ${this.host}.conf` ,
            default : "sudo a2dissite 000-default.conf" ,
            restart : "sudo systemctl restart apache2" ,
            hosts : "sudo gedit /etc/hosts" ,
            finish : `127.0.0.1	${this.host}`
        };
        return attribute;
    }
}

var copy = new Clipboard('.btn-color');

copy.on('success', function(e){
    window.setTimeout(function(){e.clearSelection();}, 10);
});


$('#generate' ).click(function(){
    var modalContent = '';
    // очищаем блок, чтобы предыдущие данные не отображались вновь
    $('#text').empty();
    hostCheck = $('#hostName').val();
    // проверяем юрл, если есть [http,https,/,-, ], то отбрасываем эти части
    host = hostCheck.replace( /^(http:\/\/|https:\/\/)|[\/\- ]+$/g, "");
    directory = $('#dirName').val();
    var vh = new VirtHost(host, directory);
    var i = 0;
    var content = vh.getContent();
    for (key in content) {
        i++;
        modalContent += "<div id=\"copyme" + i + "\" class=\"btn-color\" data-clipboard-action=\"copy\" data-clipboard-target=\"#copyme" + i + "\">" + content[key] + "</div>";
    }
    $('#text').html(modalContent);
});
