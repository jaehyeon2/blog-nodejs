const Sequelize=require('sequelize');
const env=process.NODE_ENV||'development';
const config=require('../config/config')[env];

const User=require('./user');
const Post=require('./post');
const Category=require('./category');
const Comment=require('./comment');

const db={};
const sequelize=new Sequelize(
	config.database, config.username, config.password, config,
);

db.Sequelize=sequelize;
db.User=User;
db.Post=Post;
db.Category=Category;
db.Comment=Comment;

User.init(sequelize);
Post.init(sequelize);
Category.init(sequelize);
Comment.init(sequelize);

User.associate(db);
Post.associate(db);
Category.associate(db);
Comment.associate(db);

module.exports=db;