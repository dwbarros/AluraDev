let ConnectionFactory = (function tmp() {

    const dbName = 'aluradev'
    const version = 1
    const stores = ['projects']
    let connection = null
    let close = null

    return class ConnectionFactory {
        
        constructor() {
            throw new Error('ConnectionFactory é uma classe estática. Não é possível instanciá-la')
        }

        static getConnection() {
            return new Promise((resolve, reject) => {

                let openRequest = window.indexedDB.open(dbName, version)
                
                openRequest.onupgradeneeded = e => {

                    ConnectionFactory._createStores(e.target.result)
                }

                openRequest.onsuccess = e => {
                    
                    if(!connection) {
                        connection = e.target.result
                        close = connection.close.bind(connection)
                        connection.close = function() {
                            throw new Error('Não é possível fechar a conexão diretamente')
                        }
                    }

                    resolve(connection)
                }

                openRequest.onerror = e => {
                    console.log(e.target.error)
                    reject(e.target.error.name)
                }
            })
        }

        static _createStores(connection) {
            stores.forEach(store => {
                
                if (connection.objectStoreNames.contains(store))
                    connection.deleObjectStore(store)

                connection.createObjectStore(store, { autoIncrement: true })
            })
        }

        static closeConnection() {
            if(connection) {
                close()
                connection = null
            }
        }
    }
})()