import axios from "axios"
import { useEffect, useState } from "react"

const useGithubMarkdownContent = (ghSourceUri: string | undefined) => {
    const [markdownContent, setMarkdownContent] = useState<string | undefined>()
    const [error, setError] = useState<string | undefined>()
    useEffect(() => {
        ;(async () => {
            if (!ghSourceUri) return
            setError(undefined)
            setMarkdownContent(undefined)
            let response: {content: string}
            try {
                const resp = await axios.post(`/api/ghMarkdownContent`, {ghSource: ghSourceUri}, {responseType: 'json'})
                response = resp.data
            }
            catch(err: any) {
                setError(`${err.message}: ${err.response.data}`)
                return
            }
            setMarkdownContent(response.content)
        })()
    }, [ghSourceUri])
    return {markdownContent, error}
}

export default useGithubMarkdownContent