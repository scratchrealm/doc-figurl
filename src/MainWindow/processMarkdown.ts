import YAML from 'js-yaml'

const processMarkdown = (source: string) => {
    const lines = source.split('\n')

    const lines2: string[] = []

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i]
        if (isValidFigureLine(line)) {
            const opts = getYamlOpts(lines.slice(i + 1))
            const height = opts.height || 700
            const src = line + '&hide=1'
            const newLine = `<iframe src="${src}" width="100%" height="${height}" frameBorder="0"></iframe>`
            lines2.push(newLine)
            lines2.push(`<a href="${src}">▣</a>`)
        }
        else lines2.push(line)
    }

    return lines2.join('\n')
}

function isValidFigureLine(line: string) {
    if (!line.startsWith('https://figurl.org/f?')) return false
    if (line !== line.trim()) return false
    // todo: additional checks
    return true
}

function getYamlOpts(lines: string[]): {[key: string]: any} {
    if (lines.length === 0) return {}
    if (lines[0].trim() !== '<!--') return {}
    let j = 1
    while ((j < lines.length) && (lines[j].trim() !== '-->')) {
        j ++
    }
    if (j >= lines.length) return {}
    const lines2 = lines.slice(1, j)
    const yaml = lines2.join('\n')
    try {
        return YAML.load(yaml) || {}
    }
    catch(err) {
        return {}
    }
}

export default processMarkdown