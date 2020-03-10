const DB_NAME = 'History';
const DB_V = 23;
const BOOKS_STORE_NAME = 'history';
const addBtn = document.querySelector('#addButton');
const showBtn = document.querySelector('#show');
var pri9ce = document.querySelector('#price');
var number = document.querySelector('#number');


let db;
if ('indexedDB' in window) {
    openDB();
}

function openDB() {
    const dbReq = indexedDB.open(DB_NAME, DB_V);

    dbReq.onerror = (ev) => {
        console.error('onerror', ev.target.errorCode);
    };

    dbReq.onupgradeneeded = (ev) => {
        console.log('onupgradeneeded');
        db = ev.target.result;
        //console.log(db);
        //console.log(ev);
        let historyDb;
        if (!db.objectStoreNames.contains(BOOKS_STORE_NAME)) {
            historyDb = db.createObjectStore(BOOKS_STORE_NAME, { keyPath: 'id', autoIncrement: true });
        }

    }
    dbReq.onsuccess = (ev) => {
        console.log('onsuccess');
        if (db instanceof IDBDatabase) {
            const tx = db.transaction(BOOKS_STORE_NAME, 'readwrite');
            const historyDb = tx.objectStore(BOOKS_STORE_NAME);
            historyDb.getAll().onsuccess = (ev) => {
                //console.log(ev.target.result);
                //console.log(ev.target.result[0].title);
                for (let i in ev.target.result) {
                    var order = document.createElement("td");
                    order.innerHTML = `#${ev.target.result[i].id}`;
                    var date = document.createElement("td");
                    date.innerHTML = `${ev.target.result[i].date}`;
                    var status = document.createElement("td");
                    status.innerHTML = `${ev.target.result[i].status}`;
                    var total = document.createElement("td");
                    total.innerHTML = `${ev.target.result[i].price * ev.target.result[i].number} ERU for ${ev.target.result[i].number} items`;
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



addBtn.addEventListener('click', (ev) => {
    //console.log(db);
    if (db instanceof IDBDatabase) {
        const tx = db.transaction(BOOKS_STORE_NAME, 'readwrite');
        const historyDb = tx.objectStore(BOOKS_STORE_NAME);
        var date = new Date();
        date = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
        console.log(date);

        historyDb.add({
            price: price.value,
            number: number.value,
            total: (price.value * number.value),
            status: 'Processing',
            date: date
        });
    }
});



