const Sequelize=require('sequelize');

module.exports=class User extends Sequelize.Model{
	static init(sequelize){
		return super.init({
			email:{
				type:Sequelize.STRING(40),
				allowNull:false,
				unique:true
			},
			password:{
				type:Sequelize.STRING(200),
				allowNull:false
			},
			nick:{
				type:Sequelize.STRING(15),
				allowNull:false,
				unique:true
			}
			
		},{
			sequelize,
			timastamps:true,
			underscored:false,
			modelName:'User',
			tableName:'users',
			paranoid:true,
			charset:'utf8',
			collate:'utf8_general_ci',
		});
	}
	static associate(db){
		db.User.belongsToMany(db.User,{
			foreignKey:'followingId',
			as:'Followings',
			through:'Follow',
		});
		db.User.belongsToMany(db.User,{
			foreignKey:'followingId',
			as:'Followers',
			through:'Follow',
		});
		db.User.hasMany(db.Post);
		db.User.hasMany(db.Comment);
	}
};