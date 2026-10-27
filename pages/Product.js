class Product{
    constructor(page){
        this.page=page;
        this.phoneLink= page.getByRole('link', {name:'Phones'});
        this.monitorLink= page.getByRole('link', {name:'Monitors'});
        this.product= page.getByRole('link', {name:'Sony vaio i5'});
        this.phone= page.getByRole('link', {name:'Nokia lumia 1520'}).first();
        this.monitor= page.getByRole('link', {name:'Apple monitor 24',exact:true});
        this.addToCart = page.getByRole('link', {name:'Add to cart'});
        this.cart = page.getByRole('link', {name:'Cart',exact:true});
    }
    async addProduct(){
        await this.product.click();
    }
    async addCart(){
        const alertBox=this.page.waitForEvent('dialog');
        await this.addToCart.click()
        const alert= await alertBox;
        const message=alert.message();
        await alert.accept();
        return message;
    }
    async addPhone(){
        await this.page.locator('#logInModal').waitFor({ state: 'hidden' });
        await this.phoneLink.click();
        await this.phone.waitFor({state:'visible'});
        await this.phone.click()
    }
    async addMonitor(){
        await this.page.locator('#logInModal').waitFor({ state: 'hidden' });
        await this.monitorLink.click();
        await this.monitor.waitFor({state:'visible'});
        await this.monitor.click()
    }
    async clickCart(){
        await this.cart.click()
    }

}
module.exports= Product;
