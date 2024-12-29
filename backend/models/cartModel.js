import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import user from './user.js';

const cart = sequelize.define('cart', {
  cart_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00,
  },
}, {
  tableName: 'cart', 
  timestamps: false,
});

cart.belongsTo(user, { foreignKey: 'user_id' });

export default cart;