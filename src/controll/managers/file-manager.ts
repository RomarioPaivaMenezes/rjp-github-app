//import fs from 'fs';
import * as fs from 'fs'

export interface FileManager {
    save(object),
    read()
}

export class FileManagerImpl implements FileManager{
    
    private file: string

    constructor (url: string, fileName: string) {
        this.file = `${url}/${fileName}`

        if(!fs.existsSync(url)) {
            fs.mkdirSync(url)
        }

        if(!fs.existsSync(this.file)) {
            fs.writeFileSync(this.file,'')
        }
    }

    save(object){
        fs.writeFileSync(
            this.file,
            JSON.stringify(object),
        )
    
    }

    read(){
        const fileContextJSON: string = fs.readFileSync(this.file, {
            encoding: 'utf8',
            flag: 'r'
        })
        return JSON.parse(fileContextJSON)
    }

}