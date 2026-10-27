const Checkout = require("./Checkout")
const Login = require("./Login")
const Logout = require("./Logout")
const Product = require("./Product")
const Signup = require("./Signup")

class POManager{
    constructor(page){
        this.page=page
        this.signup=new Signup(page)
        this.login=new Login(page)
        this.product=new Product(page)
        this.checkout= new Checkout(page)
        this.logout=new Logout(page)
    }
    getSignupPage(){
        return this.signup;
    }
    getLoginPage(){
        return this.login;
    }
    getProduct(){
        return this.product;
    }
    getCheckout(){
        return this.checkout;
    }
    getLogout(){
        return this.logout;
    }
}
module.exports= POManager;