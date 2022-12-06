import express, { Response, Request, Application, Router } from 'express'; //
import { ExpressRouter } from './ExpressRouter'
import cors from 'cors';

class App {
    public app: Application
    public InitializingExpressRouter: ExpressRouter;
    public router: Router;
    constructor() {
        this.app = express();
        this.InitializingExpressRouter = new ExpressRouter();
        this.router = this.InitializingExpressRouter.router;
        this.setConfig();
        this.app.listen(5000, () => {
            console.log('listening')
        })
    }

    private setConfig() {
        this.app.use(express.json({ limit: '50mb' }));
        this.app.use(express.urlencoded({ limit: '50mb', extended: true }));
        this.app.use(cors());
        this.app.use('/', this.router);
    }
}

export default new App().app;
