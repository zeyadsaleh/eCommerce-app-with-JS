const DATABASE_NAME = 'History';
const BOOKS_STORE_NAME = 'history';
const buyButton = document.querySelector('#buyBtn');
const cancleButton = document.querySelector('#cancelBtn');
//console.log(document.querySelector('#cancelBtn'));


let dataBase;
if ('indexedDB' in window) {
    openDB();
}

function openDB() {
    const dbReq = indexedDB.open(DATABASE_NAME);

    dbReq.onerror = (ev) => {
        console.error('onerror', ev.target.errorCode);
    };

    dbReq.onupgradeneeded = (ev) => {
        console.log('onupgradeneeded');
        dataBase = ev.target.result;
        let historyDb;
        if (!dataBase.objectStoreNames.contains(BOOKS_STORE_NAME)) {
            historyDb = dataBase.createObjectStore(BOOKS_STORE_NAME, { keyPath: 'id', autoIncrement: true });
        }

    }
    dbReq.onsuccess = (ev) => {
        console.log('onsuccess');
        dataBase = ev.target.result;
        if (dataBase instanceof IDBDatabase) {
            const tx = dataBase.transaction(BOOKS_STORE_NAME, 'readwrite');
            const historyDb = tx.objectStore(BOOKS_STORE_NAME);
            historyDb.getAll().onsuccess = (ev) => {
                for (let i in ev.target.result) {
                    var order = document.createElement("td");
                    order.innerHTML = `#${ev.target.result[i].id}`;
                    var date = document.createElement("td");
                    date.innerHTML = `${ev.target.result[i].date}`;
                    var status = document.createElement("td");
                    status.innerHTML = `${ev.target.result[i].status}`;
                    var total = document.createElement("td");
                    total.innerHTML = `${ev.target.result[i].total} ERU for ${ev.target.result[i].items} items`;
                    var tr = document.createElement("tr");
                    tr.appendChild(order);
                    tr.appendChild(date);
                    tr.appendChild(status);
                    tr.appendChild(total);
                    document.querySelector('#tbody').appendChild(tr);
    
                    //console.log(document.querySelector('#tr'));
    
                }
            }
        }
    }

}

buyButton.addEventListener('click', (ev) => {
    //console.log(db);
    if (dataBase instanceof IDBDatabase) {
        const tx = dataBase.transaction(BOOKS_STORE_NAME, 'readwrite');
        const historyDb = tx.objectStore(BOOKS_STORE_NAME);
        var date = new Date();
        date = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
        //console.log(date);

        historyDb.add({
            items: localStorage.getItem("totalItems"),
            total: localStorage.getItem("totalPrice"),
            status: "Proccessing",
            date: date
        });
    }
});

cancleButton.addEventListener('click', (ev) => {
    //console.log(db);    
    if (dataBase instanceof IDBDatabase) {
        const tx = dataBase.transaction(BOOKS_STORE_NAME, 'readwrite');
        const historyDb = tx.objectStore(BOOKS_STORE_NAME);
        var date = new Date();
        date = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
        //console.log(date);
            historyDb.add({
                items: localStorage.getItem("totalItems"),
                total: localStorage.getItem("totalPrice"),
                status: "Cancled",
                date: date
            });       
    }
});



