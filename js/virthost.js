class VirtHost {
    constructor(host, directory) {
        this.host = host;
        this.directory = directory;
    }

    getApache() {
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

    getNginx() {
        var attribute = {
            create : `sudo cp /etc/nginx/sites-available/default /etc/nginx/sites-available/${this.host}` ,
            edit : `sudo gedit /etc/nginx/sites-available/${this.host}` ,
            text : `server {<br>${tab}
            listen 80;<br>${tab}
            listen [::]:80;<br>${tab}
            root ${this.directory};<br>${tab}
            index index.html index.htm index.php;<br>${tab}
            server_name ${this.host};<br>${tab}
            location / {<br>${tab}${tab}
            try_files $uri $uri/ =404;<br>${tab}
            }<br>
            }` ,
            start : `sudo ln -s /etc/nginx/sites-available/${this.host} /etc/nginx/sites-enabled/` ,
            default : "sudo rm /etc/nginx/sites-enabled/default" ,
            restart : "sudo service nginx restart" ,
            hosts : "sudo gedit /etc/hosts" ,
            finish : `127.0.0.1	${this.host}`
        };
        return attribute;
    }
}
