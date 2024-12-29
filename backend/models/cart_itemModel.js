import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import cart from './cart.js';
import item from './item.js';

const cart_item = sequelize.define('cart_item', {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  sub_total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
}, {
  tableName: 'cart_item', 
  timestamps: false,
});

cart_item.belongsTo(cart, { foreignKey: 'cart_id' });
cart_item.belongsTo(item, { foreignKey: 'item_id' });

export default cart_item;