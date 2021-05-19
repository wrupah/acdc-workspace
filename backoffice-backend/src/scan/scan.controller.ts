import {Body, Controller, Post} from "@nestjs/common";
import {ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {ScanService} from "./scan.service";
import {EventInputDataDto} from "../acdc/eventinput.dto";
import {EventOuputDataDto} from "../acdc/eventoutput.dto";

@ApiTags("Scan")
@Controller("/scan")
export class ScanController {
    constructor(private scanService: ScanService) {
    }

    @Post()
    @ApiOperation({summary: "Create one Scan"})
    @ApiOkResponse({
        description: "Data are processed, and the authentication status of the scan is returned. \n\n*For demo purpose, the currently returned data is dummy.",
        schema: {
            type: "object",
            properties: {
                snCheckResult: {type: 'string'},
                mahId: {type: 'string'},
                mahName: {type: 'string'},
            }
        },
    })
    async create(@Body() eventInputData: EventInputDataDto): Promise<EventOuputDataDto> {
        console.log("/scan... create.scan=", eventInputData);
        return await this.scanService.create(eventInputData)
    }
}
