class Signup{
    constructor(page){
        this.page = page;
        this.signLink=page.getByRole('link', {name:'Sign up'});
        this.username=page.locator('#sign-username');
        this.password=page.locator('#sign-password');
        this.signUpBtn=page.locator('#signInModal button').filter({hasText:'Sign up'});
        this.closeBtn=page.locator('#signInModal button').filter({hasText:'Close'});

    }
    async goto(){
        await this.page.goto("https://www.demoblaze.com/");
    }
    
    async validSignUp(username, password){
        await this.signLink.click();
        await this.username.fill(username);
        await this.password.fill(password);
        const alertBox=this.page.waitForEvent('dialog');
        await this.signUpBtn.click();
        const alert= await alertBox;
        const message=alert.message();
        await alert.accept();
        return message;
    }

    async invalidSignUp(username, password){
        await this.signLink.click();
        await this.username.fill(username);
        await this.password.fill(password);
        const alertBox=this.page.waitForEvent('dialog');
        await this.signUpBtn.click();
        const alert= await alertBox;
        const message=alert.message();
        await alert.accept();
        await this.closeBtn.click();
        return message;
        
    }
}
module.exports= Signup;