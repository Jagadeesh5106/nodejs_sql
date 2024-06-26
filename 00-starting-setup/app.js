const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');



const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const User = require('./models/user');
const Product = require('./models/product');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next)=>{
    User.findByPk(1).then(user=>{
        req.user = user;
        next();
    }).catch(err=>{
        console.log(err);
    });
})
app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);



Product.belongsTo(User,{constraints:true,onDelete:'CASCADE'});
User.hasMany(Product);

User.hasOne(Cart);
Cart.belongsTo(User);

Product.belongsToMany(Cart,{through: CartItem});
Cart.belongsToMany(Product,{through: CartItem})
sequelize
.sync()
// .sync({force: true})
.then(result=>{
    return User.findByPk(1);
}).then(user=>{
    if(!user){
        return User.create({name:'Admin',email:'admin@gmail.com'})
    }
    return user;
})
.then(user=>{
    // console.log(user);
    return user.createCart();
})
.then(cart =>{
    console.log(cart);
    app.listen(3000);
}).catch(err=>{
    console.log(err);
});


