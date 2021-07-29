const Sequelize=require('sequelize')

module.exports=class User extends Sequelize.Model{
	static init(sequelize){
		return super.init(db)({
			email:{
				type:Sequelize.STRING(40),
				allowNull:false,
				unique:true
			},
			id:{
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
			
		})
	}
}