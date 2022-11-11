module.exports = {
    // database: {
    //     host: 'us-cdbr-east-04.cleardb.com',
    //     user: 'bb094390918ec1',
    //     password: '402b5927',
    //     database: 'heroku_3f1f3f81c127242'
    // }
    database: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'vistaprueba'
    }
    // database: {
    //     host: 'us-cdbr-east-06.cleardb.net',
    //     user: 'bb9f42544b1cf5',
    //     password: '3c1ddc18',
    //     database: 'heroku_e990e22980e7b91'
    // }
 }

/**
 *  mysql://bb9f42544b1cf5:3c1ddc18@us-cdbr-east-06.cleardb.net/heroku_e990e22980e7b91?reconnect=true
 * 
 *  mysql://bb094390918ec1:402b5927@us-cdbr-east-04.cleardb.com/heroku_3f1f3f81c127242?reconnect=true
 * 
 * use heroku_3f1f3f81c127242
 * 
 * mysql --host=us-cdbr-east-04.cleardb.com --user=bb094390918ec1 --password=402b5927 --reconnect heroku_3f1f3f81c127242
 * 
 * ALTER TABLE `pedidos` ADD `Usuario` TEXT NOT NULL AFTER `Proyecto`;
 * 
 * ALTER TABLE `qr` ADD `Usuario` TEXT NOT NULL AFTER `Remision`;
 * 
 * INSERT INTO `pedidos` (`nParte`, `cPedido`, `Cantidad`, `Remision`, `dPedido`, `Comments`, `Fecha`, `cTotal`, `Validacion`, `Revision`, `rCantidad`, `Proyecto`, `Usuario`)
 *  VALUES ('6020020000000270', 'Inventario', '1', 'B', 'C', 'D', '2021-11-01', '32', '0', '0', '0', 'F', 'G');
 */