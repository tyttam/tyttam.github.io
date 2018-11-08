var directory;
var host;
var attribute;
var text = document.getElementById('text');;
//клятая табуляция
var tab = '&nbsp;&nbsp;&nbsp;&nbsp';

$('#dirName, #hostName' ).keyup(function(){
    host = $('#hostName').val();
    directory = $('#dirName').val();
    attribute = {
        create : "sudo cp /etc/apache2/sites-available/000-default.conf /etc/apache2/sites-available/" + host + ".conf" ,
        edit : "sudo gedit /etc/apache2/sites-available/" + host + ".conf" ,
        text : "&#60;VirtualHost *:80&#62;" + "<br>" + tab +
        "ServerAdmin test@mail.com" + "<br>" + tab +
        "ServerName " + host  + "<br>" + tab +
        "ServerAlias " + host + "<br>" + tab +
        "DocumentRoot " + directory + "<br>" + tab +
        "&#60;Directory \"" + directory + "\"&#62;" + "<br>" + tab + tab +
        "AllowOverride All " + "<br>" + tab + tab +
        "Require all granted" + "<br>" + tab +
        "&#60;/Directory&#62;" + "<br>" + tab +
        "ErrorLog ${APACHE_LOG_DIR}/error.log" + "<br>" + tab +
        "CustomLog ${APACHE_LOG_DIR}/access.log combined" + "<br>" +
        "&#60;/VirtualHost&#62;" ,
        start : "sudo a2ensite " + host + ".conf" ,
        default : "sudo a2dissite 000-default.conf" ,
        restart : "sudo systemctl restart apache2" ,
        hosts : "sudo gedit /etc/hosts" ,
        finish : "127.0.0.1	" + tab + host
    };
    $('#text').empty();
    var ex = 0;
    for (key in attribute) {
        ex++;
        text.innerHTML += "<div id=\"copyme" + ex + "\" class=\"btn-color\" data-clipboard-action=\"copy\" data-clipboard-target=\"#copyme" + ex + "\">" + attribute[key] + "</div>";
    }
});
