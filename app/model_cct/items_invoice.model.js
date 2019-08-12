module.exports = (sequelize, Sequelize) => {
	const ItemsInvoice = sequelize.define('items_invoice', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        item_id: {
            type: Sequelize.INTEGER
        },
        invoice_id: {
            type: Sequelize.INTEGER
        }
	});

	return ItemsInvoice;
}
