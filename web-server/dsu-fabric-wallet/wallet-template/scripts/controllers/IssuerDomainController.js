import ContainerController from "../../cardinal/controllers/base-controllers/ContainerController.js";
import constants from "./constants.js";

export default class IssuerDomainController extends ContainerController {
    constructor(element, history) {
        super(element, history);

        this.setModel({});
        this.model.domain = "epi";
        this.on('openFeedback', (e) => {
            this.feedbackEmitter = e.detail;
        });

        this.on("generate-identity", (event) => {
            const opendsu = require("opendsu");
            const keyssiSpace = opendsu.loadApi("keyssi");
            const seedSSI = keyssiSpace.buildSeedSSI(this.model.domain);
            seedSSI.initialize(this.model.domain, (err)=>{
                if(err){
                    return this.showError(err, "Could not initialize the issuer SSI");
                }
                this.DSUStorage.getObject(constants.ISSUER_FILE_PATH, (err, issuer)=>{
                    if(err){
                        issuer = {};
                    }

                    issuer.domain = this.model.domain;
                    issuer.ssi = seedSSI.getIdentifier();
                    this.DSUStorage.setObject(constants.ISSUER_FILE_PATH, issuer, (err)=>{
                        if(err){
                            return this.showError(err);
                        }
                        this.History.navigateToPageByTag("issuer");
                    });
                });
            });
        });
    }

    showError(err, title, type) {
        let errMessage;
        title = title ? title : 'Validation Error';
        type = type ? type : 'alert-danger';

        if (err instanceof Error) {
            errMessage = err.message;
        } else if (typeof err === 'object') {
            errMessage = err.toString();
        } else {
            errMessage = err;
        }
        this.feedbackEmitter(errMessage, title, type);
    }
}