import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import cart from './cart.js';
import user from './user.js';

const delivery = sequelize.define('delivery', {
  delivery_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  street: {
    type: DataTypes.STRING,
  },
  city: {
    type: DataTypes.STRING,
  },
  state: {
    type: DataTypes.STRING,
  },
  zip: {
    type: DataTypes.INTEGER,
  },
  phone_num: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  tot_with_delivery: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
}, {
  tableName: 'delivery', 
  timestamps: false,
});

delivery.belongsTo(cart, { foreignKey: 'cart_id' });
delivery.belongsTo(user, { foreignKey: 'user_id' });

export default delivery;