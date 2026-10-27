class Login{
    constructor(page){
        this.page = page;
        this.loginLink=page.getByRole('link', {name:'Log in'});
        this.username=page.locator('#loginusername');
        this.password=page.locator('#loginpassword');
        this.loginBtn=page.locator('#logInModal button').filter({hasText:'Log in'});

    }
    async goto(){
        await this.page.goto("https://www.demoblaze.com/");
        await this.loginLink.waitFor({state:'visible'});
    }
    async login(username, password){
        await this.loginLink.click();
        await this.username.waitFor({state:'visible'});
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginBtn.click();
    }
}
module.exports= Login;