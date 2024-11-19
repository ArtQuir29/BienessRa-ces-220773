import Sequelize from 'sequelize'

const db=new Sequelize ('BienesRaices_220773','Ailton.Artiaga','pass1234',{

host:"localhost",
port:3307,
dialect:'mysql',
define:{
    timestamps:true
},
pool:{
max :5,
min : 0,
acquire:30000,
idle:10000
},

operatorAliases: false




});
 export default db;