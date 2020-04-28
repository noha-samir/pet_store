var async = require('async');

function databaseSkeleton() {
}

// create tables with relations and defualt values
databaseSkeleton.prototype.createTablesWithRelations = function (gConnection, finalCallback) {
    async.waterfall([
        function (callback) {
            const sqlQuery = `CREATE TABLE IF NOT EXISTS pet_store.user (
              id INT NOT NULL AUTO_INCREMENT,
              name VARCHAR(45) NOT NULL,
              PRIMARY KEY (id),
              UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE)
            ENGINE = InnoDB;
                
            CREATE TABLE IF NOT EXISTS pet_store.pet (
              id INT NOT NULL AUTO_INCREMENT,
              type VARCHAR(45) NOT NULL,
              name VARCHAR(45) NOT NULL,
              owner_id INT NOT NULL,
              PRIMARY KEY (id),
              UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE,
              INDEX fk_pet_user_idx (owner_id ASC) VISIBLE,
              CONSTRAINT fk_pet_user
                FOREIGN KEY (owner_id)
                REFERENCES pet_store.user (id)
                ON DELETE NO ACTION
                ON UPDATE NO ACTION)
            ENGINE = InnoDB;
            
            CREATE TABLE IF NOT EXISTS pet_store.auction (
              id INT NOT NULL AUTO_INCREMENT,
              amount FLOAT NOT NULL,
              bidder_id INT NOT NULL,
              pet_id INT NOT NULL,
              PRIMARY KEY (id),
              UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE,
              INDEX fk_auction_user1_idx (bidder_id ASC) VISIBLE,
              INDEX fk_auction_pet1_idx (pet_id ASC) VISIBLE,
              INDEX unq_row (amount ASC, bidder_id ASC, pet_id ASC) VISIBLE,
              CONSTRAINT fk_auction_user1
                FOREIGN KEY (bidder_id)
                REFERENCES pet_store.user (id)
                ON DELETE NO ACTION
                ON UPDATE NO ACTION,
              CONSTRAINT fk_auction_pet1
                FOREIGN KEY (pet_id)
                REFERENCES pet_store.pet (id)
                ON DELETE NO ACTION
                ON UPDATE NO ACTION)
            ENGINE = InnoDB;
                  
            INSERT INTO pet_store.user (id, name) VALUES ('1','ahmed') ON DUPLICATE KEY UPDATE name=name;
            INSERT INTO pet_store.user (id, name) VALUES ('2','noha') ON DUPLICATE KEY UPDATE name=name;
            INSERT INTO pet_store.user (id, name) VALUES ('3','sara') ON DUPLICATE KEY UPDATE name=name;
            INSERT INTO pet_store.user (id, name) VALUES ('4','moh') ON DUPLICATE KEY UPDATE name=name;
            INSERT INTO pet_store.user (id, name) VALUES ('5','mai') ON DUPLICATE KEY UPDATE name=name;
            INSERT INTO pet_store.user (id, name) VALUES ('6','mona') ON DUPLICATE KEY UPDATE name=name;
            INSERT INTO pet_store.user (id, name) VALUES ('7', 'samir') ON DUPLICATE KEY UPDATE name=name;
               
            INSERT INTO pet_store.pet (id, type, name, owner_id) VALUES ('1','dog', 'rock', '1') ON DUPLICATE KEY UPDATE name=name;
            INSERT INTO pet_store.pet (id, type, name, owner_id) VALUES ('2','cat', 'kitty', '2') ON DUPLICATE KEY UPDATE name=name;  
            
            INSERT INTO pet_store.auction (id, amount, bidder_id, pet_id) VALUES ('1','100', '1', '1') ON DUPLICATE KEY UPDATE amount=amount;
            INSERT INTO pet_store.auction (id, amount, bidder_id, pet_id) VALUES ('2','150', '2', '1') ON DUPLICATE KEY UPDATE amount=amount;
            INSERT INTO pet_store.auction (id, amount, bidder_id, pet_id) VALUES ('3','200', '3', '2') ON DUPLICATE KEY UPDATE amount=amount;
            INSERT INTO pet_store.auction (id, amount, bidder_id, pet_id) VALUES ('4','300', '4', '2') ON DUPLICATE KEY UPDATE amount=amount;
            INSERT INTO pet_store.auction (id, amount, bidder_id, pet_id) VALUES ('5','500', '5', '2') ON DUPLICATE KEY UPDATE amount=amount; `;

            gConnection.query(sqlQuery, function (err, results, fields) {
                if (!err && results) {
                    callback(null);
                }
                else {
                    callback(err);
                }
            });
        }
    ],
        function (err) {
            finalCallback(err);
        });
};

module.exports = databaseSkeleton;
