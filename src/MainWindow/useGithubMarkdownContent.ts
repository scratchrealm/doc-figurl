import axios from "axios"
import { useEffect, useState } from "react"

const useGithubMarkdownContent = (ghSource: string) => {
    const [content, setContent] = useState<string | undefined>()
    const [error, setError] = useState<string | undefined>()
    useEffect(() => {
        ;(async () => {
            setError(undefined)
            setContent(undefined)
            let response: {content: string}
            try {
                const resp = await axios.post(`/api/ghMarkdownContent`, {ghSource}, {responseType: 'json'})
                response = resp.data
            }
            catch(err: any) {
                setError(`${err.message}: ${err.response.data}`)
                return
            }
            setContent(response.content)
        })()
    }, [ghSource])
    return {content, error}
}

export default useGithubMarkdownContent