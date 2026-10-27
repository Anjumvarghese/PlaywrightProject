class Logout{
    constructor(page){
        this.page=page;
        this.logoutLink=page.getByRole('link',{name:'Log out'})
    }
    async logoutApp(){
        await this.logoutLink.click()
    }
}
module.exports= Logout;