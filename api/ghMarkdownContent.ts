import { VercelRequest, VercelResponse } from '@vercel/node'
import axios from 'axios'

module.exports = (req: VercelRequest, res: VercelResponse) => {
    // // CORS ///////////////////////////////////
    // res.setHeader('Access-Control-Allow-Credentials', 'true')
    // if ([
    //     'http://localhost:3000',
    //     'http://localhost:3001',
    //     'https://doc.figurl.org',
    //     'https://doc-figurl.vercel.app'
    // ].includes(req.headers.origin || '')) {
    //     res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '')
    // }
    // res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS')
    // res.setHeader(
    //     'Access-Control-Allow-Headers',
    //     'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    // )
    // if (req.method === 'OPTIONS') {
    //     res.status(200).end()
    //     return
    // }
    // ///////////////////////////////////////////

    ;(async () => {
        if (req.method === 'POST') {
            try {
                const request = req.body
                const ghSource: string = request.ghSource
                if (!ghSource.endsWith('.md')) {
                    res.status(400).send('Not a markdown document')
                    return
                }
                const {user, repo, branch, file} = parseGhSource(ghSource)
                if ((!user) || (!repo) || (!branch) || (!file)) {
                    res.status(400).send('Invalid gh source path')
                    return
                }
                const url = `https://raw.githubusercontent.com/${user}/${repo}/${branch}/${file}`
                let content: string
                try {
                    const a = await axios.get(url, {responseType: 'text'})
                    content = a.data
                }
                catch(err2) {
                    res.status(404).send(`Unable to fetch document: ${err2.message}`)
                    return
                }
                res.status(200).send({content})
            }
            catch(err) {
                res.status(501).send(`Unexpected: ${err.message}`)
            }
        }
        else {
            throw Error(`Invalid request method: ${req.method}`)
        }
    })()
}

function parseGhSource(ghSource: string) {
    const a = ghSource.split('/')
    const user = a[0]
    const repo = a[1]
    const blob = a[2]
    const branch = a[3]
    const file = a.slice(4).join('/')
    if (blob !== 'blob') {
        return {user: undefined, repo: undefined, branch: undefined, file: undefined}
    }
    return {user, repo, branch, file}
}