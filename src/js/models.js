const models = {

    compareAddress(a, b) {
        if (a.address > b.address) return 1;
        if (a.address < b.address) return -1;
        return 0;
    },
    compareName(a, b) {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        return 0;
    },
    compareCities(a, b) {
        if (a.city > b.city) return 1;
        if (a.city < b.city) return -1;
        return 0;
    },

    mathRound(num, nm) {
        return Math.round(num*Math.pow(10,nm))/Math.pow(10,nm);

    },

    changeNumber(n) {
        let num = String(n).split('.')[0], number = num, len = num.length, z = String(n).split('.')[1];
        if (len > 3 && len < 7) {
            num = number.slice(0, len - 3) + ' ' + number.slice(len - 3);
        } else if (len >= 7) {
            let th = number.slice(len - 3), thr = number.slice(0, len - 3), thre = thr.slice(thr.length - 3),
                fst = thr.slice(0, thr.length - 3);
            num = fst + ' ' + thre + ' ' + th;
        }
        if (z === undefined) return num;
        else return num + '.' + z;
    },

    compareNumeric(a, b) {
        return a.point - b.point;
    },

    setJWT(data) {
        let date = new Date(new Date().getTime() + 2592000 * 1000);
        document.cookie = "Authorization=" + data + "; path=/; expires=" + date.toUTCString();
    },

    clearJWT() {
        let date = new Date(new Date().getTime() - 2592000 * 1000);
        document.cookie = "Authorization=; path=/; expires=" + date.toUTCString();
    },

    getCookie(name) {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    },

    beautifulNumber(phone) {
        let code = phone.substring(0, 2),
            code_seti = phone.substring(2, 5),
            num1 = phone.substring(5, 8),
            num2 = phone.substring(8, 10),
            num3 = phone.substring(10, 12);
        return code + " (" + code_seti + ") " + num1 + " " + num2 + " " + num3;
    },

    //  function(e) {
    //      return !(/[А-Яа-яA-Za-z \- \+ \* \/ \= \_ \' \" \! \$ \% \# \@ \^ \& \( \) \{ \.\?\,} ]/.test(String.fromCharCode(e.charCode)));
    //  });

    getUserAgent() {
        let sBrowser, sUsrAg = navigator.userAgent;
        if (sUsrAg.indexOf("OPR") > -1) sBrowser = "Opera";
        else if (sUsrAg.indexOf("Edge") > -1) sBrowser = "Explorer";
        else if (sUsrAg.indexOf("Chrome") > -1) sBrowser = "Chrome";
        else if (sUsrAg.indexOf("Safari") > -1) sBrowser = "Safari";
        else if (sUsrAg.indexOf("Firefox") > -1) sBrowser = "Firefox";
        else if (sUsrAg.indexOf("MSIE") > -1) sBrowser = "Explorer";
        else sBrowser = "unknown";
        return sBrowser;
    },

    getOS() {
        let sBrowser, sUsrAg = navigator.userAgent;
        if (sUsrAg.indexOf("Microsoft") > -1) sBrowser = "Microsoft";
        else if (sUsrAg.indexOf("Android") > -1) sBrowser = "Android";
        else if (sUsrAg.indexOf("Mac OS") > -1) sBrowser = "Mac";
        else if (sUsrAg.indexOf("Windows") > -1) sBrowser = "Windows";
        else if (sUsrAg.indexOf("Linux") > -1) sBrowser = "Linux";
        else if (sUsrAg.indexOf("Ubuntu") > -1) sBrowser = "Ubuntu";
        else sBrowser = "unknown";
        return sBrowser;
    },


    connectDB(db, data, storeName, accessRights, key) {

        let indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB,
            IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction,
            request = indexedDB.open("backoffice", 1);

        request.onerror = (err) => {
            console.error(err);
        };

        request.onsuccess = () => {
            // При успешном открытии вызвали коллбэк передав ему объект БД
            if (db !== undefined) {
                this.set(db, data, storeName, accessRights, key)
            }
        };

        request.onupgradeneeded = (e) => {
            // Если БД еще не существует, то создаем хранилище объектов.
            // let target = e.currentTarget.result;
            // target.createObjectStore("companies");
            // target.createObjectStore("user");
            // target.createObjectStore("qr_code");
        }

    },
    setData(db, data, storeName, accessRights, key) {
        this.connectDB(db, data, storeName, accessRights, key);
    },
    set(db, data, storeName, accessRights, key) {
        let request = db.transaction(storeName, accessRights).objectStore(storeName).put(data, key);
        request.onerror = () => {
            console.log(request);
        };
        request.onsuccess = () => {
            return request.result;
        }
    }

};

export default models;
